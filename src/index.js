'use strict';

// load modules
var express = require('express');
var morgan = require('morgan');
const mongoose = require("mongoose");
var app = express();
const seed = require("./seed");
const bodyParser = require('body-parser');
const users = require('./routes/users');
const courses = require('./routes/courses');


mongoose.connect("mongodb://localhost:27017/courseRatingAPI", () =>{


});
const db = mongoose.connection;
// mongo error
db.on("error", console.error.bind(console, "connection error:"))

db.once("open", () =>{
  console.log("connection a success!!!!")
})

// Connect to MongoDB via Mongoose


// set our port
app.set('port', process.env.PORT || 5000);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.use('/api/users', users);
app.use('/api/courses', courses);

// morgan gives us http request logging
app.use(morgan('dev'));

// setup our static route to serve files from the "public" folder
app.use('/', express.static('public'));

// catch 404 and forward to global error handler
app.use(function(req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// Express's global error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    errorCode: err.status
  });
});
// start listening on our port
var server = app.listen(app.get('port'), function() {
  console.log('Express server is listening on port ' + server.address().port);
});
