//imports
const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const morgan = require("morgan")
const methodOverride = require("method-override")
const conntectToDB = require("./config/db")
const session = require("express-session") 
const passUserToView = require("./middleware/passUserToView")
const isSignedIn = require("./middleware/isSignedIn")

const User = require("./models/User")
const EcoFacility = require("./models/EcoFacility")

//middlewares
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(morgan("dev"))
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized:true
    })
)
app.use(passUserToView) //used to set the res.local.user for each ejs page


//connect to DB
conntectToDB()


//routes

app.use(isSignedIn) //all protected routes must be below this middleware







port = process.env.PORT || 3000
app.listen(PORT => {
        console.log("listening on port: " + port)
})