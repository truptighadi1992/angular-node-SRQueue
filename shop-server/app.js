const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const webPush = require('web-push');

const vapidKeys = {
  "publicKey":"BLR_XfEzmClxn0NhAiE_2ZoRAvyG-wbxG_i9kXJryf__RqGaHuchbbZ31RIf-tTzAJ4oHZ_4W9i9uYVP-DilNYw",
  "privateKey":"2l8wuVCIkZ0uNy6_oANd0slaRO0nz-6ola8l1Il7ryM"
};

webPush.setVapidDetails(
  'mailto:truptighadi1992@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const productRouter = require('./router/product');
const notificationRouter = require('./router/notification.js');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended :false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use('/api/products/', productRouter);
app.use('/api/notification', notificationRouter);

app.use((error, req, res, next) => {

    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  
});

mongoose.connect('mongodb+srv://trupti:trupti@batman-mkrpo.mongodb.net/shop?retryWrites=true&w=majority')
.then( result =>{
  console.log("Database Connected");
  app.listen(3000);
})
.catch( err =>{
   console.log("Error in connecting database",err.message);
})
