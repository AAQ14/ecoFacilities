const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")

router.get("/new", (req,res)=>{
    res.render("users/new.ejs", {error: null})
})

router.post("/new", async(req,res)=>{
    try {
        const {username, password} = req.body

    if(!username || !password){
        return res.render("users/new.ejs", {error : "fill the username and password fields"})
    }

    const existingUser = await User.findOne({username})
    if(existingUser){
        return res.render("users/new.ejs", {error: "username already exist"})
    }

    passwordRegex =  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if(!passwordRegex.test(password)){
        return res.render("users/new.ejs", {error: "Password must be at least 8 characters, at least one uppercase, one lowercase, one number and one special character"})
    }
    
    const hashPass = bcrypt.hashSync(password, 10)
    const newUser = {
        username,
        password : hashPass
    }

    await User.create(newUser)

    // res.redirect("/user")
    console.log("user created successfully")
    } catch (err) {
        console.log("error ocurred: ", err)
    }
})

module.exports = router