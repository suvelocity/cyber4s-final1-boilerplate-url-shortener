const fs  = require('fs');
const path = require('path');

class Database{
    // #db
    constructor(){
        // this.#db = {};
        this.db = JSON.parse(fs.readFileSync(__dirname + '/db.json').toString()) || {};
    }
    store(key, value){
        // this.#db[key] = value;
        this.db[key] = value;
        // fs.writeFileSync(__dirname + '/db.json', JSON.stringify(this.#db));
        fs.writeFileSync(__dirname + '/db.json', JSON.stringify(this.db));
    }
    getValue(key){
        // return this.#db[key];
        return this.db[key];
    }
}

module.exports = Database;
