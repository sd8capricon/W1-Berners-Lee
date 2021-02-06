const User = require('../models/userModel');
const router = require('express').Router();

router.post('/status', (req, res)=>{
    const username = req.body.username;
    User.findOne({ username: username }, (err, user)=>{
        if(user){
            res.status(200).json({
                gameAttempted: user.gameAttempted,
                gameScore: user.gameScore
            })
        }
        else if(err){
            res.status(200).json({
                error: err
            });
        }
    });
})

router.post('/submit', (req, res)=>{
    const username = req.body.username;
    const gameAttempted = req.body.gameAttempted;
    const gameScore = req.body.gameScore;
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