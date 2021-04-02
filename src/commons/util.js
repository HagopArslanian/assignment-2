//this utilitys job is to store any file into the file system.

const fs = require("fs");

module.exports = {
    /*constants: {
        admin: "admin"
    },*/
    /*writeInFile(content, callback){
        fs.writeFile("content.txt", content, {encoding: "utf-8"}, callback);
    },*/// callback is a function that we are going to define, it's job is when the writing is done the callback is called to notify that the writing is done. We are defining the callback function, for example in the express app we can make it send a res.send() that the file created successfully.

    /*readFromFile(callback){
        fs.readFile("content.txt", callback);
    }*///once its done reading, it needs to send it to whoever called it. that's why we need the callback, to send the result.

    //we make the methods return a promise
    //we convert callback functions into a promise.

    writeInFile(content){
        return new Promise((resolve) => {
            fs.writeFile("content.txt", content, { encoding: "utf-8"}, () => {
                resolve();
            });
        })
    },

    readFromFile(){
        return new Promise((resolve, reject) => {
            fs.readFile("content.txt", (err, data) => {
                if(err){
                    return reject(err);
                }

                resolve(data);
            });
        });
    }
}