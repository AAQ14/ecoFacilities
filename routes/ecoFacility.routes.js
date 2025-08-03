const router = require("express").Router()
const EcoFacility = require("../models/ecoFacility")
const User = require("../models/User")
const mongoose = require("mongoose")

router.get("/new", (req, res) => {
    res.render("ecoFacilities/new.ejs", { user: req.session.user })
})

router.post("/new", async (req, res) => {
    try {
        req.body.contributor = req.session.user._id
        if (req.body.category === "Recycling Bins") {
            req.body.img = "/images/recycling Bins.png"
        } else if (req.body.category === "Bike Share Stations") {
            req.body.img = "/images/BikeShareStation.png"
        } else if (req.body.category === "e-Scooters") {
            req.body.img = "/images/e-Scooters.jpg"
        } else if (req.body.category === "Public EV Charging Stations") {
            req.body.img = "/images/PublicEVChargingStations.png"
        }

        await EcoFacility.create(req.body)
        console.log("Eco Facility added successfully")
        res.redirect("/ecoFacilities/new")
    } catch (err) {
        console.log(err)
    }
})

router.get("", async (req, res) => {
    try {
        const allEcoFacilities = await EcoFacility.find().populate('contributor')
        // console.log(allEcoFacilities)
        let numOfLikes
        allEcoFacilities.forEach((facility) => {
            numOfLikes = facility.like.length
            console.log(numOfLikes)
        })

        res.render("ecoFacilities/allEcoFacilities.ejs", { allEcoFacilities, numOfLikes })
    } catch (err) {
        console.log(err)
    }
})

router.get("/update/:id", async (req, res) => {
    try {
        const ecoFacility = await EcoFacility.findById(req.params.id).populate('contributor')
        res.render("ecoFacilities/updateFacility.ejs", { ecoFacility })
    } catch (err) {
        console.log(err)
    }
})


router.put("/update/:id", async (req, res) => {
    try {
        await EcoFacility.findByIdAndUpdate(req.params.id, req.body)
        res.redirect("/ecoFacilities")
        console.log("eco facility updated successfully")
    } catch (err) {
        console.log("can't update the facility", err)
    }
})

router.delete("/delete/:id", async (req, res) => {
    try {
        await EcoFacility.findByIdAndDelete(req.params.id)
        res.redirect("/ecoFacilities")
        console.log("facility have been deleted successfully")
    } catch (err) {
        console.log("can't delete the facility", err)
    }
})

// const button = document.querySelector("#likeButton") 

// button.addEventListener('click', (event)=>{
//     event.getElementById("fa-heart").style.color = "red"
// })

//1- the like button can be clicked only if the user is logged in 
//2- After clicking the like button the number of likes must be incremented 
//3- Push the id of the user who clicked the like button on the array of likes
// 4- if the user clicked the like button again and its id already exist on the array then it wil dislike and the number of likes will be decremented


// router.get('/like', (req,res)=>{
//     res.render("ecoFacilities/like.ejs")
// })

router.put("/like/:id", async (req, res) => {
    try {
        const { user } = req.session
        const ecoFacility = await EcoFacility.findById(req.params.id)//.push(user._id)

        const isInArray = ecoFacility.like.findIndex((oneLike) => {
            return JSON.stringify(oneLike) === JSON.stringify(user._id)
        })


        if (isInArray == -1) {
            ecoFacility.like.push(user._id)
        } else (
            ecoFacility.like.splice(isInArray, 1)
        )
        ecoFacility.save()


        res.redirect("/ecoFacilities")
    } catch (err) {
        console.log(err)
    }
})

module.exports = router