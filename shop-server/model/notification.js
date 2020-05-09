const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    subscription : {
        type: Object,
        required: true
    }
})

module.exports = mongoose.model('Notification', notificationSchema);