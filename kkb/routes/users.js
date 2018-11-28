var express = require('express');
var router = express.Router();

/* GET users listing. */
<<<<<<< HEAD
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

=======
// /users/
router.get('/', function (req, res, next) {
    res.render('user');
});

router.post('/', function (req, res, next) {
//    传参方式3：body
    console.log(req.body);

    res.send('服务器接收到你传递数据了！')
})

>>>>>>> f2ea80d13a1d20af6bb75d823fc4a166be34a617
module.exports = router;
