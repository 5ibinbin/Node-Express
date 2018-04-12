var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var async = require('async');
var router = express.Router();

var User = require("../db/poem_option");


/**
 * 诗歌列表
 * */
router.get('/poem/list', function (req, res, next) {
    superagent.get('https://www.gushiwen.org/shiwen/')
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var items = [];
            var fanyi = [];
            var zhushi = [];
            var shangxi = [];
            $('.left .sons').each(function (index, element) {
                var $element = $(element);
                items.push({
                    id: $element.find('.toolerweima').attr('id').slice(6),
                    title: $element.find('p > a > b').text(),
                    dynasty: $element.find('.source > a').first().text(),
                    author: $element.find('.source > a').last().text(),
                    content: $element.find('.contson').text(),
                    tag: $element.find('.tag').text(),
                    star: $element.find('.tool > .good > a').text()
                });
            });
            $('.main3 .sons .cont .yizhu').map(function (index, element) {
                var $element = $(element);
                var url = 'https://www.gushiwen.org/shiwen2017/ajaxshiwencont.aspx?id=';
                var id = $element.find('img').attr('id').slice(10);
                fanyi.push(url + id + '&value=yi');
                zhushi.push(url + id + '&value=zhu');
                shangxi.push(url + id + '&value=shang');
            });

            async.mapLimit(fanyi, 10, function (url, callback) {
                superagent.get(url)
                    .end(function (error, response) {
                        if (error) {
                            return next(error)
                        }
                        var $ = cheerio.load(response.text);
                        var $element = $(response.text);
                        callback(null, $element.text());
                    })
            }, function (err, result) {
                for (var i = 0; i < result.length; i++) {
                    items[i].fanyi = result[i]
                }
            });

            async.mapLimit(zhushi, 10, function (url, callback) {
                superagent.get(url)
                    .end(function (error, response) {
                        if (error) {
                            return next(error)
                        }
                        var $ = cheerio.load(response.text);
                        var $element = $(response.text);
                        callback(null, $element.text());
                    })
            }, function (err, result) {
                for (var i = 0; i < result.length; i++) {
                    items[i].zhushi = result[i]
                }
            });

            async.mapLimit(shangxi, 10, function (url, callback) {
                superagent.get(url)
                    .end(function (error, response) {
                        if (error) {
                            return next(error)
                        }
                        var $ = cheerio.load(response.text);
                        var $element = $(response.text);
                        callback(null, $element.text());
                    })
            }, function (err, result) {
                for (var i = 0; i < result.length; i++) {
                    items[i].shangxi = result[i]
                }
                res.send(items);
            });
        });
});

/**
 * 类型列表
 * */
router.get('/poem/type/list', function (req, res, next) {

    superagent.get('https://www.gushiwen.org/shiwen/')
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var items = [];
            console.log($('.right .sons').first().find('a').length)
            $('.right .sons').first().find('a').each(function (index, element) {

                var $element = $(element);
                items.push({
                    url: $element.attr('href'),
                    type: $element.text()
                })
            })
            res.send(items);
        });
});
/**
 * 作者列表
 * */
router.get('/poem/author/list', function (req, res, next) {

    superagent.get('https://www.gushiwen.org/shiwen/')
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var items = [];
            console.log($('.right .sons').next().find('a').length)
            $('.right .sons').next().find('a').each(function (index, element) {

                var $element = $(element);
                items.push({
                    url: 'https://www.gushiwen.org' + $element.attr('href'),
                    type: $element.text()
                })
            })
            res.send(items);
        });
});

/**
 * 朝代列表
 * */
router.get('/poem/dynasty/list', function (req, res, next) {

    superagent.get('https://www.gushiwen.org/shiwen/')
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var items = [];
            $('.right .sons').slice(2, 3).find('a').each(function (index, element) {

                var $element = $(element);
                items.push({
                    url: 'https://www.gushiwen.org' + $element.attr('href'),
                    type: $element.text()
                })
            })
            res.send(items);
        });
});

/**
 * 诗歌形式
 * */
router.get('/poem/form/list', function (req, res, next) {

    superagent.get('https://www.gushiwen.org/shiwen/')
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var items = [];
            $('.right .sons').last().find('a').each(function (index, element) {

                var $element = $(element);
                items.push({
                    url: 'https://www.gushiwen.org' + $element.attr('href'),
                    type: $element.text()
                })
            })
            res.send(items);
        });
});
/**
 * 作者列表
 * */
router.get('/author/list', function (req, res, next) {

    superagent.get('https://so.gushiwen.org/authors/')
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var items = [];
            $('.main3 .left .sonspic').each(function (index, element) {

                var $element = $(element);
                items.push({
                    img: $element.find('.cont > .divimg > a > img').attr('src'),
                    name: $element.find('p> a >b').text(),
                    desc: $element.find('p').next().text(),
                    href: $element.find('p > a').attr('href'),
                    star: $element.find('.tool > .good > a > span').text()
                })
            })
            res.send(items);
        });
});

/**
 * 获取作者详细信息
 * */
router.get('/author/detail', function (req, res, next) {
    superagent.get('https://so.gushiwen.org/authorv_b90660e3e492.aspx')
        .end(function (err, sres) {
            if (err) {
                return next(err);
            }
            var $ = cheerio.load(sres.text);
            var author = {};
            var recordUrls = [];
            var record = [];
            var items = {};
            $('.main3 .left').map(function (index, element) {
                var $element = $(element);
                author = {
                    img: $element.find('.sonspic > .cont > .divimg > img').attr('src'),
                    name: $element.find('.sonspic > .cont > h1 > span').text(),
                    desc: $element.find('.sonspic > .cont > p').text(),
                    href: 'https://so.gushiwen.org' + $element.find('.sonspic > .cont > p > a').attr('href'),
                    star: $element.find('.sonspic > .tool > .good > a > span').text()
                }
            });
            $('.main3 .left .sons').each(function (index, element) {
                var $element = $(element);
                if ($element.attr('id') && index % 2 === 0) {
                    recordUrls.push('https://so.gushiwen.org/authors/ajaxziliao.aspx?id=' + $element.attr('id').slice(5))
                }
            });

            var ep = new eventproxy();
            var obj = {};
            //循环遍历
            recordUrls.forEach(function (item) {
                superagent.get(item)
                    .end(function (err, res) {
                        ep.emit('record_html', res.text);
                    })
            });
            //控制并发
            ep.after('record_html', recordUrls.length, function (item) {
                record = item.map(function (page) {
                    var $ = cheerio.load(page);
                    var $element = $(page);
                    obj = {
                        type: $element.find('div > h2 > span').text(),
                        content: $element.find('.contyishang > p').text()
                    };
                    return obj;
                });
                items.author = author;
                items.record = record;
                res.send(items);
            });
        });
});

module.exports = router;
