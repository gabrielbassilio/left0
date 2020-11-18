const Sequelize = require("sequelize");

const connection = new Sequelize('left0','admingaba','gaba21pato',{
    host: 'mysql741.umbler.com',
    dialect: 'mysql'
});

/*
const connection = new Sequelize('left0','root','gabapato21',{
    host: 'localhost',
    dialect: 'mysql'
});
*/

module.exports = connection;