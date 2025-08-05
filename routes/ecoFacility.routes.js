const router = require("express").Router()
const EcoFacility = require("../models/EcoFacility")
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
            req.body.img = "/images/parking.png"
        } else if (req.body.category === "e-Scooters") {
            req.body.img = "/images/E-scooters.png"
        } else if(req.body.category === "Public EV Charging Stations"){
            req.body.img = "/images/charging.png"
        }else if(req.body.category === "Battery Recycling Points"){
            req.body.img = "/images/processing-point.png"
        }else if(req.body.category === "Community Compost Bins"){
            req.body.img = "/images/composting.png"
        }else if(req.body.category === "Green Roofs"){
            req.body.img = "/images/green-roof.png"
        }else if(req.body.category === "Public Water Refill Stations"){
            req.body.img = "/images/refill.png"
        }else if(req.body.category === "Waste Oil Collection Points"){
            req.body.img = "/images/liquid.png"
        }else if(req.body.category === "Pollinator Gardens"){
            req.body.img = "/images/insects.png"
        }else if(req.body.category === "E-Waste Collection Bins"){
            req.body.img = "/images/E-waste.jpeg"
        }else if(req.body.category === "Clothing Donation Bins"){
            req.body.img = "/images/donate_03.jpg"
        }


        await EcoFacility.create(req.body)
        console.log("Eco Facility added successfully")
        res.redirect("/ecoFacilities")
    } catch (err) {
        console.log(err)
    }
})

router.get("", async (req, res) => {
    try {
        const allEcoFacilities = await EcoFacility.find().populate('contributor')
      
        res.render("ecoFacilities/allEcoFacilities.ejs", { allEcoFacilities })  
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

router.put("/like/:id", async (req, res) => {
    try {
         const { user } = req.session
        if(user){    
        const ecoFacility = await EcoFacility.findById(req.params.id)

        const isInArray = ecoFacility.like.findIndex((oneLike) => {
            return JSON.stringify(oneLike) === JSON.stringify(user._id)
        })


        if (isInArray == -1) {
            ecoFacility.like.push(user._id)
        } else (
            ecoFacility.like.splice(isInArray, 1)
        )
        ecoFacility.save()
        }

        else{
            console.log("ELSE")
            return res.render("/ecoFacilities")
        }
        res.redirect("/ecoFacilities")
    } catch (err) {
        console.log(err)
    }
})

module.exports = router