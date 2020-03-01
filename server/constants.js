/**
 * Constant values used in the backend
 * @module constants
 */

/**
 * Max length of a varchar accepted by Postgres
 * @constant {number} VARCHAR_MAX
 */
const VARCHAR_MAX = 255;

/**
 * Max value of a smallint accepted by Postgres
 * @constant {number} SMALL_INT_MAX
 */
const SMALL_INT_MAX = 32767;

/**
 * Max value of an int accepted by Postgres
 * @constant {number} INT_MAX
 */
const INT_MAX = 2147483647;

module.exports = { VARCHAR_MAX, SMALL_INT_MAX, INT_MAX };
