const Sequelize = require('sequelize');
const sequelize = require('./index');

// 数据表跟对象的映射
const User = sequelize.define('user', {
    // 将js中的对象映射成数据表中的字段
    id: { type: Sequelize.INTEGER,
    autoIncrement: true, primaryKey: true, unique: true},
    username: {type: Sequelize.STRING},
    age: {type: Sequelize.INTEGER },
    address: { type: Sequelize.STRING },
    isdelete: { type: Sequelize.INTEGER },
    allowNull: true
});

module.exports = User;