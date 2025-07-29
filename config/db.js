const mongoose = require("mongoose")

async function conntectToDB(){
    try{
       await mongoose.connect(process.env.MONGODB_URL)
       console.log("Connected to databse")
    }catch(err){
        console.log("Error occured", err)
    }
}

module.exports = conntectToDB