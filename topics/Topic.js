const Sequelize = require("sequelize");
const connection = require("../database/database");
const Category = require("../admin/Category");

const Topic = connection.define('topics',{
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    subtitle:{
        type:Sequelize.STRING,
        allowNull:false
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false
    },
    midia:{
        type:Sequelize.STRING,
        allowNull:false
    },
    videoUrl:{
        type:Sequelize.STRING,
        allowNull:true
    },
    imagem:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    video:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    body:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    slug:{
        type:Sequelize.STRING,
        allowNull:false
    },
    subtitleId:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    by:{
        type:Sequelize.TEXT,
        allowNull:false
    }
});

//Category.hasMany(Topic);//uma categoria tem muitos topicos
//Topic.belongsTo(Category);//um topico pertence a uma categoria


//Topic.sync({force:true});

module.exports = Topic;