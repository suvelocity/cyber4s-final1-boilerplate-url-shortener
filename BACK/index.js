const DataBase = require("./DataBase");
const express = require("express");
// const cors = require("cors");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;
const dataBaseUse = new DataBase;
const myURL = "http://localhost:8080"

// app.use(cors());

app.use(express.static(path.join(__dirname, "./src")));     //

app.use("/", (req,res, next)=>{
  if(req. _parsedOriginalUrl.path === "/" || req. _parsedOriginalUrl.path === ""){next()}
  else{
    const requestEnd = (req. _parsedOriginalUrl.path);
    // console.log("17", requestEnd);
    // // go to DataBase and get longUrl
    // const longURL = dataBaseUse.getLongUrlFromStorage(myURL+requestEnd);
    res.redirect("https://stackoverflow.com/questions/9794413/failed-to-push-some-refs-to-githeroku-com");
  }
})

app.get("/", (req,res)=>{              //homepage                             
  res.sendFile("C:/Users/owner/Desktop/קורס CYBER4S/29.08/cyber4s-final1-boilerplate-url-shortener/Front/index.html");
})

app.get("/makeurl", function(req,res){
  try {
    const longURL = req.headers.longurl;
    const shortURL = makeId(4);
    dataBaseUse.storeUrlRelation(longURL, shortURL);
    res.send(myURL + "/" + shortURL);

  } catch (error) {
    res.send(error)
  }
})

app.listen(port, ()=>{
    console.log("running...");
})

function makeId(length) {
  let result           = '';
  let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}
