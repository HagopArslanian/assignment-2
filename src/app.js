require("dotenv").config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});
require("./db-connection");
const express = require("express");
const app = express();
const users = require("./users/users.controller");
const auth = require("./auth/auth.controller");
//const bodyParser = require("body-parser");//body-parser is to be able to parse json data from body.
const { writeInFile, readFromFile } = require("./commons/util");
const { handleError } = require("./commons/middlewares/error-handler.middleware");
const asyncHandler = require("express-async-handler");

app.use(express.urlencoded({ extended: false }))
app.use(express.json());

app.use("/users", users);
app.use("./auth", auth);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

/*app.post("/createfile", (req, res) => {
    writeInFile(req.body.content, () => {
        res.send("file created successfully.");
    })
})

app.get("/readfile", (req, res) => {
    readFromFile((err, data) => {
        if(err){
            return res.status(500).send("There was an error reading the file");
        }

        res.send(data);
    })
})*/

//we write it when we have a callback in the method itself and it returns a promise.
//we converted a callback function into a promise, look at util.js
app.post("/createfile", asyncHandler(async (req, res) => {
    await writeInFile(req.body.content);
    res.send("file created successfully.");
}))

app.get("/readfile", asyncHandler(async (req, res) => {
    const data = await readFromFile();
    res.send(data);
}))

app.use(handleError);

module.exports = app;

/*const port = 3000;
app.listen(port, () => {
    console.log(`listening to port ${port}.`);
})*///we don't want it to launch a server every time we are doing a test, for example in users.e2e.spec the request(app) will launch the server from the same port.


