const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const forgotPassword = sequelize.define('forgotPassword', {
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
},
{
  timestamps: true
});

module.exports = forgotPassword;

