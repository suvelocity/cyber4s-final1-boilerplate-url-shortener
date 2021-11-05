require("dotenv").config();
const express = require("express");
const cors = require("cors");
const shortUrlRouter = require("./routes/shortUrlRoute");
const statsRouter = require("./routes/statsRoute");
const reDirectRouter = require("./routes/reDirectRoute");
const errorHandler = require("./handlers/errorHandler");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/app/", express.static(`./dist`));
app.use("/api/shorturl/", shortUrlRouter);
app.use("/api/stats/", statsRouter);
app.use(errorHandler);

app.get("/app/", (req, res) => {
  res.sendFile(path.resolve("./dist/index.html"));
});
app.use("/", reDirectRouter);

module.exports = app;
