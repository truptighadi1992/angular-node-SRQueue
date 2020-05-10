const express = require('express');
const router = express.Router();

const Power = require('../model/power');
const Category = require('../model/category');
const Level = require('../model/level');
const Villain = require('../model/villain');

router.get('/powers/:categoryId', (req, res, next) =>{

    const categoryId = req.params.categoryId;
    let powers =[];
   
    Category.findById(categoryId).then( categoryData =>{

        const cursor = Power.find({ 'category': categoryId }).cursor();
        cursor.
        on('data', function(powerData) {
    
            var dataToSend = {};
            dataToSend = {
                    ...powerData._doc,
                    "categoryData" : categoryData
            }
            powers.push(dataToSend);
        }).
        on('end', function() { 
    
            res.json({
                message : "data retrieved",
                power: powers
            })
        });
    })    
})

router.get('/categories', (req, res, next) =>{

    Category.find()
    .then( categories =>{
        
        res.json({
            message : "data retrieved",
            category : categories
        })
    } )
    .catch( err =>{
        console.log("error",err);
    })

})

router.get('/levels', (req, res, next) =>{

    Level.find().populate('villain')
    .then( levels =>{
        
        res.json({
            message : "data retrieved",
            level : levels
        })
    } )
    .catch( err =>{
        console.log("error",err);
    })

})

router.get('/level/:id', (req, res, next) =>{

    const levelId = req.params.id;
    Level.findById(levelId).populate('villain').select('villain')
    .then( level =>{
        
        Villain.populate(level.villain,{ "path": "powers.power" }).then(
            villain =>{
               
                res.json({
                    message : "data retrieved",
                    level : level
                })
            }).catch(
                err =>{

                }) 
    } )
    .catch( err =>{
        console.log("error",err);
    })

})

module.exports = router;