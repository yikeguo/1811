const {query} = require('../models/db')
let coursesCache = null;

module.exports.initLocals = async function (req, res, next) {
    const isLogin = true;
    // 确定动态导航栏名字
    res.locals.navName = isLogin ? 'nav' : 'nav-unauth';

    if(coursesCache) {
        res.locals.courses = coursesCache;
        next();
    }else {
        const sql = 'SELECT * FROM kkb.vip_course';

        try{
            const courses = await query(sql);
            courses.forEach(course => 
                course.cooperation = course.cooperation.split(','));
                console.log(courses);
            //res.locals.courses = coursess;

            coursesCache = res.locals.courses = courses;
            next();
        } catch(err) {
            next(err)
        }
    
    }
    
    // 将vip菜单数据存放至res.locals中
    // res.locals.courses = [
    //     {
    //         url: '/vip-course/web',
    //         icon: 'https://img.kaikeba.com/web_menu.png',
    //         name: 'WEB全栈架构师',
    //         desc: '授课深度对标百度，。。。。。。。。。。。。',
    //         cooperation:[
    //             'https://img.kaikeba.com/baidu.png',
    //             'https://img.kaikeba.com/toutiao.png'
    //         ],
    //         poster: 'https://img.kaikeba.com/web_vip.png'
    //     },
    //     {
    //         url: '/vip-course/python',
    //         icon: 'https://img.kaikeba.com/web_menu.png',
    //         name: 'python爬虫',
    //         desc: '授课深度对标百度，。。。。。。。。。。。。',
    //         cooperation:[
    //             'https://img.kaikeba.com/baidu.png',
    //             'https://img.kaikeba.com/toutiao.png'
    //         ],
    //         poster: 'https://img.kaikeba.com/web_vip.png'
    //     },
    // ];
    // next();// 进入后续中间件
}