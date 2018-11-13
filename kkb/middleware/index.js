module.exports.initLocals = function (req, res, next) {
    res.locals.courses = [
        {
            url: '/vip-course/web',
            icon: '',
            name: 'WEB全站架构师',
            desc: ''
        },
        {
            url: '/vip-course/python',
            icon: '',
            name: 'python爬虫',
            desc: ''
        }
    ];
    next();
}