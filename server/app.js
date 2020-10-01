// set base dir
global.__basedir = __dirname;

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var cors = require('cors');

var indexRouter = require('./routes/index');
var sketchRouter = require('./routes/sketch');

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/sketch', sketchRouter);

module.exports = app;
