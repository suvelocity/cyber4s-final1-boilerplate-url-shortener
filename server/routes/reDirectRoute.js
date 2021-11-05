const express = require("express");
const cors = require("cors");
const reDirectRouter = express.Router();
const fs = require("fs");
const path = require("path");
const db = require("../models/dataBase.js");

reDirectRouter.get("/", (req, res, next) => {
  return res.redirect(`/app/`);
});
reDirectRouter.get("/:shortUrl", async (req, res, next) => {
  try {
    const originUrl = await db.getOriginUrl(req.params.shortUrl);
    if (!originUrl) {
      console.log({ status: 404, message: { error: "NOT FOUND" } });
      throw { status: 404, message: { error: "NOT FOUND" } };
    }
    if (originUrl.slice(0, 4) !== "http") {
      return res.redirect(`http://${originUrl}`);
    }
    res.redirect(originUrl);
  } catch (err) {
    console.log({ status: 500, message: "Internal server error" });
    next({ status: 500, message: "Internal server error" });
  }
});

module.exports = reDirectRouter;
