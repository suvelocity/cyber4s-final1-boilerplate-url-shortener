const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use("/public", express.static(`./public`));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

module.exports = app;



const DataBase = require("./DataBase");
const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;
const dataBaseUse = new DataBase;
const myURL = "http://localhost:8080/"


app.use(express.static(path.join(__dirname, "./src")));

// app.get("/", (req,res)=>{
//   res.sendFile("./src/index.html", {root: __dirname});
// })

app.get("/makeurl", function(req,res){
  try {
    const longURL = req.headers.longurl;
    const shortURL = makeId(4);
    dataBaseUse.storeUrlRelation(longURL, shortURL);
    res.send(myURL + shortURL);

  } catch (error) {
    res.send(error)
  }
})

app.use("/", (req,res)=>{
  const requestEnd = (req. _parsedOriginalUrl.path);
  console.log(requestEnd);
  res.send("ynet.com")
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
