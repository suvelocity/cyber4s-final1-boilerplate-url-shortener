const fs = require("fs");
const fsPromise = require("fs/promises");
const shortid = require("shortid");

class DataBase {
  constructor() {
    this.urls = [];
  }
  saveUrl(fullURL) {
    const newUrl = new Url(fullURL);
    this.urls.push(newUrl);
    const data = JSON.stringify(this.urls, null, 4);
    return fsPromise.writeFile("./DataBase/dataBase.json", data).then((res) => {
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
        fsPromise.writeFile("./DataBase/dataBase.json", data, (e) => {});
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
    .readFile("./DataBase/dataBase.json")
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
      throw new Error();
    })
    .catch((e) => {
      return;
    });
}

module.exports = DataBase;
