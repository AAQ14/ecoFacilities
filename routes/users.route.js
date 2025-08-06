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

    console.log("user created successfully")
    } catch (err) {
        console.log("error ocurred: ", err)
    }
})

router.get("", async (req,res)=>{
    try {
        const allUsers = await User.find()
        res.render("users/all.ejs", {allUsers})
    } catch (err) {
        console.log(err)
    }
})

router.get("/update/:id", async (req,res)=>{
    try {
        const foundUser = await User.findById(req.params.id)
        res.render("users/update.ejs", {foundUser})
    } catch (err) {
        console.log("error occured: " , err)
    }
})

router.put("/update/:id", async (req,res)=>{
    try {
        await User.findByIdAndUpdate(req.params.id, req.body)
        res.redirect("/users")
        console.log("user info updated successfully")
    } catch (err) {
      console.log(err)  
    }
})

router.delete("/delete/:id", async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.redirect("/users")
        console.log("user have been deleted successfully")
    } catch (err) {
        console.log("error occured: ", err)
    }
})


module.exports = router