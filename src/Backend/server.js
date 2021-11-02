const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use("/dist", express.static(`./dist`));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "../Frontend/index.html");
});

app.post("/api/shorturl/:nameOfNewUrl", (req, res, next) => {

})

app.get("api/statistic/:shorturl-name", (req, res, next) => {
  res.send(/*statics in json */)
});

app.get("/:wishUrl", (req, res, next) => {
  res.send(/*redirct to the site*/)
})

app.listen(process.env.PORT || 8080, () => {
  console.log("server is on");
})