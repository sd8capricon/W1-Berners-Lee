const Insurance = require('../models/insuranceModel');
const User = require('../models/userModel');
const router = require('express').Router();

router.post('/', async(req, res)=>{
    let username = req.body.username;
    let cancer= false;
    let heartAttack= false;
    let diabetes=false;
    let bloodPressure= false;
    let covid= false;
    await User.findOne({ username: username }, (err, user)=>{
        if(!err){
            cancer= user.medicalHistory.cancer,
            heartAttack= user.medicalHistory.heartAttack,
            diabetes= user.medicalHistory.diabetes,
            bloodPressure= user.medicalHistory.bloodPressure,
            covid= user.medicalHistory.covid
            console.log('success');
        }
        else{
            console.log(err);
        }
    });
    //Right Now It cant Sort and Show Insurances
    await Insurance.find({}, (err, insurance)=>{
        if(!err){
            console.log(insurance);
            res.json(insurance);
        }else{
            console.log(err);
            res.json(err);            
        }
    });

});


//Planned Feature
router.post('/add', (req, res)=>{
    const insuranceName = req.body.name || false;
    const insuranceDescription = req.body.description || false;
    const cancer = req.body.insuranceFor.cancer || false;
    const heartAttack = req.body.insuranceFor.heartAttack || false;
    const diabetes = req.body.insuranceFor.diabetes || false;
    const bloodPressure = req.body.insuranceFor.bloodPressure || false;
    const covid = req.body.insuranceFor.covid || false;
    const insurance= new Insurance({
        insuranceName: insuranceName,
        insuranceDescription: insuranceDescription,
        insuranceFor:{
            cancer: cancer,
            heartAttack: heartAttack,
            diabetes: diabetes,
            bloodPressure: bloodPressure,
            covid: covid
        }
    });
    insurance.save((err, result)=>{
        if(err){
            console.log(err);
            res.status(200).json({
                message: 'could not regsiter try again',
                error: err
            })
        }
        else if(result){
            console.log(result);
            res.status(200).json({
                message: 'insurance saved',
            })
        }
    });
})

module.exports = router;