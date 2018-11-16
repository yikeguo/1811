const express = require('express');
const router = express.Router();
const {query} = require('../models/db');

// http://localhost:3000/open-courses/
router.get('/', async (req, res, next) => {
    // 输出vip菜单
    //console.log(res.locals.courses);

    try {
        const currentPage = req.query.page || 1;
        const pageSize = req.query.pageSize || 1;
        const offset = (currentPage-1)* pageSize;
        const sql = 'SELECT * FROM kkb.open_courses order by time DESC LIMIT ?,?'
        const results = await query(sql, [offset, pageSize]);
        for (const result of results) {
            const now = new Date();
            const endTime = new Date(result.time)
            if( now - endTime > 0 ){
                result.notBegin = false;
            }else {
                result.notBegin = true;
            }
        }
        
        res.render('open-courses', {
            title: '公开课',
            openCourses: results
        });
    } catch (err) {
        console.log(err);
        next(err);
    }

    // res.render('open-courses', {foo:'bar'})
})


module.exports = router;