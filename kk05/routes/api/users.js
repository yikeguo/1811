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

module.exports = router;
