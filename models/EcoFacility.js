const mongoose = require("mongoose")
const {model, Schema} = mongoose

const ecoFacilitySchema = new Schema({
    name: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require : true, 
        enum : ["Recycling Bins", "e-Scooters", "Bike Share Stations", "Public EV Charging Stations"
            , "Battery Recycling Points", "Community Compost Bins", "Solar-Powered Benches", "Green Roofs", "Public Water Refill Stations",
             "Waste Oil Collection Points", "Book Swap Stations", "Pollinator Gardens", "E-Waste Collection Bins", "Clothing Donation Bins"]
    },
    descrtiption:{
        type: String
    },
    houseNumber:{
        type: String
    },
    streetName:{
        type: String
    }, 
    town: String ,
    status: String,
    contributor: {
        type: Schema.Types.ObjectId,
        ref : "User"
    },
    img: {
        type: String
    },
    like: [{
        type: Schema.Types.ObjectId,
        ref : "User"
    }]
})

const EcoFacility = model("EcoFacility", ecoFacilitySchema)

module.exports = EcoFacility