const mysql = require('mysql');

const cfg = {
    host: 'localhost',
    user: 'kaike',
    password: '111111',
    database: 'kkb'
}

// const conn = mysql.createConnection(cfg);
// conn.connect( (err) => {
//     if(err) throw new Error('链接错误');
//     console.log('连接成功');
// } );

const pool = mysql.createPool(cfg);
module.exports = {
    query: function(sql, value) {
        return new Promise( (resolve, reject) => {
            // pool.getConnection( (err, conn) => {
                
            //     conn.release();
            // })
            pool.query(sql,value, (err, results) => {
                if(err) reject(err);
                else resolve(results);
            });
        })
    },
    pool
}