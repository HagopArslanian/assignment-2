const User = require("../users/user.entity");
const { Unauthorized } = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


class AuthService {
    async validate(username, password){
        const user = await User.findOne({ username });
        if(!user || bcrypt.compareSync()){
            throw new Unauthorized();
        }

        return user;
    }

    async login(username, password){
        const user = await this.validate(username, password);

        const token = jwt.sign({userId: user._id, username: user.username }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        })

        return token;
    }
}

module.exports = new AuthService();