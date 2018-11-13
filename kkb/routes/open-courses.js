var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
    console.log(res.locals);
    res.render('open-courses', {foo: 'bar'})
});

module.exports = router;
