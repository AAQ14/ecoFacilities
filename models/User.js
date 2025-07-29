const mongoose = require("mongoose")
const {model,Schema} = mongoose

const userSchema = new Schema({
    userName : {
        type: String,
        enum: ["user", "admin"],
        require: true 
    }, 
    password : {
        type: String, 
        require: true 
    }
})

const User = model("User", userSchema)
module.exports = User