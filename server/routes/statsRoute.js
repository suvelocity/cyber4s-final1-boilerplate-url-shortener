const express = require("express");
const cors = require("cors");
const statsRouter = express.Router();
const fs = require("fs");
const path = require("path");
const db = require("../models/dataBase.js");

statsRouter.get("/:shortUrl", async (req, res, next) => {
  console.log("zzz");
  try {
    let stats = await db.getObjectByShortUrl(req.params.shortUrl);
    console.log(stats);
    if (!stats) {
      throw { status: 404, message: { error: "URL IS NOT EXIST IN DATABASE" } };
    }
    res.send(stats);
  } catch (err) {
    next(err);
  }
});

module.exports = statsRouter;
