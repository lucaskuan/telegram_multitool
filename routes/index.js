'use strict';

var express = require('express');
var router = express.Router();
let cheerio = require('cheerio');
let request = require('request');
var TelegramBot = require('node-telegram-bot-api');
var cappic = require('../lib/cappic');
var token = process.env.TELEGRAM_TOKEN;
var bot = new TelegramBot(token);

// [START hello_world]
router.post('/', function (req, res) {
  console.log(token);
  var body = req.body;

  var inlineQuery = body.inline_query;

  cappic(inlineQuery);

  res.send('');
});
// [END hello_world]

module.exports = router;
