const fs = require("fs");
const fsPromise = require("fs/promises");
const shortid = require("shortid");

class DataBase {
  constructor() {
    this.urls = [];
  }
  saveUrl(fullURL) {
    const url = new Url(fullURL);
    this.urls.push(url);
    const data = JSON.stringify(this.urls, null, 4);
    return fsPromise
      .writeFile("./DataBase/dataBase.json", data)
      .then((res) => url);
  }
  checkExistence(Url) {
    return fsPromise
      .readFile("./DataBase/dataBase.json")
      .then((res) => {
        let data = JSON.parse(res);
        let currentUrl = data.find((urlObj) => {
          if (urlObj.fullUrl === Url) {
            return true;
          }
        });
        if (currentUrl) {
          return currentUrl;
        }
        throw new Error();
      })
      .catch((e) => {
        return;
      });
  }
  checkExistenceShortid(shortUrl) {
    return fsPromise
      .readFile("./DataBase/dataBase.json")
      .then((res) => {
        let data = JSON.parse(res);
        let currentShortUrl = data.find((urlObj) => {
          if (urlObj.shortid === shortUrl) {
            return true;
          }
        });
        if (currentShortUrl) {
          return currentShortUrl;
        }
        throw new Error();
      })
      .catch((e) => {
        return;
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
module.exports = DataBase;
