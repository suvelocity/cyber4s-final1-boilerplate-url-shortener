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
/***********************CLASSES************************************/
class DataBase {
  //bringing the data from the dataBase, if there is no data there, it gets it from JSONBIN
  constructor() {
    this.urls = [];
    getData().then((data) => {
      this.urls = data;
      if (!data) {
        getFromJSONBIN().then((res) => {
          this.urls = res;
        });
      }
    });
  }
  //method for saving a new url
  saveUrl(fullURL) {
    const newUrl = new Url(fullURL);
    this.urls.push(newUrl);
    setJSONBIN(this.urls);
    const data = JSON.stringify(this.urls, null, 4);
    return fsPromise
      .writeFile(`./DataBase/${dataBase}.json`, data)
      .then((response) => {
        return newUrl;
      });
  }
  //method for checking if a url's object already exists(by any type of property)
  checkExistence(url, type) {
    return fsPromise
      .readFile(`./DataBase/${dataBase}.json`)
      .then((res) => {
        let data = JSON.parse(res);
        let currentUrl = data.find((urlObj) => {
          if (urlObj[type] === url) {
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
  //method for updating the clicks counter
  updateClicksCount(short) {
    this.checkExistence(short, "shortid")
      .then((findUrl) => {
        const index = this.urls.findIndex((matchUrlInDB) => {
          if (matchUrlInDB.shortid === findUrl.shortid) {
            return true;
          }
        });
        this.urls[index].clicks++;
        return this.urls;
      })
      .then((data) => {
        setJSONBIN(data);
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

/**********************************FUNCTIONS******************************************** */
//function for pulling data out of data base
function getData() {
  return fsPromise.readFile(`./DataBase/${dataBase}.json`).then((res) => {
    const parseData = JSON.parse(res);
    return parseData;
  });
}
//function for updating data in JSONBIN
function setJSONBIN(urls) {
  axios.put(`${ROOT}${binId}`, urls, headers);
}

//function for getting data in JSONBIN
function getFromJSONBIN() {
  return axios.get(`${ROOT}${binId}`, headers).then((binsData) => {
    return binsData.data.record;
  });
}

module.exports = DataBase;
