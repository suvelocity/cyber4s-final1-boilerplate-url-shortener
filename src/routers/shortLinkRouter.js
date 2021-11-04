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
    console.log(linksDb)
    res.send(linksDb);
})

router.get('/:shortURL', (req, res) => {
    const shortURL = req.params.shortURL;
    const longURL = linksDb.getValue(shortURL);
    if(!longURL) throw Error ('404');
    res.send(longURL);
})


module.exports = {
    router,
    setRouterDB
}
