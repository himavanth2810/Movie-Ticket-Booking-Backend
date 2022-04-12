const {Client}= require("pg");

const client = new Client({
    user: process.env.ESQL_USER,
    host: process.env.ESQL_HOST,
    database: process.env.ESQL_DB,
    password: process.env.ESQL_PASSWORD,
    port: 5432,
});


module.exports = client;