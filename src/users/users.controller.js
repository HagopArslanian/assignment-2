//the controller dispatches everything and basically calls the service logic.

const express = require("express");
const router = express.Router();
const users = require("./users.service");
const asyncHandler = require("express-async-handler");

router.use(function timeLog(req, res, next){
    console.log("Time: ", new Date());
    next();// If we don't call the next() function my request will not go forward, it will stay here.
})//here we added this function-(middleware use) only to the users.controller router so the time will appear only when we write /users which is the path

router.get("/about", (req, res) => {
    res.send("Users about.");
});

/*router.get("/", async (req, res) => {
    try{
        const query = req.query;
        const result = await users.findAll(query);
        res.json(result);
    }catch(err){
        res.status(500).json(err);
    }
})*///before using asyncHandler, express-async-handler and using commons/middlwares/error-handler.middlewares to get rid of try and catch blocks so we won't use them every time.

router.get("/", asyncHandler(async (req, res) => {
    const query = req.query;
    const result = await users.findAll(query);
    res.json(result);
}))


router.get("/:id", asyncHandler(async (req, res) => {
    /*const params = req.params;
    const result = users.findOne(params.id);*/
    //what is written below is the same as what it is commented just on the top of this.
    const {id} = req.params;
    const result = await users.findOne(id);
    res.json(result);
}))

/*router.post("/", async (req, res) => {
    try{
        const body = req.body;
        const result = await users.create(body);
        res.status(201).json(result);//when a resource is created from the server, you return 201------res.status(201).
    }catch(err){
        res.status(500).json(err);
    }
})*///before using asyncHandler, express-async-handler and using commons/middlwares/error-handler.middlewares to get rid of try and catch blocks so we won't use them every time.

router.post("/", asyncHandler(async (req, res) => {
    const body = req.body;
    const result = await users.create(body);
     res.status(201).json(result);//when a resource is created from the server, you return 201------res.status(201).
}))


router.delete("/:id", asyncHandler(async (req, res) => {
    const {id} = req.params;
    const result = await users.delete(id);
    res.json(result);
}))

router.patch("/:id", asyncHandler(async (req, res) => {
    const {id} = req.params;
    const result = await users.update(id, req.body);
    res.json(result);
}))

module.exports = router;




