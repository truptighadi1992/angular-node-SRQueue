const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const systemSchema = new Schema({
    systemId:{
        type: String,
        required: true,
        unique: true,
    },
    modality:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    }
})


module.exports = mongoose.model('System',systemSchema);