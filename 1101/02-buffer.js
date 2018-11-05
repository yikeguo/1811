//创建一个buffer
const buf1 = Buffer.alloc(10, 1);
console.log(buf1);

//创建一个buffer包括[1,2,3]
const buf2 = Buffer.from([1,2,3]);
console.log(buf2);
const buf3 = Buffer.from('Buffer创建方法');
console.log(buf3);

// Buffer字符编码
const buf4 = Buffer.from('hello world');
console.log(buf4.toString('base64'));