const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const adminRouter = require('./router/admin');
const heroRouter = require('./router/hero');
const villainRouter = require('./router/villain');

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

app.use('/api/master/', adminRouter);
app.use('/api/hero/', heroRouter);
app.use('/api/villain/', villainRouter);

app.use((error, req, res, next) => {

    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
  
});

mongoose.connect('mongodb+srv://trupti:trupti@batman-mkrpo.mongodb.net/cookoff?retryWrites=true&w=majority')
.then( result =>{
  console.log("Database Connected");
  app.listen(3000);
})
.catch( err =>{
   console.log("Error in connecting database",err.message);
})
