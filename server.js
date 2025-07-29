//imports
const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const morgan = require("morgan")
const methodOverride = require("method-override")
const conntectToDB = require("./config/db")

const User = require("./models/User")
const EcoFacility = require("./models/EcoFacility")

//middlewares
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(morgan("dev"))


//connect to DB
conntectToDB()


//routes








port = process.env.PORT || 3000
app.listen(PORT => {
        console.log("listening on port: " + port)
})