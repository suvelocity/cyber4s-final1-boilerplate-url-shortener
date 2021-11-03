const express = require("express");
const cors = require("cors");
const statsRouter = express.Router();
const fs = require("fs");
const path = require("path");
const db = require("../models/dataBase.js");

statsRouter.get("/:shorturl-id", (req, res) => {});

module.exports = statsRouter;
