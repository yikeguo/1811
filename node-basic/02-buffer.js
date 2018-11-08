// Buffer创建不需要引入模块，全局模块Buffer
// 创建Buffer
const buf1 = Buffer.alloc(10, 100);
console.log(buf1);

// 通过现有数据创建
const buf2 = Buffer.from([1, 2, 3])
console.log(buf2);

// 使用字符串创建
const buf3 = Buffer.from('hello node.js中文')
console.log(buf3);
console.log(buf3.toString());