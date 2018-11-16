const mysql = require('mysql');

const cfg = {
    host: 'localhost',
    user: 'kaike',
    password: '111111',
    database: 'kkb'
}

module.exports = {
    query: function(sql, value) {
        return new Promise( (resolve, reject)=>{
            const conn = mysql.createConnection(cfg);
            conn.connect();
            conn.query(sql,value, (err, results) => {
                if(err) reject(err);
                else resolve(results);
            })
            conn.end();
        })
    }
}