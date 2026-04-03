const e = require('express');
const mongoose = require('mongoose');

const DB  = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    brand : {
        type : String,
    },
    category : {
        type : String,
        required : true,
        enum : ['MCU', 'Sensor', 'Motor','Part', 'Other']
    },
    quantity : {
        type : Number,
        default : 0
    },
    location : {
        type : String,
        default : "Not specified"
    },
    status : {
        type : String,
        enum : ['Ready','In Use','Broken'],
        default : 'Ready'
    },
    minStock : {
        type : Number,
        default : 2
    },
    modelPath : {
        type : String,

    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Hardware', DB);