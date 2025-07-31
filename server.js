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
const authRoutes = require("./routes/auth.routes")
const EcoFacilityRoutes = require("./routes/ecoFacility.routes") 
const usersRoutes = require("./routes/users.route")
const isAdminUser = require("./middleware/isAdminUser")
const User = require("./models/User")
const EcoFacility = require("./models/ecoFacility")

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
app.use("/auth", authRoutes)
app.use("/ecoFacilities", EcoFacilityRoutes)
app.use(isAdminUser)
app.use("/users", usersRoutes)


app.use((req,res,next)=>{
    res.send("<h1> 404 Page Not Found </h1>")
})
app.use(isSignedIn) //all protected routes must be below this middleware



const port = process.env.PORT || 3000
const server = app.listen(port, () => {
        console.log("listening on port: " + port)
})

server.on("error" , (err) => {
    if(err.code === "EADDRINUSE") {
        console.error(` Port ${port} is already in use.`)
    } else {
        console.error(" Server error:", err.message)
    }
})