const express = require('express');
const router = express.Router();
const {query, getConnection, query2, commit, rollback, beginTransaction} = require('../models/db');

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

router.get('/stage', async (req, res, next) => {
    const clazzes = await query('select * from clazz');
    res.render('admin/stage', {layout: 'layout-admin', clazzes, nav: 'stage'})
});	


router.post('/stage', async (req, res, next) => {
    let conn;
    try {
        // 1. 获取连接
        conn = await getConnection();
        // 2. 开启事务
        beginTransaction(conn);
        // 3. 开启操作
        // 3.1 插入学习阶段
        const result = await query2(conn, 'INSERT INTO stage SET ?', req.body);
        if (result.affectedRows > 0) {
            // 根据班级id获取该班所有学员id
            const stageId = result.insertId;
            const ids = await query2(conn, 'SELECT user_id FROM user_clazz WHERE clazz_id=?', req.body.clazz_id);
            console.log(stageId, ids);
            // 3.2 为每位学员添加学习状态
            for (let o of ids) {
                await query2(conn, 'INSERT INTO status SET ?',
                    {user_id: o.user_id, stage_id: stageId})
            }
            // 4.提交事务
            await commit(conn);
            res.render('admin/result', {layout: 'layout-admin', message: '插入成功'})
        } else {
            res.render('admin/result', {layout: 'layout-admin', message: '插入阶段失败'})
        }
    } catch (error) {
        console.log(error);
        // 有错误发生，回滚
        await rollback(conn);
        res.render('admin/result', {layout: 'layout-admin', message: '服务器内部错误'})
    }
});

// 视频管理
router.get('/video', async (req, res, next) => {
    const clazzes = await query('select * from clazz');
    res.render('admin/video', {layout: 'layout-admin', clazzes, nav: 'video'})
})

router.get('/get-stage', async (req, res, next) => {
    const stages = await query('select * from stage where clazz_id=?', req.query.clazzId);
    res.json({success: true, data: stages});
})

const qs = require('qs'); // 使用qs才能解析req.body中的嵌套数据
router.post('/video', async (req, res, next) => {
    const body = qs.parse(req.body);
    try {
        for (let video of body.video) {
            video.stage_id = body.stage_id;
            await query('INSERT INTO video SET ?', video)
        }
        // 更新状态表中videos字段：
        await query('UPDATE status SET videos=? WHERE stage_id=?',
            [body.video.length.toString(), body.stage_id]);
        res.render('admin/result', {
            layout: 'layout-admin', nav: 'video', message: '新增成功'})
    } catch (error) {
        res.render('admin/result', {
            layout: 'layout-admin', nav: 'video', message: '新增失败'})
    }
})

module.exports = router;