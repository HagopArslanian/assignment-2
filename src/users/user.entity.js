const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    }
}, {collection: "users"})

schema.pre("save", function(next){
    if(this.isModified("password")){
        hash(this);
    }//this is the object that's going to be saved.

    next();//hook is like a middleware, after everything is done, we want the next hook to be called if there is any hook.
})

schema.pre("updateOne", function(next){
    const password = this.getUpdate().$set.password;
    if(password){
        hash(this);
    }//this is the object that's going to be saved.

    next();//hook is like a middleware, after everything is done, we want the next hook to be called if there is any hook.
})

function hash(target){
    const salt = bcrypt.genSaltSync();
    target.password = bcrypt.hashSync(target.password, salt);
}



module.exports = mongoose.model("User", schema);