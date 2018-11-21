const express = require('express');
const router = express.Router();
const {query} = require('../models/db');

router.get('/', async (req, res, next) => {
    res.redirect('/admin/open-courses')
});
router.get('/open-courses-update/:id', async (req, res, next) => {

    try {
        // console.log( req.params.id);
        const courses = await query(
            'select * from kkb.open_courses where id=?', req.params.id);
        // console.log(courses);
        if (courses.length > 0) {
            const course = courses[0];
            course.time = course.time.toISOString().substr(0,16)
            res.render('admin/open-courses-update', {
                layout: 'layout-admin',
                nav: 'open-courses',
                course: courses[0]
            })
        } else {
            res.render('admin/result', {
                layout: 'layout-admin', // 设置布局页
                message: '查询公开课失败',
            })
        }

    } catch (error) {
        res.render('admin/result', {
            layout: 'layout-admin', // 设置布局页
            message: '查询公开课失败',
        })
    }

})
// http://localhost:3000/admin/open-courses/
router.get('/open-courses', async (req, res, next) => {
    try {
        const courses = await query('select * from kkb.open_courses')
        res.render('admin/open-courses', {
            layout: 'layout-admin', // 设置布局页
            nav: 'open-courses',
            courses
        })
    } catch(error) {
        res.render('admin/result', {
            layout: 'layout-admin',
            message: '查询公开课失败'
        })
    }
    
});

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images')
    },
    filename: function(req, file, cb) {
        let extname = '';
        switch (file.mimetype) {
            case 'image/jpeg': extname = '.jpg';break;
            case 'image/png': extname = '.png';break;
            case 'image/gif': extname = '.gif';break;
        }
        cb(null, Date.now() + extname);
    }
})
const upload = multer({
    //dest: 'public/images',
    storage,
    limits: {fileSize: 2 * 1024 *1024},
    fileFilter: function (req, file, cb){
        if(file.mimetype === 'image/gif' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ){
            cb(null, true)
        }else {
            cb(new Error('请上传图片格式'), false);
        }
    }
})
const {body, validationResult} = require('express-validator/check');
const validations = [
    body('name').not().isEmpty().withMessage('名称必填'),
    body('description').not().isEmpty().withMessage('信息必填'),
    body('time').not().isEmpty().withMessage('信息必填').isAfter(new Date().toString()).withMessage('截止时间'),
]
const mysql = require('mysql');
router.post('/open-courses', 
    [upload.single('file'), ...validations], 
    async (req, res, next) => {

        if(req.file) {
            req.body.poster = req.file.filename;
        }

        //console.log(req.file);
        const errors = validationResult(req).formatWith( ({msg}) => msg);
        console.log(errors);

        if(errors.isEmpty()) {
            // req.body.file = req.file ? req.file.filename : '';
            try{
                let sql, oper;
                if(req.body.id) {
                    const id = req.body.id;
                    delete req.body.id;
                    sql = mysql.format('UPDATE kkb.open_courses SET ? WHERE id=?',[req.body, id]);
                    oper = '更新'
                } else {
                    sql = mysql.format('INSERT INTO kkb.open_courses SET ?', req.body);
                    oper = '新增'
                }
                const result = await query('INSERT INTO kkb.open_courses SET ?', req.body)
                console.log(result);
                const message = result.affectedRows > 0 ? `${oper}成功` : `${oper}失败`;
                res.render('admin/result', {
                    layout: 'layout-admin', // 设置布局页
                    message
                })
            } catch (error){
                res.render('admin/result', {
                    layout: 'layout-admin', // 设置布局页
                    message: 'fail'
                })
            }
        }else {
            res.render('admin/result', {
                layout: 'layout-admin',
                message: '新增失败',
                errors: errors.array()
            })
        }
})

router.get('/vip-courses', async (req, res, next) => {
    res.render('admin/vip-courses', {
        layout: 'layout-admin', // 设置布局页
        nav: 'vip-courses'
    })
});

module.exports = router;