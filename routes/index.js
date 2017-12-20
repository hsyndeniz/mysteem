var steem = require('steem');
var request = require('request');
var express = require('express');
var router = express.Router();

var reput = 15363500824;
var steem_balance, sbd_balance, rep, name, sbd_usd, sbd_try, sbd_api_usd, steem_usd, steem_try,steem_api_usd, sum_usd, sum_try;
var account;


router.post('/', function (req, res) {
        console.log(req.body.username);
        account = req.body.username;

        function* generator() {
            sbd_api_url = "https://min-api.cryptocompare.com/data/price?fsym=SBD&tsyms=TRY,USD";
        request.get(sbd_api_url, { json: true }, function (err, res, body) {
            console.log(body);
            sbd_api_usd = body.USD;
         //   sbd_try = body.TRY;
         //   console.log(sbd_try);
            console.log(sbd_api_usd);
        });

        steem_api_url = "https://min-api.cryptocompare.com/data/price?fsym=STEEM&tsyms=TRY,USD";
        request.get(steem_api_url, { json: true }, function (err, res, body) {
            console.log(body);
            steem_api_usd = body.USD;
          //  steem_try = body.TRY;
            console.log(steem_api_usd)
        });

        steem.api.getAccounts([account], function(err, result) {
            console.log(err, result);
            name = result[0].name;
            steem_balance = result[0].balance;
            rep = (result[0].reputation / reput).toFixed(2);
            sbd_balance = result[0].sbd_balance;
            sbd_usd = (parseFloat(sbd_balance)) * sbd_api_usd;
            steem_usd = (parseFloat(steem_balance)) * steem_api_usd;
            sum_usd = sbd_usd + steem_usd;
         //   sbd_try = (parseFloat(sbd_balance)) * (parseFloat(sbd_try));
         //   steem_try = (parseFloat(steem_balance)) * (parseFloat(steem_try));
          //  sum_try = sbd_try + steem_try;
        });
        }
        var g = generator();
        g.next();

    setTimeout(function(){

        res.render('index', {
            steem_balance:steem_balance,
            sbd_balance:sbd_balance,
            rep:rep, name:name,
            sbd_usd:(sbd_usd),
            steem_usd:(steem_usd),
            sum_usd:(sum_usd)
           // sum_try:(sum_try).toFixed(2)
        });
    }, 15000);
    }
);

/* GET home page. */
router.get('/', function(req, res, next) {
    setTimeout(function(){
        res.render('user', {
            steem_balance:steem_balance,
            sbd_balance:sbd_balance,
            rep:rep, name:name,
            sbd_usd:sbd_usd,
            steem_usd:steem_usd,
            sum_usd:sum_usd
          //  sum_try:sum_try
        });
    },16000);
});

module.exports = router;
