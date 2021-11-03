const express = require("express");
const cors = require("cors");
const reDirectRouter = express.Router();
const fs = require("fs");
const path = require("path");
const db = require("../models/dataBase");

reDirectRouter.get("/:shorturl", async (req, res, next) => {
  try {
    const origin = await db.getOriginUrl(req.params.shorturl);
    res.redirect(origin);
  } catch (error) {
    next(err);
  }
});

module.exports = reDirectRouter;
