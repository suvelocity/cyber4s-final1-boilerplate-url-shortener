const express = require("express");
const router  = express.Router();
// const { linksDb } = require('../../app');
const { nanoid } = require("nanoid");

let linksDb;

function setRouterDB(db){
    linksDb = db;
}

router.post('/shorten/:longURL', (req, res) => {
    // URL Validator
    const longURL = req.params.longURL;
    let shortURL = nanoid(6);
    while(linksDb.getValue(shortURL)){
        shortURL = nanoid(6);
    }
    linksDb.store(shortURL, longURL);
    // console.log(linksDb)
    // res.send(linksDb);
    res.send();
})

router.get('/:shortURL', (req, res, next) => {
    const shortURL = req.params.shortURL;
    const longURL = linksDb.getValue(shortURL);
    console.log()
    if(!longURL) next('404');
    location.href = 'https://www.google.com/'
    res.send();
})


module.exports = {
    router,
    setRouterDB
}
