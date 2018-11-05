// commonjs
const fs = require('fs')
// const data = fs.readFileSync('./笔记.md')
// console.log(data);


// 异步读取：优点是不会阻塞进程，后续代码继续执行
fs.readFile('./笔记.md', function (err, data) {
    if (err) {
        throw err;
    }
    console.log(data.toString());
})
console.log('其他操作');