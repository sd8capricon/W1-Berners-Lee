const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Input username'],
        unique: [true, 'Username should be unique'],
        minLength: [2, "Min username length should be 2 characters"],
        maxLength: [12, "Max username length is 12 characters"],
        
    },
    password:{
        type: String,
        required: [true, 'input password'],
    },
    mediacalHistory:{
        cancer: false,
        heartAttack: false,
        diabetes: false,
        bloodPressure: false,
        covid: false
    },
    gameAttempted: false,
    gameScore: 0
});

const User = new mongoose.model('User', userSchema);

module.exports = User;