const express = require("express");
const fsPromise = require("fs/promises");
const DataBase = require("../utils");
const validUrl = require("valid-url");
const shortid = require("shortid");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded());
const DB = new DataBase();

router.post("/new", checkExistence, (request, response) => {
  const url = request.body.url;
  if (!validUrl.isUri(url)) {
    response.status(404).json({ msg: new Error("Invalid URL") });
    return;
  }
  DB.saveUrl(url)
    .then((newUrl) => {
      response
        .status(201)
        .json(` original_url: ${newUrl.fullUrl}, short_url: ${newUrl.shortid}`);
    })
    .catch((e) => {
      response.status(500).send(`${error}`);
    });
});

router.get("/:shorturl", (request, response) => {
  const shortUrl = request.params.shorturl;
  DB.checkExistenceShortid(shortUrl, "shortid")
    .then((urlObj) => {
      if (!urlObj) {
        response.status(404).json({ msg: new Error("There is no short URL ") });
        return;
      }
      console.log(urlObj.fullUrl);
      DB.updateRedirectClicks(shortUrl);
      response.redirect(`${urlObj.fullUrl}`);
    })
    .catch((error) => {
      response.status(500).send(`${error}`);
    });
});

function checkExistence(request, response, next) {
  const url = request.body.url;
  DB.checkExistenceShortid(url, "shortid")
    .then((data) => {
      if (data) {
        response.status(200).json(data);
        return;
      }

      return new Error();
    })
    .catch((e) => {
      next();
    });
}

module.exports = { router, DB };
