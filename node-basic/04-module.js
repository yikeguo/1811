// 导入自定义模块，使用相对路径
// const currency = require('./currency');
// const rmbToDollar = require('./currency');
// 对象解构
const {rmbToDollar, dollarToRmb} = require('./currency');

// 引入第三方模块
const _ = require('underscore');


// 使用模块方法
console.log(rmbToDollar(6));
console.log(dollarToRmb(1));
// console.log(rmbToDollar(6));

const users = [
    {name:'tom',age:20},
    {name:'tom',age:19},
];
const user = _.max(users, user => user.age);
// 下面代码等同于上面一行
// const user = _.max(users, function (user) {
//     return user.age;
// });
console.log(user);
    
    
    
    
    
    
    
    
    
    