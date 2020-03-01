/**
 * Configures database and exports querying function
 * @module db
 * @requires dotenv
 * @requires pg
 */

require('dotenv').config();
const { Pool } = require('pg');
const { DB_URL, DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

let dbParams = {};
if (DB_URL) {
	dbParams.connectionString = DB_URL;
} else {
	dbParams = {
		host: DB_HOST,
		port: DB_PORT,
		user: DB_USER,
		password: DB_PASS,
		database: DB_NAME
	};
}

const pool = new Pool(dbParams);

module.exports = {
	/**
	 * Method used to query cloud database
	 * @name query
	 * @function
	 * @param {String} text Query string
	 * @param {Array} params Array of parameters to be sanitized before input
	 * @returns {Promise} Pool query promise
	 */
	query: (text, params) => pool.query(text, params)
};
