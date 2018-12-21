var express = require('express');
var router = express.Router();
const {query} = require('../../models/db');
const {requireUser} = require('../../middleware')

router.post('/login', async(req, res) => {
    const {phone, password, autoLogin} = req.body;
    try {
        const sql = 'SELECT * FROM kkb.user WHERE phone=? AND password=?';
        const results = await query(sql, [phone, md5(password + salt)]);
        console.log(results);
        if(results.length > 0) {
            const user = results[0];
            delete user.password;

            if (autoLogin) {
                req.session.cookie.maxAge = 7*24*3600*1000;
            }
            req.session.user = user;
            res.json({success: true, data: user})
        } else {
            res.json({success: false, message: '电话或密码错误'})
        }
    }catch (error) {
        res.json({success: false, message: 'service fail'})
    }
})

router.post('/verify-phone', async(req, res) => {
    try{
        const sql = "SELECT * FROM kkb.user WHERE phone=?";
        const results = await query(sql, req.body.phone);
        if(results.length > 0){
            res.json({success: false, message: '电话已存在'})
        }else {
            res.json({success: true, message: ''})
        }

    } catch (error) {
        console.log(error);
        res.json({success: true, message: '服务错误'})
    }
})

router.post('/ver-code-img', (req, res) => {
    const success = req.session.codeImg === req.body.code;
    res.json({success});
})

//codeImg
const captcha = require('trek-captcha')
router.get('/code-img', async(req, res) => {
    try {
        const {token, buffer} = await captcha({size: 4});
        req.session.codeImg = token;

        console.log(token);
        res.json({
            success: true,
            data: buffer.toString('base64')
        })
    }catch (error) {
        console.log(error);
    }
})

const md5 = require('md5');
const salt = 'take a little salt';
router.post('/register', async(req, res) => { 
    const sql = 'INSERT INTO kkb.user SET ?';
    try {
        req.body.password = md5(req.body.password + salt);
        req.body.username = '学员' + Date.now();
        const result = await query(sql, req.body)
        if(result.affectedRows > 0 ) {
            req.body.id = result.insertId;
            delete req.body.password;
            req.session.user = req.body;
            res.json({success: true, data: req.body});
        }else {
            res.json({success: true, message: '注册失败'});
        }
    }catch(error) {
        res.json({success: true, message: '服务器错误'});
    }
})

router.post('/is-login', (req, res) => { 
    if(req.session.user) {
        res.json({success: true, data: req.session.user})
    }else{
        res.json({success: false, message: '用户未登录'})
    }
});
router.post('/logout', (req, res) => { 
    req.session.destroy( (err) => {
        if (err) {
            res.json({success: false, message: '注销失败'})
        } else {
            res.json({success: true})
        }
    })
});

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images/')
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
    limits: {fileSize: 1 * 1024 *1024},
    fileFilter: function (req, file, cb){
        if(file.mimetype === 'image/gif' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ){
            cb(null, true)
        }else {
            cb(new Error('请上传图片格式'), false);
        }
    }
});
router.post('/uploadAvatar', [requireUser, upload.single('file')],
    async (req, res) => {
        if (!req.file) {
            res.sendStatus(500);
        }else {
            try {
                req.session.user.avatar = req.file.filename;

                const result = await query(`UPDATE user SET avatar=? WHERE id=?`,
                    [req.file.filename, req.session.user.id]);
                
                console.log(result);
                if (result.affectedRows > 0) {
                    res.json({success: true, data: req.file.filename})
                }
            } catch (error) {

            }
        }
    }
)

router.get('/my-courses', requireUser, async (req, res) => {
    try {
        const sql = `select c.id,c.name,c.phase,vc.poster from user_clazz uc
                        left join clazz c on uc.clazz_id = c.id
                        left join vip_course vc on c.course_id = vc.id
                        where user_id=?`
        const data = await query(sql, req.session.user.id);
        res.json({success: true, data})
    } catch (error) {

    }
})

// 概况
router.get('/pandect/:classId', requireUser, async (req, res) => {
    try {
        const sql = `select * from pandect where user_id=? and clazz_id=?`
        const data = await query(sql, [req.session.user.id, req.params.classId]);
        if (data.length > 0)
            res.json({success: true, data: data[0]});
        else
            res.json({success: false});
    } catch (error) {

    }
})

router.get('/stages/:classId', requireUser, async (req, res) => {
    try {
        const sql = `SELECT st.id,st.name,st.title,st.sub_title,s.state,s.videos
                         FROM status s
                        left join stage st on st.id=s.stage_id
                        left join clazz c on st.clazz_id=c.id
                        where user_id=? and clazz_id=?;`
        const data = await query(sql, [req.session.user.id, req.params.classId]);
        if (data.length > 0)
            res.json({success: true, data});
        else
            res.json({success: false});
    } catch (error) {

    }
})
module.exports = router;
