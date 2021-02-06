const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const router = require('express').Router();

router.post('/register', (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const user = new User({
        username: username,
        password: password
    });
    user.save((err, result)=>{
        if(err){
            console.log(err);
            res.status(200).json({
                message: 'could not regsiter try again',
            });
        }
        else if(result){
            console.log(result);
            res.status(200).json({
                message: 'user saved',
            });
        }
    });
})

router.post('/login', (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    console.log('body '+password);
    User.findOne({ username: username }, (err, user)=>{
        if(user){
            console.log(user.password);
            if(user.password === password){
                const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn:'1h' });
                res.json({
                    message: 'User Authentication Successful',
                    authenticated: true,
                    token: token
                });
            }
            else{
                res.json({
                    message: 'User Authentication Failed',
                    authenticated: false,
                    error: 'Incorrect Password'
                });
            }
        }
        else{
            res.json({
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