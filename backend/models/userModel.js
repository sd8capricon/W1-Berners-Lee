const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    mediacalHistory:{
        cancer: false,
        heartAttack: false,
        diabetes: false,
        bloodPressure: false,
        covid: false
    }
});

const User = new mongoose.model('User', userSchema);

module.exports = User;