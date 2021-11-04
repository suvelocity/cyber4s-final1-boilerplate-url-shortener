const DataBase = require("./DataBase");
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;
const dataBaseUse = new DataBase;
const myURL = "http://localhost:8080"

app.use(cors());

app.use(express.static(path.join(__dirname, "./src")));     //able to read statics files

app.use("/", (req,res, next)=>{
  if(req. _parsedOriginalUrl.path === "/" || req. _parsedOriginalUrl.path === "/makeurl"|| req.  _parsedOriginalUrl.path === "/status"
  ){next()}
  else{
    try {
      const requestEnd = (req. _parsedOriginalUrl.path);
      const longURL = dataBaseUse.getLongUrlFromStorage(requestEnd);
      res.redirect(longURL);
    } catch (error) {
      res.send(error);
    }
  }
})

app.get("/", (req,res)=>{              //homepage                             
  res.sendFile("C:/Users/owner/Desktop/קורס CYBER4S/29.08/cyber4s-final1-boilerplate-url-shortener/Front/index.html");
})

app.get("/makeurl", function(req,res){
  try {
    const longUrl = JSON.stringify(req.headers.longurl);
    const customShort = req.headers.shorturl;
    if(!customShort == undefined){
      console.log('why am i here');
      if(dataBaseUse.isDuplicate(customShort)){
        throw "url taken already"
      }
      else{
        dataBaseUse.storeUrlRelation(longUrl, customShort);
        res.send(homeUrl + "/" + customShort)
      }
    }
    
    if(dataBaseUse.isExistLong(longUrl)){
      const existingUrl = dataBaseUse.isExistLong(longUrl)
      console.log(homeUrl + "/" + existingUrl);
      res.send(homeUrl + "/" + existingUrl);
    }
    else{
    const shortURL = makeId(4);
    dataBaseUse.storeUrlRelation(longURL, shortURL);
    res.send(myURL + "/" + shortURL);
    }
  } catch (error) {
    res.send(error)
  }
})

app.get("/status", function (req,res){
    const shortURL = req.headers.shorturl;
    const slicedUrl = (shortURL.slice(22));
    
    const counter = dataBaseUse.getCounterFromStorage(slicedUrl);
    const longurl =dataBaseUse.getLongUrlFromStorage(`/${slicedUrl}`);
    const date =dataBaseUse.getDateFromStorage(slicedUrl);
    const data = {counter, longurl, date};
    console.log(data);
    res.send(data);
})

function makeId(length) {
  let result           = '';
  let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
  let charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}

module.exports = app;