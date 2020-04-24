const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;

const caseSchema = new Schema({
    status:{
        type: String,
        required: true,
        default: 'open'
    },
    type:{
        type: String,
        required: true
    },
    subtype:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    system: { type: mongoose.Schema.Types.ObjectId, ref: "System", required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});
autoIncrement.initialize(mongoose.connection); 
caseSchema.plugin(autoIncrement.plugin, {
    model: 'Case',
    field: 'caseId',
    startAt: 1000,
    incrementBy: 1
});

module.exports = mongoose.model('Case',caseSchema);