const {Client} = require("pg");
require("dotenv").config();

const client = new Client({
    user: process.env.PG_USER,
    host: process.env.PGHOST,
    database:process.env.PGDATABASE,
    password:process.env.PGPASSWORD,
    port:process.env.PGPORT,    
    connectionTimeoutMillis:0
});     

client.connect();

module.exports = client;  