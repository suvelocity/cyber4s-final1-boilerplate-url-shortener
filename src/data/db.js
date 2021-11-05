class Database{
    // #db
    constructor(){
        // this.#db = {};
        this.db = {};
    }
    store(key, value){
        // this.#db[key] = value;
        this.db[key] = value;
    }
    getValue(key){
        // return this.#db[key];
        return this.db[key];
    }
}

module.exports = Database;
