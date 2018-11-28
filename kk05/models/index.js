const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const sequelize = new Sequelize('kkb','kaike', '111111', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {max: 5, acquire: 30000, idle: 10000},
    define: {
        timestamps: false,
        freezeTableName: true
    }
})

// const User = sequelize.define('user', {
//     firstName: {type: Sequelize.STRING(20), notNull: true},
//     lastName: Sequelize.STRING(20),
//     age: Sequelize.INTEGER
// })
// //同步数据库
// User.sync({force: true}).then(() => {
//     return User.create({
//         firstName: 'Tom',
//         lastName: 'Cruise'
//     })
// }).then(() => {
//     User.findAll().then( users => {
//         //console.log(users)
//     })
// })

const db = {Sequelize, sequelize};
fs.readdirSync(__dirname)
    .filter(file => (file != 'index.js' && file != 'db.js'))
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    })

module.exports = db;