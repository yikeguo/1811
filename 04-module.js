//1.导入自定义模块文件
// const {rmbToDollar, hl} = require('./currency');
// console.log('当前汇率：' + hl);
// console.log(rmbToDollar(6.5, 60));

// 2.导入文件夹中index.js
const {rmbToDollar, hl} = require('./currency2')({hl:7});
console.log(rmbToDollar(60));

// 3.使用第三方模块
const _ = require('underscore');
const users = [
    {name:'tom',age:19},
    {name:'jerry',age:20},
]
console.log(_.max(users, (user) => user.age));