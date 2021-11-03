// require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
// app.use("/public", express.static(`./public`));

app.get("/", (req, res) => {
  // res.sendFile(__dirname + "/views/index.html");
});

module.exports = app;
