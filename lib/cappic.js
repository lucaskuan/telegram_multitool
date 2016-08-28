'use strict';

let cheerio = require('cheerio');
let request = require('request');
var TelegramBot = require('node-telegram-bot-api');
var token = process.env.TELEGRAM_TOKEN;
var bot = new TelegramBot(token);

module.exports = function(inlineQuery) {
  if (inlineQuery) {
    var query = inlineQuery.query;

    if (query.length > 0) {
      request('http://img.anyanother.com/search/all/keyword/' + encodeURI(query) + '/page/1/', function (error, res, body) {
        if (!error && res.statusCode == 200) {
          console.log('----- no error');
          let $ = cheerio.load(body);
          var photos = [];

          $('.image').each(function(i, ele) {
            var thumbUrl = $(this).find('img').attr('src');
            var title = $(this).find('img').attr('title');

            if (thumbUrl.match(/(?=http:\/\/img.anyanother.com\/thumb)/)) {
              var imageUrl = thumbUrl.replace(/thumb/, 'data');
              console.log(thumbUrl);
              console.log(title);
              photos.push({
                type: 'photo',
                id: thumbUrl.split('/').slice(-1)[0].replace('.jpg',''),
                photo_url: imageUrl,
                thumb_url: imageUrl,
                photo_width: 200,
                photo_height: 140,
                title: title
              });
            }
          });
          
          bot.answerInlineQuery(inlineQuery.id, photos).then(function(res) {
            console.log(res);
          }).catch(function(err) {
            console.log('error answering inline query');
            console.log(err);
          });
        } else {
          console.log(error)
        }
      });
    }
  } 
}