require("dotenv").config();
const express = require("express");
const cors = require("cors");
const shortUrlRouter = require("./routes/shortUrlRoute");
const statsRouter = require("./routes/statsRoute");
const reDirectRouter = require("./routes/reDirectRoute");
const errorHandler = require("./handlers/errorHandler");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", reDirectRouter);
app.use("/public", express.static(`./public`));
app.use("/api/shorturl/", shortUrlRouter);
app.use("api/statistic/", statsRouter);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/", (req, res) => {
  res.send("tomer");
});

module.exports = app;
