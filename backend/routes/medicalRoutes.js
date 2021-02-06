const User = require('../models/userModel');
const router = require('express').Router();

router.post('/status', (req, res)=>{
    const username=req.body.username;
    User.findOne({ username: username }, (err, user)=>{
        if(!err){
            res.status(200).json({
                username: user.username,
                cancer: user.medicalHistory.cancer,
                heartAttack: user.medicalHistory.heartAttack,
                diabetes: user.medicalHistory.diabetes,
                bloodPressure: user.medicalHistory.bloodPressure,
                covid: user.medicalHistory.covid
            });
        }
        else{
            res.status(200).json({
                error:"Could not find any medical history"
            });
        }
    });
});

router.post('/update', (req, res)=>{
    const username = req.body.username;
    const cancer = req.body.cancer;
    const heartAttack = req.body.heartAttack;
    const diabetes = req.body.diabetes;
    const bloodPressure = req.body.bloodPressure;
    const covid = req.body.covid;
    User.findOneAndUpdate({ username: username }, { cancer: cancer, heartAttack: heartAttack, diabetes: diabetes, bloodPressure:bloodPressure, covid: covid }, { new: true }, (err, result)=>{
        if (!err) {
            res.status(200).json({
                message:"Data Updated Successfully"
            })
        } else {
            res.status(200).json({
                message:"Error While Updating Data",
                error: err        
            })
        }
    });
});

module.exports = router;