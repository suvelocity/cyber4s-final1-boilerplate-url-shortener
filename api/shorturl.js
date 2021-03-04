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
    throw new Error("Invalid URL");
  }
  DB.saveUrl(url)
    .then((newUrl) => {
      response
        .status(200)
        .json(` original_url: ${newUrl.fullUrl}, short_url: ${newUrl.shortid}`);
    })
    .catch((e) => {
      response.status(400).send(`${e}`);
    });
});

router.get("/:shorturl", (request, response) => {
  const shortUrl = request.params.shorturl;
  DB.checkExistenceShortid(shortUrl, "shortid")
    .then((urlObj) => {
      if (!urlObj) {
        throw new Error("There is no short URL ");
      }
      console.log(urlObj.fullUrl);
      DB.updateRedirectClicks(shortUrl);
      response.redirect(`${urlObj.fullUrl}`);
    })
    .catch((error) => {
      response.status(404).send(`${error}`);
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
      throw new Error();
    })
    .catch((e) => {
      next();
    });
}

module.exports = router;
