// module.exports.hl = 6;
// module.exports.rmbToDollar = function (h, rmb) {
//     return rmb/h
// }

// module.exports = {
//     hl: 6,
//     rmbToDollar: function (h, rmb) {
//         console.log(module.exports.hl);
//         return rmb/h
//     }
// }
let hl;
module.exports = function (opts) {
    hl = opts.hl || 6;
    return {
        rmbToDollar: function (rmb) {
            console.log(hl);
            return rmb/hl
        }
    }
}