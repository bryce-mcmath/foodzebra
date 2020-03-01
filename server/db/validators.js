/**
 * Collection of validator functions to be used in inserts and queries
 * @module validators
 * @requires constants
 */

const { VARCHAR_MAX, SMALL_INT_MAX, INT_MAX } = require('../constants');

/**
 * Checks if input is valid VARCHAR 255 for postgres
 * @function
 * @param inputString
 * @returns {Boolean}
 */
const isValidVarChar = (inputString) =>
	typeof inputString === 'string' && inputString.length <= VARCHAR_MAX;

/**
 * Checks if input is valid integer for postgres
 * @function
 * @param inputNum
 * @returns {Boolean}
 */
const isValidInt = (inputNum) =>
	!isNaN(inputNum) && Math.abs(inputNum) <= INT_MAX;

/**
 * Checks if input is valid small integer for postgres
 * @function
 * @param inputNum
 * @returns {Boolean}
 */
const isValidSmallInt = (inputNum) =>
	!isNaN(inputNum) && Math.abs(inputNum) <= SMALL_INT_MAX;

module.exports = { isValidVarChar, isValidInt, isValidSmallInt };
