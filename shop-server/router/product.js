const express = require('express');
const router = express.Router();

const Product = require('../model/product.js');

router.get('/', (req, res, next) =>{

    Product.find()
    .then( products =>{
        
        res.json({
            message : "data retrieved",
            products : products
        })
    } )
    .catch( err =>{
        console.log("error",err);
    })

})

router.get('/:id', (req, res, next) =>{

    const productId = req.params.id;
    Product.findById(productId)
    .then( productFetched =>{
    
                res.json({
                    message : "data retrieved",
                    product : productFetched
                })
    } )
    .catch( err =>{
        console.log("error",err);
    })

})

module.exports = router;