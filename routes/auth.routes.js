const router = require("express").Router()
const User = require("../models/User")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")

router.get(("/sign-up"), (req, res) => {
    res.render("auth/sign-up.ejs", { error: null })
})

router.post(("/sign-up"), async (req, res) => {
    try {
        const { username, password, email } = req.body

        if (!username || !password || !email) {
            return res.render("auth/sign-up.ejs", { error: "All fields are required" })
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.render("auth/sign-up.ejs", {
                error: "Please enter a valied email address"
            })
        }

        //Email validation
        const uniqueString = randString()
        const isValid = false

        function randString() {
            let randStr = ''
            for (let i = 0; i < 6; i++) {
                const num = Math.floor((Math.random() * 10) + 1)
                randStr += num
            }

            return randStr
        }

        const sendMail = (email, uniqueString) => {
            let transport = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.USER,
                    pass: process.env.PASS
                }
            })


            let mailOptions = {
                from: process.env.USER,
                to: email,
                subject: "Email confirmation",
                html: `Press <a href=http://localhost:3000/auth/verify/${uniqueString}> here </a> to verify your email. Thanks`
            }
            transport.sendMail(mailOptions, function (err, response) {
                if (err) {
                    console.log(err)
                } else {
                    console.log("Message sent")
                }
            })

        }



        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if (!passRegex.test(password)) {
            return res.render("auth/sign-up.ejs", {
                error: "Password must be at least 8 characters, at least one uppercase, one lowercase, one number and one special character"
            })
        }

        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return res.render("auth/sign-up.ejs", {
                error: "Username is already taken"
            })
        }

        const hashPass = bcrypt.hashSync(password, 10)
        const newUser = {
            username,
            password: hashPass,
            isValid,
            uniqueString
        }

        await User.create(newUser)

        res.redirect("/auth/sign-up")
    } catch (err) {
        console.log(err)
    }
})

router.get('/verify/:uniqueString', async (req, res) => {
    const { uniqueString } = req.params

    const user = await User.findOne({ uniqueString: uniqueString })
    if (user) {
        user.isValid = true
        await user.save

        res.redirect("/ecoFacilities")
    } else {
        res.json("user not found")
    }
})

router.get("/login", (req, res) => {
    res.render("auth/login.ejs", { error: null })
})


router.post("/login", async (req, res) => {
    try {

        const { username, password } = req.body

        const userInDataBase = await User.findOne({ username: req.body.username })

        if (!username || !password) {
            return res.render("auth/login.ejs", { error: "All fields are required" })
        }

        if (!userInDataBase) {
            return res.render("auth/login.ejs", { error: " Username is not found" })
        }

        const validPass = bcrypt.compareSync(
            req.body.password,
            userInDataBase.password
        )

        if (!validPass) {
            return res.render("auth/login.ejs", { error: "Incorrect password" })
        }

        req.session.user = {
            username: userInDataBase.username,
            userType: userInDataBase.userType,
            _id: userInDataBase._id,
            isVaild: userInDataBase.isValid
        }

        res.redirect("/ecoFacilities")
    } catch (err) {
        console.log("Error during sign-in:", err)
        res.render("auth/login.ejs", { error: "An unexpected error occured." }) //template
    }
})

router.get("/logout", (req, res) => {
    req.session.destroy()
    res.redirect("auth/login")
})

module.exports = router