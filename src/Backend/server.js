const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { url } = require("inspector");
const app = express();
app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use("/dist", express.static(`./dist`));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "../Frontend/index.html");
});

app.post("/api/shorturl/:nameOfNewUrl", (req, res, next) => {
  const regexCheckOldUrl = /^http[s\/]*/;
  const regexCheckNewUrl = /[^\d\w]/;
  const oldURL = req.body.oldurl;
  console.log("in post");
  console.log(oldURL);
  const newUrl = req.params.nameOfNewUrl;
  if (!regexCheckOldUrl.test(oldURL)) {
    console.log("in error2");
    next(403)
    return
  }
  if (regexCheckNewUrl.test(newUrl)) {
    console.log("in error1");
    next(403);
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
        console.log("file exited");
        next(401);
        return;
      }
    }
    fs.writeFileSync(`${__dirname}/../../DataBase/${newUrl}.json`, JSON.stringify(UrlObj));
    res.send("sucsses");
  } catch (err) {
    console.log("in error");
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
    next(404);
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
    next(404);
  } catch (err) {
    console.log(err);
    next(err)
  }
})

app.use((err, req, res, next) => {
  if (err.status) {
    console.log('in error')
    res.status(err.status);
    res.send();
  }
  else {
    res.status(500);
    res.send()
  }
});

app.listen(process.env.PORT || 8080, () => {
  console.log("server is on");
})