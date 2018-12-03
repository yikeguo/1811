var express = require('express');
var router = express.Router();
const {query} = require('../../models/db');

router.post('/login', async(req, res) => {
    const {phone, password} = req.body;
    try {
        const sql = 'SELECT * FROM kkb.user WHERE phone=? AND password=?';
        const results = await query(sql, [phone, password]);
        console.log(results);
        if(results.length > 0) {
            const user = results[0];
            delete user.password;

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

module.exports = router;
