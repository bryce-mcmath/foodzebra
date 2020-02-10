require("dotenv").config();
const { Pool } = require("pg");

let dbParams = {};
if (process.env.DB_URL) {
  dbParams.connectionString = process.env.DB_URL;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };
}

const pool = new Pool(dbParams);

module.exports = {
  query: (text, params) => pool.query(text, params)
};
