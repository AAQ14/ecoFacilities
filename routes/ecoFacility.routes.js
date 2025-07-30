const router = require("express").Router()
const EcoFacility = require("../models/ecoFacility")

router.get("/new", (req, res) => {
    res.render("ecoFacilities/new.ejs")
})

router.post("/new", async (req, res) => {
    try {
        await EcoFacility.create(req.body)
        console.log("Eco Facility added successfully")
        res.redirect("/ecoFacilities/new")
    } catch (err) {
        console.log(err)
    }
})

router.get("", async (req, res) => {
    try {
        const allEcoFacilities = await EcoFacility.find()
        console.log(allEcoFacilities)
        res.render("ecoFacilities/allEcoFacilities.ejs", { allEcoFacilities: allEcoFacilities })
    } catch (err) {
        console.log(err)
    }
})

router.get("/details/:id", async (req, res) => {
    try {
        const ecoFacility = await EcoFacility.findById(req.params.id)
        res.render("ecoFacilities/facility-details.ejs", { ecoFacility })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router