const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const chatHistory = sequelize.define('chatHistory', {
    id: {
        type: Sequelize.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    message: {
        type: Sequelize.TEXT(),
        allowNull: false
    },
    isMedia:{
        type : Sequelize.BOOLEAN , 
      defaultValue : false
    },
    date_time: {
        type: Sequelize.DATE, 
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), 
      },
},
    {
        timestamps: true
    });
module.exports = chatHistory;