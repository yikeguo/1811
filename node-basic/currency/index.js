// 汇率计算模块
// 模块化规范commonjs
// 1.完成功能
function rmbToDollar(rmb) {
    return rmb / 6;
}

function dollarToRmb(dollar) {
    return dollar * 6;
}

// 2.导出
// module.exports.rmbToDollar = rmbToDollar;
// module可省略
// exports.dollarToRmb = dollarToRmb;


// 覆盖导出对象，这是module不能省略
// module.exports = rmbToDollar;

module.exports = {
    rmbToDollar, dollarToRmb
}