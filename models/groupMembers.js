const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const groupMember = sequelize.define('groupMembers',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey:true
    }},
    {
        timestamps: true
    });

module.exports=groupMember;