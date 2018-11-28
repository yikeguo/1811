var express = require('express');
var router = express.Router();

const users = [
    {name: 'tom', age: 20}
]
/* GET users listing. */
// /users/
router.get('/', function (req, res, next) {
    res.json(users);
});

router.post('/', function (req, res, next) {
//    传参方式3：body
    //console.log(req.body);

    try {
        users.push(req.body);
        // res.send('服务器接收到你传递数据了！')
        res.json({success: true, users})
    }catch(error){
        res.json({success: false, users})
    }
})

router.put('/', (req, res) => {
    
    try {
        const index = users.findIndex(u => u.name == req.body.name)
        users[index] = req.body;
        res.json({success: true, users})
    }catch(error){
        res.json({success: false, users})
    }
})

router.delete('/:name', (req, res) => {
    
    try {
        const index = users.findIndex(u => u.name == req.params.name)
        if (index != -1) {
            users.splice(index, 1)
            res.json({success: true, users})
        }else {
            res.json({success: false, users})
        }
    }catch(error){
        res.json({success: false, users})
    }
})

router.get('/jsonp', (req, res) => {
    // 参数通过查询参或者url参数获取
    // console.log(req.query);
    res.jsonp(users);
})
router.get('/cors', (req, res) => {
    //res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.json(users);
})
router.post('/cors', (req, res) => {
    users.push(req.body);
    //res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.json(users);
})

router.put('/cors', (req, res) => {
    // 添加响应头Access-Control-Allow-Origin
    // res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    // res.set('Access-Control-Allow-Credentials', 'true');
    const index = users.findIndex(u => u.name == req.body.name)
    if (index != -1) {
        users[index] = req.body;
    }
    res.json(users);
})
module.exports = router;
