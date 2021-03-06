const fs = require("fs");
const fsPromise = require("fs/promises");
const shortid = require("shortid");
const axios = require("axios");
let dataBase;
process.env.NODE_ENV === "test"
  ? (dataBase = "testDataBase")
  : (dataBase = "dataBase");

const ROOT = "https://api.jsonbin.io/b/";
const APIKEY = "$2b$10$CZt7ltqtf7n5YtsT097M4.AGaB58sIoKEafkw22vKIcNxTystSMmu";
const binId = "6043b0d4683e7e079c465869";
const headers = {
  headers: {
    "Content-type": "application/json",
    "X-Master-Key": APIKEY,
  },
};

class DataBase {
  constructor() {
    this.urls = [];
    getData().then((data) => {
      this.urls = data;
      if (!data) {
        getPersistent().then((res) => {
          this.urls = res;
        });
      }
    });
  }
  saveUrl(fullURL) {
    const newUrl = new Url(fullURL);
    this.urls.push(newUrl);
    setPersistent(this.urls);
    const data = JSON.stringify(this.urls, null, 4);
    return fsPromise
      .writeFile(`./DataBase/${dataBase}.json`, data)
      .then((response) => {
        return newUrl;
      });
  }

  checkExistence(url, kind) {
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
        throw new Error();
      })
      .catch((e) => {
        return;
      });
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
        setPersistent(data);
        data = JSON.stringify(data, null, 4);
        fsPromise.writeFile(`./DataBase/${dataBase}.json`, data, (e) => {});
      });
  }
}
class Url {
  constructor(fullUrl) {
    this.fullUrl = fullUrl;
    this.shortid = shortid();
    this.createdAt = new Date().toLocaleString();
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
  return fsPromise.readFile(`./DataBase/${dataBase}.json`).then((res) => {
    const parseData = JSON.parse(res);
    return parseData;
  });
}
function setPersistent(urls) {
  axios.put(`${ROOT}${binId}`, urls, headers);
}

//get data from json bin
function getPersistent() {
  return axios.get(`${ROOT}${binId}`, headers).then((binsData) => {
    return binsData.data.record;
  });
}

module.exports = DataBase;
