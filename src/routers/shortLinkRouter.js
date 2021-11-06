const express = require("express");
const router  = express.Router();
// const { linksDb } = require('../../app');
const { nanoid } = require("nanoid");
const path = require('path');

const baseURL = 'http://localhost:8080/';
let linksDb;

function setRouterDB(db){
    linksDb = db;
}

router.post('/shorten', (req, res) => {
    // URL Validator
    const userURL = req.body.url;
    let shortURLKey = nanoid(6);
    while(linksDb.getValue(shortURLKey)){
        shortURLKey = nanoid(6);
    }
    const longURL = httpsIncluded(userURL);
    linksDb.store(shortURLKey, { longURL, timesClicked: 0 });
    const shortURL = `${baseURL}${shortURLKey}`;
    res.send(shortURL);
})

router.get('/:shortURL', (req, res, next) => {
    const shortURL = req.params.shortURL;
    const longURL = linksDb.getValue(shortURL).longURL;
    if(!longURL) next('404');
    else{
        linksDb.store(shortURL, { longURL, timesClicked: linksDb.getValue(shortURL).timesClicked + 1});
        res.redirect(longURL);
        // res.send();
    }
})

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../views/index.html'));
})

/**
 * 
 * @param {string} url - A url with or without 'https://' at the start
 * @returns {string} - A url with 'https://' at the start
 */
function httpsIncluded(url){
    const httpsStart = 'https://';
    const urlBeginning = url.slice(0, 8);
    return urlBeginning === httpsStart ? url : `${httpsStart}${url}`;
}

module.exports = {
    router,
    setRouterDB
}
