const DataBase = require("./DataBase");
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;
const dataBaseUse = new DataBase;
const myURL = " https://yurls.herokuapp.com/"

app.use(cors());

app.use(express.static(path.join(__dirname, "../Front/src")));     //able to read statics files

app.use("/", (req,res, next)=>{
  if(req. _parsedOriginalUrl.path === "/" || req. _parsedOriginalUrl.path === "/makeurl"|| req.  _parsedOriginalUrl.path === "/status"
  ){next()}
  else{
    try {
      const requestEnd = (req. _parsedOriginalUrl.path);
      const longURL = dataBaseUse.getLongUrlFromStorage(requestEnd);
      res.redirect(longURL.slice(1,longURL.length-1));
    } catch (error) {
      res.send(error);
    }
  }
})

app.get("/", (req,res)=>{              //homepage                             
  res.sendFile("dist/index.html");
})

app.get("/makeurl", function(req,res){
  try {
    const longUrl = JSON.stringify(req.headers.longurl);
    const customShort = req.headers.shorturl;
    if(customShort){
      console.log("in first If");
      if(dataBaseUse.isDuplicate(customShort)){
        throw "URL taken already"
      }
      else{
        console.log("in else");
        dataBaseUse.storeUrlRelation(longUrl, customShort);
        res.send(myURL + "/" + customShort)
      }
    }
    
    if(dataBaseUse.isExistLong(longUrl)){
      const existingUrl = dataBaseUse.isExistLong(longUrl)
      res.send(myURL + "/" + existingUrl);
    }
    else{
    const shortURL = makeId(4);
    dataBaseUse.storeUrlRelation(longUrl, shortURL);
    res.send(myURL + "/" + shortURL);
    }
  } catch (error) {
    res.send(error)
  }
})

app.get("/status", function (req,res){
    try {
        const shortURL = req.headers.shorturl;
        const slicedUrl = (shortURL.slice(22));
        const counter = dataBaseUse.getCounterFromStorage(slicedUrl);
        const longurl =dataBaseUse.getLongUrlFromStorage(`/${slicedUrl}`);
        const date =dataBaseUse.getDateFromStorage(slicedUrl);
        const data = {counter, longurl, date};
        res.send(data);
    } catch (error) {
      
    }
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