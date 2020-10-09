const Sequelize = require('sequelize');
const connection = require('../database/database');

const Adms = connection.define('adms',{
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    patents:{
        type:Sequelize.STRING,
        allowNull:false
    },
    check:{
        type:Sequelize.STRING,
        allowNull:true
    }
});

//Adms.sync({force:true});

module.exports = Adms;