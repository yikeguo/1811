const express = require('express');
const router = express.Router();
const {query} = require('../models/db');
const {OpenCourse} = require('../models');

// http://localhost:3000/open-courses/
router.get('/', async (req, res, next) => {
    // 输出vip菜单
    //console.log(res.locals.courses);

    try {
        const page = +req.query.page || 1;
        const size = +req.query.size || 1;
        const offset = (page-1)* size;
        const sql = 'SELECT * FROM kkb.open_courses order by time DESC LIMIT ?,?'
        const results = await query(sql, [offset, size]);
        for (const result of results) {
            const now = new Date();
            const endTime = new Date(result.time)
            if( now - endTime > 0 ){
                result.notBegin = false;
            }else {
                result.notBegin = true;
            }
        }
        
        // const count = 
        // await query('SELECT count(*) as count FROM kkb.open_courses')
        //     .then(results = results[0].count )
        //     console.log('' + count);

        const count =
            await query('SELECT count(*) as count FROM kkb.open_courses')
                .then(results => results[0].count)
        console.log('总条数：' + count);
        const total = Math.ceil( count / size );
        const first = page != 1;
        const last = page != total;
        const prev = page > 1;
        const next = page < total;

        res.render('open-courses', {
            title: '公开课',
            openCourses: results,
            pagination: {page, total, first, last, prev, next}
        });
    } catch (err) {
        console.log(err);
        next(err);
    }

    // res.render('open-courses', {foo:'bar'})
})

router.get('/bySeq', async(req, res, next) => {
    try {
        const page = +req.query.page || 1;// 获取当前页码，如没有则默认1
        const size = +req.query.size || 1;
        const results = await OpenCourse.findAndCountAll({
            offset: (page - 1) * size,
            limit: size,
            order: [['time', 'DESC']]
        });

        res.render('open-courses', {
            title: '公开课',
            openCourses: results.rows,
            pagination: getPagination(results.count, page, size)
            // pagination: {page, total, first, last, prev, next}
        });
    } catch (error) {
        next (error);
    }
})
function getPagination(count, page, size) {
    const total = Math.ceil(count / size);//总页数
    const first = page != 1;//是否有首页
    const last = page != total;//是否有最后页
    const prev = page > 1;//是否有上一页
    const next = page < total;//是否有下一页
    return {page, total, first, last, prev, next}
}

module.exports = router;