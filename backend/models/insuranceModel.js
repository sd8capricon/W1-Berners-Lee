const mongoose = require('mongoose');

const insuranceSchema = new mongoose.Schema({
    insuranceName: String,
    insuranceDescription: String,
    insuranceFor:{
        cancer: false,
        heartAttack: false,
        diabetes: false,
        bloodPressure: false,
        covid: false,
    }
});

const Insurance = new mongoose.model('Insurance', insuranceSchema);

module.exports = Insurance;