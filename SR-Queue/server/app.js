
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const authRouter = require('./router/auth');
const caseRouter = require('./router/case');
const systemRouter = require('./router/system');
const autoIncrement = require('mongoose-auto-increment');

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

app.use("/api/auth" , authRouter);
app.use("/api/case" , caseRouter);
app.use("/api/system" , systemRouter);

app.use((error, req, res, next) => {

  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });

});

mongoose.connect('mongodb+srv://admin:admin@batman-mkrpo.mongodb.net/queue?retryWrites=true&w=majority', {useNewUrlParser: true})
.then( result => {
    console.log("Database Connected");
    app.listen(3000);
})
.catch( err => {
    console.log("Error connecting Database",err);
})