const Sequelize = require("sequelize");
const connection = require("../database/database");
const Topic = require("../topics/Topic");

const Post = connection.define('posts',{ 
    body:{
        type:Sequelize.TEXT,
        allowNull:false
    },
    up:{
        type: Sequelize.INTEGER,
        allowNull:false
    },
    date:{
        type: Sequelize.DATE,
        allowNull:true
    },
    subtopicId:{
        type: Sequelize.TEXT,
        allowNull:true
    },
    user:{
        type:Sequelize.TEXT,
        allowNull:true
    }
});

//Topic.hasMany(Post);//um topico tem muitos postes

//Post.sync({force:true});

module.exports = Post;