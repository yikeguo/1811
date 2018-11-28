var express = require('express');
var router = express.Router();

/* GET home page. */
<<<<<<< HEAD
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello ,Express' });
=======
router.get('/', function (req, res, next) {
    //渲染页面
    res.render('index', {
        title: '你好,Express',
        showVideo: false,

    });
>>>>>>> f2ea80d13a1d20af6bb75d823fc4a166be34a617
});

module.exports = router;
