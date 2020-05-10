const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const heroSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Categorie", required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    powers: [
        {
            boost: { type: Number,  default: 1},
            power :  { type: mongoose.Schema.Types.ObjectId, ref: "Power", required: true },
            _id: false 
        }
    ],
    stars : {
        type:Number,
        required: true
    }
})

module.exports = mongoose.model('Hero', heroSchema);