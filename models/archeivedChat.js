const Sequelize = require('sequelize');
const sequelize = require('../util/database');
const {
  Model
} = require('sequelize');
const archivedChat = sequelize.define('archivedChat',{
    id: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    message: {
      type: Sequelize.TEXT,
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
    UserId:{
      type: Sequelize.BIGINT,
    },
    GroupId:{
      type: Sequelize.BIGINT,
    }
  },
  {
    timestamps: true
  }
);

module.exports = archivedChat;
