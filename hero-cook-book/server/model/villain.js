const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const villainSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    powers: [
        {
            "boost": { type: Number,  default: 1},
            "power" :  { type: mongoose.Schema.Types.ObjectId, ref: "Power", required: true }
            
        }
    ],
    strengths : [{type:String}],
    imageURL : {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('Villain', villainSchema);