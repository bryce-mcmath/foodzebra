/**
 * Various helper functions used in routes
 * @module routeHelpers
 */

/**
 * Sends 401 response and informative message when a user
 * tries to access something without proper credentials
 * @name invalidCredentials
 * @function
 * @param {Object} res Express response object
 */
const invalidCredentials = (res) =>
	res.status(401).send('Wrong username or password');

/**
 * Sends 401 response and informative message when a user
 * needs to be an operator but is not
 * @name notOperator
 * @function
 * @param {Object} res Express response object
 */
const notOperator = (res) =>
	res.status(401).send('You are not signed in as an operator');

/**
 * Sends 500 response and informative message that there was
 * an error updating the database
 * @name dbError
 * @function
 * @param {Object} res Express response object
 */
const dbError = (res) => res.status(500).send('Error updating database');

/**
 * Sends 500 response and informative message that there was an
 * error sending SMS
 * @name twilioError
 * @function
 * @param {Object} res Express response object
 */
const twilioError = (res) => res.status(500).send('Error sending SMS');

module.exports = { invalidCredentials, notOperator, dbError, twilioError };
