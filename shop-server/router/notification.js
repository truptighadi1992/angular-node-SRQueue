const express = require('express');
const router = express.Router();
const webPush = require('web-push');

const  Notification = require('../model/notification.js');

const notificationPayload = {
    "notification": {
        "title": "Shopify",
        "body": "You have successfully subscribed!",
        "icon": "images/icon-64x64.png",
        "vibrate": [100, 50, 100],
        "data": {
            "dateOfArrival": Date.now(),
            "primaryKey": 1
        },
        "actions": [{
            "action": "explore",
            "title": "Go to the site"
        }]
    }
};
router.post('/subscribe', (req, res, next) =>{
    let savedSub;
    const sub = req.body;
    const newSubscriber = new Notification(
        {
            subscription :sub
        }
    )
    newSubscriber.save()
    .then( saved =>{
        savedSub = saved;
        return webPush.sendNotification( sub, JSON.stringify(notificationPayload) );
    })
    .then( result=>{
        res.json({
            message : "subscription saved",
            subscription : savedSub
        })
    })
    .catch( err =>{
        console.log("error",err);
    })

})

module.exports = router;