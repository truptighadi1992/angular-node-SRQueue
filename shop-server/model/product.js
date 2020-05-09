const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    seller:{
        type: String,
        required: true
    },
    imageUrl : {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    availableSizes: [
        {
            "name": { type: String,   required: true},
            "avaialble" :  { type: Boolean,   required: true}
            
        }
    ],
    material:  {
        type: String,
        required: true
    },
    care:  {
        type: String,
        required: true
    },
    sizeInfo:  {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Product', productSchema);