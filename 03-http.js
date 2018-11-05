//1.引入http、fs模块
const http = require('http')
const fs = require('fs')
const qs = require('querystring') //解析post过来的urlencoded数据
//2.创建server
//构造数据
const users = [
    {name: 'tom', age: '20'},
    {name: 'jerry', age: '20'},
];
const server = http.createServer(function (request, response) {
    //获取用户请求的url和请求方法
    // const url = request.url;
    // const method = request.method;
    // const headers = request.headers;
    const {url, method, headers} = request; //ES6结构语法，等同于以上三行代码

    //响应一个get请求，返回内容是html
    if (url === '/' && method === 'GET') {
        //获取首页
        fs.readFile('./index.html', function (err, data) {
            if (err) {
                throw err;
            }
            // console.log(data.toString());
            //设置响应头为html
            response.setHeader('Content-Type', 'text/html')
            //给前台返回数据
            response.end(data)
        })
    } else if (url === '/users' && method === 'GET') {
        //设置响应头为json
        response.setHeader('Content-Type', 'application/json')
        //给前台返回json数据
        response.end(JSON.stringify(users))
    } else if (url === '/users' && method === 'POST') {
        let body = [];//数据数组
        //监听数据接收事件
        request.on('data', (chunk) => {//不断传递数据时响应
            body.push(chunk);
        }).on('end', () => {//数据传递结束
            //解析数据：将多个Buffer实例拼接为一个完整的
            body = Buffer.concat(body).toString();
            const user = qs.parse(body);
            users.push(user);
            //设置响应头为json
            response.setHeader('Content-Type', 'text/plain')
            //给前台返回json数据
            response.end('ok')
        })
    } else if (method === 'GET' && headers.accept.indexOf('image/*')) {
        //用户希望获得图片 /img.jpg
        fs.createReadStream('.' + url).pipe(response);
    }

})
//3.监听端口
server.listen(8080)
