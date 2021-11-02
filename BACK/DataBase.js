const fs = require("fs");

class DataBase {
    constructor(){}

    storeUrlRelation(longUrl, shortUrl){       
       fs.readFile("./DB.json", (err, data)=>{
           if(err){
                return(err);
           }
           const fileContent = JSON.parse(data);
           fileContent[shortUrl] = {longUrl: longUrl , date: new Date().toISOString().slice(0, 10).replace('T', ' '), counter: 0};      
           fs.writeFile("./DB.json", JSON.stringify(fileContent), 'utf8', (err)=>{})
       }) 
    }

    getLongUrlFromStorage(shortUrl){
        fs.readFile("./DB.json", (err, data)=>{
            if(err){
                return(err);
            }
            const fileContent = JSON.parse(data);
            fileContent[shortUrl].counter += 1;
            fs.writeFile("./DB.json", JSON.stringify(fileContent), 'utf8', (err)=>{err})
            const LongUrl = fileContent[shortUrl].longUrl;
            return LongUrl;
        })    
    }

    getDateFromStorage(shortUrl){
        fs.readFile("./DB.json", (err, data)=>{
            if(err){
                return(err);
            }
            const fileContent = JSON.parse(data);
            return fileContent[shortUrl].date;
        })    
    }

    getCounterFromStorage(shortUrl){
        fs.readFile("./DB.json", (err, data)=>{
            if(err){
                return(err);
            }
            const fileContent = JSON.parse(data);
            return fileContent[shortUrl].counter;
        })    
    }

}

module.exports = DataBase;