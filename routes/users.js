var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var router = express.Router();

var User = require("../db/user_option");


/* GET users listing. */
router.get('/', function (req, res, next) {
    superagent.get('http://www.cnblogs.com/LIUYANZUO')
        .end(function (err, sres) {
            // console.log(res);
            // console.log(err);
            if (err) {
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var items = [];
            $('.day').each(function (index, element) {
                var $element = $(element);
                items.push({
                    date: $element.find('.dayTitle').text(),
                    title: $element.find('.postTitle').text(),
                    content: $element.find('.c_b_p_desc').text(),
                    href: $element.find('.postTitle2').attr('href')
                });
            });
            res.send(items);
        });
    // User.insert();
    // User.update();
    // User.findByIdAndUpdate();
    // User.del();

    // res.send('respond with a resource');
});

module.exports = router;
