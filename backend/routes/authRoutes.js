const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const router = require('express').Router();

router.post('/register', async(req, res)=>{
    const username = req.body.username;
    const initialPassword = req.body.password;
    const saltRounds = 10;
    if(initialPassword.length >= 6){
        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(initialPassword, salt, function(err, hashPass) {
                const user = new User({
                    username: username,
                    password: hashPass,
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
                user.save((err, result)=>{
                    if(err){
                        console.log(err);
                        res.status(200).json({
                            message: 'could not regsiter try again',
                            error: err.message
                        })
                    }
                    else if(result){
                        console.log(result);
                        res.status(200).json({
                            message: 'user saved',
                        })
                    }
                }); 
            });
        });
    }
    else{
        res.status(200).json({
            message: 'could not regsiter try again',
            error: "password length should be greater than or equal to 6"
        })
    }
    
})

router.post('/login', (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);
    User.findOne({ username: username }, (err, user)=>{
        if(user){
            bcrypt.compare(password, user.password, (err, result)=>{
                if(!err){
                    console.log(result);
                    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn:'3h' });
                    res.status(200).json({
                        message: 'User Authentication Successful',
                        authenticated: true,
                        token: token
                    });
                }
                else{
                    console.log(err);
                    res.status(200).json({
                        message: 'User Authentication Failed',
                        authenticated: false,
                        error: 'Incorrect Password'
                    });
                }
            });
        }
        else{
            console.log(err);
            res.status(200).json({
                message: 'User Authentication Failed',
                authenticated: false,
                error: 'Incorrect Credentials'
            });
        }
    });
});

router.post('/verifytoken', (req, res)=>{
    const token=req.body.token;
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(!err){
            res.status(200).json({
                authStatus: true
            });
        }else{
            res.status(200).json({
                authStatus: false
            })
        }
    });
});

module.exports = router;