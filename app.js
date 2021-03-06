//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog');  //Import routes for "catalog" area of site



const app = express();

// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
var mongoDB = "mongodb+srv://Arsenal:Test123@cluster0.18gd6.mongodb.net/Local_library?retryWrites=true&w=majority"
mongoose.connect(mongoDB, {useUnifiedTopology:true, useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started on port Successfully");
});
