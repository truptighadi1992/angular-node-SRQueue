const express = require('express');
const router = express.Router();

const Villain = require('../model/villain');

router.get('/:id', (req, res, next) =>{

    const villainId = req.params.id;
    Villain.
    findById(villainId).populate('powers.power').
    exec(function (err, villain) {

        if (err){
            console.log("error",err);
            if(!err.statusCode){
                err.statusCode = 500;
              }
               return next(err);
        };

        res.json({
            message : "villain fetched successfully",
            villain: villain
        })
    });  
})


module.exports = router;