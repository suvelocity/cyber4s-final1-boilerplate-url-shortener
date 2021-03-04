const express = require("express");
const fsPromise = require("fs/promises");
const DataBase = require("../utils");
const DB = new DataBase();

const router = express.Router();

router.get("/:shortid", (request, response) => {
  const { shortid } = request.params;
  DB.checkExistenceShortid(shortid, "shortid")
    .then((statistic) => {
      if (!statistic) {
        throw new Error("Short Url Does Not Exist");
      }
      response.status(200).json(statistic);
    })
    .catch((error) => {
      response.status(404).send(`${error}`);
    });
});

module.exports = router;
