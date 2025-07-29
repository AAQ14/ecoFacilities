const mongoose = require("mongoose")
const {model, Schema} = mongoose

const facilitySchema = new Schema({
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
    contributor: String,
    status: String
})

const Facility = model("Facility", facilitySchema)

module.exports = Facility