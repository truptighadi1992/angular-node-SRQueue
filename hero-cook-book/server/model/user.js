const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required : true
    },
    stars: {
        type: Number,
        required : true
    },
    levelsCompleted : [
        {
            type: mongoose.Schema.Types.ObjectId, ref: "Level", required: true 
        }
    ]
})


module.exports = mongoose.model('User',userSchema);