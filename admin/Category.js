const Sequelize = require('sequelize');
const connection = require('../database/database');

const Category = connection.define('Categories',{

    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    slug:{
        type:Sequelize.STRING,
        allowNull:false
    },
    body:{
        type:Sequelize.STRING,
        allowNull:false
    },
    subs:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

//Category.sync({force:true});

module.exports = Category;