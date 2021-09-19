/*************************Declaring variables**********************************/
const express = require("express");
const fsPromise = require("fs/promises");
const DataBase = require("../utils");
const validUrl = require("valid-url");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded());
const DB = new DataBase();

/*************************POST method**********************************/

router.post("/new", checkIfExists, (request, response) => {
  const url = request.body.url;
  if (!validUrl.isUri(url)) {
    response.status(404).json({ msg: `${new Error()}"Invalid URL` });
    return;
  }

  DB.saveUrl(url)
    .then((newUrl) => {
      response
        .status(201)
        .json(` original_url: ${newUrl.fullUrl}, short_url: ${newUrl.shortid}`);
    })
    .catch((e) => {
      response.status(500).send(`${e}`);
    });
});

/*************************GET method**********************************/

router.get("/:shorturl", (request, response) => {
  const shortUrl = request.params.shorturl;
  DB.checkExistence(shortUrl, "shortid")
    .then((urlObj) => {
      if (!urlObj) {
        response.status(404).json({ msg: new Error("There is no short URL ") });
        return;
      }
      DB.updateClicksCount(shortUrl);
      response.redirect(`${urlObj.fullUrl}`);
    })
    .catch((error) => {
      response.status(500).send(`${error}`);
    });
});

/**********************Functions************************************/
//function for checking if a url already exists
function checkIfExists(request, response, next) {
  const url = request.body.url;
  DB.checkExistence(url, "fullUrl")
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

module.exports = { router, DB };
