// 引入文件系统file system模块commonjs
const fs = require('fs')
// 同步读取文件
const data = fs.readFileSync('./笔记.md')
console.log('同步读取', data.toString());
// 异步读取文件
fs.readFile('./笔记.md', function (err, data) {
    if (err) throw err;
    console.log('异步读取', data.toString());
})
console.log('run！');