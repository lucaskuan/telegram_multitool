// Copyright 2015-2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

var express = require('express');
var router = express.Router();
let cheerio = require('cheerio');
let request = require('request');
var TelegramBot = require('node-telegram-bot-api');
var token = process.env.TELEGRAM_TOKEN;
var bot = new TelegramBot(token);

// [START hello_world]
router.post('/', function (req, res) {
  var body = req.body;

  var inlineQuery = body.inline_query;

  if (inlineQuery) {
    var query = inlineQuery.query;
console.log("query length " + query.length)
    if (query.length > 0) {
      request('http://www.whatscap.com/web/search.jsp?q=' + query, function (error, res, body) {
        if (!error && res.statusCode == 200) 
          console.log('----- no error')
          let $ = cheerio.load(body);
          var photos = [];
          $('.itemcell').each(function(i, elem) {
            var text = $(this).children('.textcaption').text();
            var imageUrl = $(this).children('.photo').css('background-image').slice(4, -1);
            var imageId = imageUrl.split('/').slice(-1)[0];

            photos.push({
              type: 'photo',
              id: imageId,
              photo_url: imageUrl,
              thumb_url: imageUrl,
            });
          });

          bot.answerInlineQuery(inlineQuery['id'], photos);
      });
    } else {
      console.log(error)
    }
  }

  res.send('');
});
// [END hello_world]

module.exports = router;
