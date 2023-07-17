require("dotenv").config();
const knex = require('knex')({
    client: 'mysql',
    connection: {
        host : process.env.HOST,
        port : 3306,
        user : process.env.USERDB,
        password : '',
        database : process.env.DBNAME
    }
});
module.exports = { knex }