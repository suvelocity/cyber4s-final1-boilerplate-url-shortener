const express = require("express");
const validator = require('validator');
const axios = require('axios');
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use("/", (req, res, next) => {
  console.log("hello");
  console.log(req.headers['user-agent']);
  next();
})

app.use(express.static(`${__dirname}/../../Assest`));
app.use("/error/404", express.static(`${__dirname}/../Frontend`, { index: 'notfound.html' }));
app.use("/Mobile", express.static(`${__dirname}/../Frontend`, { index: 'MoblieIndex.html' }));
app.use("/", express.static(`${__dirname}/../Frontend`));
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/../Frontend/index.html`);
});
app.get("/error/404", (req, res) => {
  res.sendFile(`${__dirname}/../Frontend/Frontend/notfound.html`);
});
app.get("/Mobile", (req, res) => {
  res.sendFile(`${__dirname}/../Frontend/Frontend/MoblieIndex.html`);
});


app.post("/api/shorturl/:nameOfNewUrl", async (req, res, next) => {
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
    const getResponse = await axios.get(`https://api.jsonbin.io/v3/b/6183b2f09548541c29cd8045`, {
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": process.env.API_SECRET_KEY,
      }
    });
    const EGShortURLOBJ = getResponse.data.record;
    EGShortURLOBJ[newUrl] = UrlObj;
    const putResponse = await axios.put(`https://api.jsonbin.io/v3/b/6183b2f09548541c29cd8045`, JSON.stringify(EGShortURLOBJ), {
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": process.env.API_SECRET_KEY,
      }
    });
    res.send(`${newUrl}`);
  } catch (err) {
    next(err)
  }
});

app.get("/api/statistic/:shorturl", async (req, res, next) => {
  try {
    const givenUrl = req.params.shorturl;
    const getResponse = await axios.get(`https://api.jsonbin.io/v3/b/6183b2f09548541c29cd8045`, {
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": process.env.API_SECRET_KEY,
      }
    });
    const EGShortURLOBJ = getResponse.data.record;
    for (let value in EGShortURLOBJ) {
      if (value == givenUrl) {
        const urlObj = EGShortURLOBJ[value];
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
    const getResponse = await axios.get(`https://api.jsonbin.io/v3/b/6183b2f09548541c29cd8045`, {
      headers: {
        "Content-Type": "application/json",
        "X-Master-Key": process.env.API_SECRET_KEY,
      }
    });
    const EGShortURLOBJ = getResponse.data.record;
    for (let value in EGShortURLOBJ) {
      if (value == givenUrl) {
        const redirectUrl = EGShortURLOBJ[value].originalUrl;
        EGShortURLOBJ[value].redirectCount++;
        const putResponse = axios.put(`https://api.jsonbin.io/v3/b/6183b2f09548541c29cd8045`, JSON.stringify(EGShortURLOBJ), {
          headers: {
            "Content-Type": "application/json",
            "X-Master-Key": process.env.API_SECRET_KEY,
          }
        });
        res.redirect(redirectUrl);
        return;
      }
    }
    res.redirect('/error/404');
    return
  } catch (err) {
    res.redirect('/error/404');
    return
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