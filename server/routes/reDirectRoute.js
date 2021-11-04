const express = require("express");
const cors = require("cors");
const reDirectRouter = express.Router();
const fs = require("fs");
const path = require("path");
const db = require("../models/dataBase.js");

reDirectRouter.get("/:shortUrl", async (req, res, next) => {
  try {
    const originUrl = await db.getOriginUrl(req.params.shortUrl);
    if (!originUrl) {
      throw { status: 404, message: { error: "NOT FOUND" } };
    }
    if (originUrl.slice(0, 5) !== "http") {
      return res.redirect(`http://${originUrl}`);
    }

    res.redirect(originUrl);
  } catch (err) {
    next({ status: 500, message: "Internal server error" });
  }
});

module.exports = reDirectRouter;
