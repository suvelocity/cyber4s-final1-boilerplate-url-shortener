const express = require("express");
const fsPromise = require("fs/promises");
const DataBase = require("../utils");
const validUrl = require("valid-url");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded());
const DB = new DataBase();

router.post("/new", checkExistence, (request, response) => {
  const url = request.body.url;
  if (!validUrl.isUri(url)) {
    throw new Error("Invalid URL");
  }
  DB.saveUrl(url).then((url) => {
    res.status(200).json();
  });
  response.status(200).json({
    original_url: `${url.fullUrl}, short_url: ${url.shortid}`,
  });
});

router.get("/:shorturl", (request, response) => {
  const shortUrl = req.params.shorturl;
  DB.checkExistenceShortid(shortUrl);
  response
    .send(request.body)
    .then((objUrl) => {
      if (!objUrl) {
        throw new Error("Short Url Is Not Found");
      }
      res.redirect(`${objUrl.originalUrl}`);
    })
    .catch((error) => {
      res.status(404).send(`${error}`);
    });
});

function checkExistence(request, response, next) {
  const url = request.body.url;
  DB.checkExistence(url)
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
