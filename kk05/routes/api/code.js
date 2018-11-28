var express = require('express');
var router = express.Router();

const moment = require('moment');
const md5 = require('md5');
const axios = require('axios');
const qs = require('querystring');
const {query} = require('../../models/db')

router.get('/:phone', async(req, res) => {
    const code = ran() + ran() + ran() + ran() + ran() + ran();
    console.log(code);

    const url = "https://api.miaodiyun.com/20150822/industrySMS/sendSMS";
    const to = req.params.phone;
    const accountSid = 'def7c193baa64bcc8be7744f545973b2';
    const authToken = '94984a845f0e47be85c75eb590705df9';
    const templateid = '951997080';
    const param = `${code},1`;
    const now = moment();
    const timestamp = now.format('YYYYMMDDHHmmss');
    const sig = md5(accountSid + authToken + timestamp);

    try {
        const resp = await axios.post(url, 
            qs.stringify({to,accountSid, templateid, param, timestamp, sig}),
            {headers:{'Content-Type': 'application/x-www-form-urlencoded'}}
        );

        console.log(resp.data);
        if(resp.data.respCode === '00000') {
            const expires = moment().add(1, 'minutes').toDate();
            const result = await query(
                'INSERT INTO kkb.verify_code SET ?',
                {phone: to, code ,expires}
            );
            if( result.affectedRows > 0) {
                res.json({success: true, code});
            }else {
                res.json({success: false, message: 'failed'})
            }
        }else {
            res.json({success: false, message: 'failed'})
        }
    } catch(error) {
        console.log(error);
        res.json({success: false, message: 'failed'})
    }

});

function ran() {
    return Math.floor(Math.random()*10).toString();
}

router.post('/', async (req, res) => {
    try {
        const sql = 'SELECT * FROM kkb.verify_code WHERE phone=? AND code=?';
        const {phone, code} = req.body;
        const results = await query(sql ,[phone, code]);
        if(results.length > 0) {
            const {expires} = results[0];
            if (expires - new Date() > 0) {
                res.json({success: true});
            }else {
                res.json({success: false, message: '验证码失效'})
            }
        }else {
            res.json({success: false, message: '手机号或验证码错误'});
        }

    } catch(error) {
        res.json({success: false, message: '服务响应超时'});
    }
})

module.exports = router;