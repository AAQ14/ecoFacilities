const mongoose = require("mongoose")
const {model,Schema} = mongoose

const userSchema = new Schema({
    username : {
        type: String,
        require: true 
    }, 
    password : {
        type: String, 
        require: true 
    },
    userType: {
        type: String,
        enum: ["Admin", "User"],
        default: "User"
    }, email: {
        type: String,
        require: true
    },
    isVaild: Boolean,
    uniqueString: String
})

const User = model("User", userSchema)
module.exports = User