var express = require('express');
var router = express.Router();
const {query} = require('../../models/db');

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
module.exports = router;
