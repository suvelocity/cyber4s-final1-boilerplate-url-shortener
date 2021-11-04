// require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { router: shortLinkRouter, setRouterDB } = require('./src/routers/shortLinkRouter');
const errorHandler = require('./src/middlewares/errorHandler')
const db = require('./src/data/db');
const linksDb = new db();
setRouterDB(linksDb);

app.use(cors());
// app.use("/public", express.static(`./public`));

app.use('/', shortLinkRouter);

// app.get("/", (req, res) => {
  // res.sendFile(__dirname + "/views/index.html");
// });

app.use(errorHandler)

module.exports =  {
  app,
  // linksDb
}
