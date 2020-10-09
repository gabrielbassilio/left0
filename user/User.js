const Sequelize = require("sequelize");
const connection = require("../database/database");

const User = connection.define('users',{
   name:{
       type: Sequelize.STRING,
       allowNull:false
   },
   last:{
        type: Sequelize.STRING,
        allowNull:false
   },
   userName:{
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
   date:{
        type:Sequelize.STRING,
        allowNull:false
   },
   profileImg:{
       type:Sequelize.STRING,
       allowNull:true
   },
   genre:{
        type:Sequelize.STRING,
        allowNull:false
   },
   mode:{
        type:Sequelize.STRING,
        allowNull:false
   },
   verify:{
     type:Sequelize.STRING,
     allowNull:false
   },
   terms:{
        type: Sequelize.STRING,
        allowNull:false
   }
   
});

//User.sync({force:true});

module.exports = User;