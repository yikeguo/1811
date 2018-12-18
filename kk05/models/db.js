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
    pool,
    query2: function (conn, sql, value) {
        return new Promise((resolve, reject) => {
            conn.query(sql, value, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            })
        });
    },
    getConnection: function () {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, conn) => {
                if (err) reject(err);
                else resolve(conn);
            })
        })
    },
    beginTransaction: function (conn) {
        return new Promise((resolve, reject) => {
            conn.beginTransaction(err => {
                if (err) reject(err);
                else resolve();
            });
        })
    },
    rollback: function (conn) {
        return new Promise((resolve, reject) => {
            conn.rollback(resolve);
            conn.end();
        });
    },
    commit: function (conn) {
        return new Promise((resolve, reject) => {
            conn.commit(err => {
                if (err) reject(err);
                else resolve();
            });
            conn.end();
        });
    }
}