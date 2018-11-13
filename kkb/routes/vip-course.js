var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:course', (req, res) => {
    //res.locals.bar = 'foo';
    //console.log(res.locals.courses)
    //res.render('vip-course')

    console.log(req.params.course);
    res.render('vip-course/'+req.params.course
        , {title: getTitle(res, req.params.course)}
    );
});

function getTitle(res, course) {
    for( const c of res.locals.courses) {
        if (c.url.indexOf(course) != -1){
            return c.name;
        }
    }
    return '';
    
}

module.exports = router;
