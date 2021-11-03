const express = require("express");
const cors = require("cors");
const fs = require("fs");
const validator = require('validator');
const app = express();
app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use("/dist", express.static(`./dist`));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "../Frontend/index.html");
});

app.post("/api/shorturl/:nameOfNewUrl", (req, res, next) => {
  const oldURL = req.body.oldurl;
  const newUrl = req.params.nameOfNewUrl;
  if (!validator.isURL(oldURL)) {
    next({ status: 401, msg: "Go Away" })
    return
  }
  if (!validator.isLength(newUrl, { min: 3, max: 15 })) {
    next({ status: 401, msg: "Go Away" })
    return
  }
  if (!validator.isAlphanumeric(newUrl)) {
    next({ status: 401, msg: "Go Away" })
    return
  }
  const today = new Date()
  const UrlObj = {
    creationDate: today.toISOString().substring(0, 10),
    redirectCount: 1,
    originalUrl: oldURL,
  };
  try {
    const UrlNameArray = fs.readdirSync(`${__dirname}/../../DataBase`)
    for (let value of UrlNameArray) {
      value = value.replace(/.json/, '');
      if (value == newUrl) {
        next({ status: 401, msg: "URL Taken" });
        return;
      }
    }
    fs.writeFileSync(`${__dirname}/../../DataBase/${newUrl}.json`, JSON.stringify(UrlObj));
    res.send(`${newUrl}`);
  } catch (err) {
    next(err)
  }
});

app.get("/api/statistic/:shorturl", (req, res, next) => {
  try {
    const givenUrl = req.params.shorturl;
    const UrlNameArray = fs.readdirSync(`${__dirname}/../../DataBase`);
    for (let value of UrlNameArray) {
      value = value.replace(/.json/, '');
      if (value == givenUrl) {
        const urlObj = fs.readFileSync(`${__dirname}/../../DataBase/${value}.json`, 'utf-8');
        res.send(urlObj);
        return;
      }
    }
    next({ status: 404, msg: "URL NOT FOUND" });
  } catch (err) {
    console.log("in error");
    next(err);
  }
});

app.get("/:wishUrl", async (req, res, next) => {
  try {
    const givenUrl = req.params.wishUrl;
    const UrlNameArray = fs.readdirSync(`${__dirname}/../../DataBase`);
    for (let value of UrlNameArray) {
      value = value.replace(/.json/, '');
      if (value == givenUrl) {
        const urlObj = JSON.parse(fs.readFileSync(`${__dirname}/../../DataBase/${value}.json`));
        const redirectUrl = urlObj.originalUrl;
        urlObj.redirectCount++;
        fs.writeFile(`${__dirname}/../../DataBase/${value}.json`, JSON.stringify(urlObj), (err) => {
          if (err) {
            console.log(err);
            throw err
          }
        });
        res.redirect(redirectUrl);
        return;
      }
    }
    next({ status: 404, msg: "Wrong Path" });
  } catch (err) {
    console.log(err);
    next({ status: 404, msg: "Wrong Path" });
  }
})

app.use((err, req, res, next) => {
  console.log(err);
  if (err.status) {
    res.statusMessage = err.msg
    res.status(err.status).send({
      status: err.status,
      message: err.msg,
    });
  }
  else {
    res.send(500)
  }
});

app.listen(process.env.PORT || 8080, () => {
  console.log("server is on");
})