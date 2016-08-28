// [START app]
'use strict';

// [START setup]
require('dotenv').config();

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
app.enable('trust proxy');
// [END setup]

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/telegram_hook', require('./routes/index'));
// app.use('/users', require('./routes/users'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// ---- Test Telegram by polling the API [start] -----
// let cheerio = require('cheerio');
// let request = require('request');

// // telegram bot
// var TelegramBot = require('node-telegram-bot-api');
// var cappic = require('./lib/cappic');
// var token = process.env.TELEGRAM_TOKEN;
// // Setup polling way 
// var bot = new TelegramBot(token, {polling: true});
 
// // Matches /echo [whatever] 
// bot.onText(/\/test/, function (msg) {
//   var fromId = msg.from.id;
  
//   bot.sendMessage(fromId, 'lalala');
// });

// // Any kind of message 
// bot.on('inline_query', function (msg) {
//   cappic(msg);
// });
// ---- Test Telegram by polling the API [end] -----

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res) {
    res.status(err.status || 500);
    console.log('--- error ----');
    console.log(err.message);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
  res.status(err.status || 500);
  console.log('--- error ----');
  console.log(err.message);
});
// [END app]

module.exports = app;
