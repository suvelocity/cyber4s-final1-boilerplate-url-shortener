const fs = require("fs");
const fsPromise = require("fs/promises");
const shortid = require("shortid");
let dataBase;
process.env.NODE_ENV === "test"
  ? (dataBase = "testDataBase")
  : (dataBase = "dataBase");

class DataBase {
  constructor() {
    this.urls = [];
    getData().then((data) => {
      if (data) {
        this.urls = data;
      }
    });
  }
  saveUrl(fullURL) {
    const newUrl = new Url(fullURL);
    this.urls.push(newUrl);
    const data = JSON.stringify(this.urls, null, 4);
    return fsPromise
      .writeFile(`./DataBase/${dataBase}.json`, data)
      .then((res) => {
        return newUrl;
      });
  }
  checkExistenceFullUrl(Url) {
    return compareUrl(Url, "fullUrl");
  }
  checkExistenceShortid(shortUrl) {
    return compareUrl(shortUrl, "shortid");
  }
  updateRedirectClicks(short) {
    compareUrl(short, "shortid")
      .then((findUrl) => {
        const index = this.urls.findIndex((matchUrlInDB) => {
          if (matchUrlInDB.shortid === findUrl.shortid) {
            return true;
          }
        });
        this.urls[index].clicks++;
        console.log(index);
        return this.urls;
      })
      .then((data) => {
        data = JSON.stringify(data, null, 4);
        fsPromise.writeFile(`./DataBase/${dataBase}.json`, data, (e) => {});
      });
  }
}
class Url {
  constructor(fullUrl) {
    this.fullUrl = fullUrl;
    this.shortid = shortid();
    this.createdAt = Date.now();
    this.clicks = 0;
  }
}
function compareUrl(url, kind) {
  return fsPromise
    .readFile(`./DataBase/${dataBase}.json`)
    .then((res) => {
      let data = JSON.parse(res);
      let currentUrl = data.find((urlObj) => {
        if (urlObj[kind] === url) {
          return true;
        }
      });
      if (currentUrl) {
        return currentUrl;
      }
      return new Error();
    })
    .catch((e) => {
      return;
    });
}
function getData() {
  return fsPromise
    .readFile(`./database/${dataBase}.json`, "utf8")
    .then((data) => {
      const parseData = JSON.parse(data);
      return parseData;
    })
    .catch((e) => {
      console.error("Can't read the data base");
      return false;
    });
}

module.exports = DataBase;
