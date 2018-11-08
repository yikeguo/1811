// 1.导入http模块
const http = require('http')
// 2.引入文件系统file system模块commonjs
const fs = require('fs')
// 3.引入qs模块：解析querystring参数
const qs = require('querystring')


// users数组
const users = [{name: 'tom', age: 20}, {name: 'jerry', age: 20}];


const server = http.createServer((req, res) => {
    // 该回调函数在每次收到请求时调用
    // req指请求对象
    // res指响应对象
    // 使用res.writeHead()设置响应头
    const url = req.url;
    const method = req.method;
    if (url === '/' && method === 'GET') {
        // 异步读取首页文件
        fs.readFile('./index.html', (err, data) => {
            if (err) {
                // 错误处理
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                })
                // 返回页面数据
                res.end('500, Server Internal Error!')
                return;
            }
            // 设置响应头
            // Content-Type常见值：'text/html'，'application/json'
            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
            // 返回页面数据
            res.end(data)
        })
    } else if (url === '/api/users' && method === 'GET') {
        // 编写接口，返回json数据
        res.writeHead(200, {
            'Content-Type': 'application/json'
        });
        // 返回页面数据
        res.end(JSON.stringify(users))
    } else if (url === '/api/users' && method === 'POST') {
        // 接收请求参数
        let body = [];
        req.on('data', (chunk) => {
            // 接收到一部分数据
            console.log(chunk);//chunk是Buffer对象
            body.push(chunk);
        }).on('end', () => {
            // 数据接收完毕
            // 将body转换为完整的buffer
            body = Buffer.concat(body).toString();
            // 转换并保存前台传递的user
            const user = qs.parse(body);//{name:'aaa',age:20}
            // 添加到users中
            users.push(user);
            res.writeHead(200, {
                'Content-Type': 'text/html'
            })
            // 返回页面数据
            res.end('<h3>新增成功!</h3>');
        })
    } else {
        // 404
        fs.readFile('./404.html', (err, data) => {
            //返回该页面
        })
    }

});

// 监听指定端口
server.listen(3000);