const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const levelSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    villain: { type: mongoose.Schema.Types.ObjectId, ref: "Villain", required: true } 
})

module.exports = mongoose.model('Level', levelSchema);