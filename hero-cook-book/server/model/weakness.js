const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const weaknessSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    stars : {
        type: Number,
        required: true
    },
    description : {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Weakness', weaknessSchema);