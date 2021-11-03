const express = require("express");
const fs = require("fs");
const path = require("path");
const shortUrlRouter = express.Router();
const db = require("../models/dataBase");
const { isURL } = require("validator");
const { nextTick } = require("process");

shortUrlRouter.post("/", async (req, res, next) => {
  if (isURL(req.body.originUrl)) {
    return res.send(await db.addObjToDb(req.body.originUrl));
  } else {
    next({ status: 400, message: { message: "this is not a valid url" } });
  }
});
shortUrlRouter.get("/", async (req, res) => {});

module.exports = shortUrlRouter;
