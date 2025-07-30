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

router.get("/update/:id", async (req, res) => {
    try {
        const ecoFacility = await EcoFacility.findById(req.params.id)
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

router.delete("delete/:id", async(req,res)=>{
    try{
        await EcoFacility.findByIdAndDelete(req.params.id)
        res.redirect("/ecoFacilities")
        console.log("facility have been deleted successfully")
    }catch(err){
        console.log("can't delete the facility", err)
    }
})
module.exports = router