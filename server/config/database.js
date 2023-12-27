// config/database.js

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('chatApp', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
