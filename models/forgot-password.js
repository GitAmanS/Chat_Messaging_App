const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const ForgotPassword = sequelize.define('ForgotPassword', {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: Sequelize.UUIDV4, 
  },
  isActive: {
    type: Sequelize.BOOLEAN, 
    allowNull: false,
    defaultValue: true, 
  },
});

module.exports = ForgotPassword;

