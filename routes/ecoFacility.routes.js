const router = require("express").Router()
const EcoFacility = require("../models/ecoFacility")
const User = require("../models/User")

router.get("/new", (req, res) => {
    res.render("ecoFacilities/new.ejs", {user: req.session.user})
})

router.post("/new", async (req, res) => {
    try {
       req.body.contributor = req.session.user._id
       if(req.body.category === "Recycling Bins"){
        req.body.img = "/images/recycling Bins.png"
       }else if(req.body.category === "Bike Share Stations"){
         req.body.img = "/images/BikeShareStation.png"
       }else if(req.body.category === "e-Scooters"){
         req.body.img = "/images/e-Scooters.jpg"
       }else if(req.body.category === "Public EV Charging Stations"){
         req.body.img = "/images/PublicEVChargingStations.png"
       }
        await EcoFacility.create(req.body)
        console.log("Eco Facility added successfully")
        res.redirect("/ecoFacilities/new")
    } catch (err) {
        console.log(err)
    }
})

router.get("/", async (req, res) => {
    try {
        const allEcoFacilities = await EcoFacility.find().populate('contributor')
        res.render("ecoFacilities/allEcoFacilities.ejs", {  allEcoFacilities })
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


router.put("/update/:id", async(req,res) => {
    try{
        await EcoFacility.findByIdAndUpdate(req.params.id, req.body)
        res.redirect("/ecoFacilities")
        console.log("eco facility updated successfully")
    }catch(err){
        console.log("can't update the facility", err)
    }
})

router.delete("/delete/:id", async(req,res)=>{
    try{
        await EcoFacility.findByIdAndDelete(req.params.id)
        res.redirect("/ecoFacilities")
        console.log("facility have been deleted successfully")
    }catch(err){
        console.log("can't delete the facility", err)
    }
})
module.exports = router