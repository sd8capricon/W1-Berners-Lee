const User = require('../models/userModel');
const router = require('express').Router();

router.post('/submit', (req, res)=>{
    const username = req.body.username;
    const gameAttempted = req.body.gameAttempted || false;
    const gameScore = req.body.gameScore || 0;
    User.findOneAndUpdate({ username: username }, { gameAttempted: gameAttempted, gameScore: gameScore }, { new: true }, (err,result)=>{
        if(!err){
            res.status(200).json({
                message: "User Score Submitted Successfully",
                result: result,
            });
        }
        else{
            res.status(200).json({
                message: "Could Not Submit User Score",
                error: err
            })
        }
    });
});

module.exports = router;