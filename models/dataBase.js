const fs = require("fs")
const path = require("path")
const util = require("util")
const readFile = (filename) => util.promisify(fs.readFile)(filename , "utf-8")
class DataBase{
    static #createShortCut() {
        let shortUrl = ""
        for (let i=0; i<7; i++) {
            if (Math.random()<0.5) {
                shortUrl+= String.fromCharCode(65 + Math.floor(Math.random()*26))
            }
            else {
                shortUrl+= String.fromCharCode(48 + Math.floor(Math.random()*10))
            }
        }
        return shortUrl;
    }
    static async readDataBase() {
        try {
            const fileData = await readFile("../db.json")
            return await fileData
        }
        catch(error) {
            console.error(error)
        }
    }
    static #createUrlObj(_originUrl) {
        const urlObj = {
            originUrl: _originUrl,
            shortUrl: this.#createShortCut(),
            views: 0,
        }
        return urlObj;
    }
    static async writeUrl() {
        try {
            const dataBase = await this.readDataBase();
            // console.log(dataBase.objects)
        const objectsArr=  await JSON.parse(dataBase).objects;
        objectsArr.push({"tim" : "tam"});
        dataBase.objects=objectsArr;
        fs.writeFile("../db.json", dataBase);
        return objectsArr;
        } catch (error) {
            console.log(error);
        }
        
    }
    static async checkIfUrlExist(){
        try {
            const dataBase = await this.readDataBase();

            if(dataBase.includes(shortUrl)){
                console.log("taken id");
                return false;
            }else{
                return true;
            }
            // if(strDataBase.includes(this.#createShortCut))
           
        } catch (error) {
            
        }
    }
}
DataBase.writeUrl()
.then((data) => console.log(data))