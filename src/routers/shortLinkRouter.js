const express = require("express");
const router  = express.Router();
// const { linksDb } = require('../../app');
const { nanoid } = require("nanoid");
const baseURL = 'http://localhost:8080/';

let linksDb;

function setRouterDB(db){
    linksDb = db;
}

// router.post('/shorten/:longURL', (req, res) => {
router.post('/shorten', (req, res) => {
    // URL Validator
    // const longURL = req.params.longURL;
    const longURL = req.body.url;
    let shortURL = nanoid(6);
    while(linksDb.getValue(shortURL)){
        shortURL = nanoid(6);
    }
    // shortURL = `http://localhost:8080/${shortURL}`;
    linksDb.store(shortURL, longURL);
    // res.send(shortURL);
    res.send(`${baseURL}${shortURL}`);
})
// router.get('/', ()=>{console.log('asdasdasdasd')})
router.get('/:shortURL', (req, res, next) => {
    const shortURL = req.params.shortURL;
    const longURL = linksDb.getValue(shortURL);
    if(!longURL) next('404');
    else{
        console.log(linksDb);
        // res.status(301).json({Location: 'http://www.google.com'})
        res.redirect(longURL);
        // ^ /path
        res.send();
    }
})


module.exports = {
    router,
    setRouterDB
}
