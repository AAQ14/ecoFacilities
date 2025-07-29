const mongoose = require("mongoose")
const {model,Schema} = mongoose

const userSchema = new Schema({
    userName : {
        type: String,
        require: true 
    }, 
    password : {
        type: String, 
        require: true 
    },
    userType: {
        type: String,
        enum: ["Admin", "User"]
    }
})

const User = model("User", userSchema)
module.exports = User