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
        enum : []
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
    }
})

const EcoFacility = model("EcoFacility", ecoFacilitySchema)

module.exports = EcoFacility