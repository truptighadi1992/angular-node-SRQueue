const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const powerSchema = new Schema({
    title : {
        type: String,
        required: true
    },
    stars : {
        type: Number,
        required: true
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Categorie", required: true },
    description : {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Power', powerSchema);