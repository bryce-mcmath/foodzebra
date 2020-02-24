/**
 * @constant {Number} VARCHAR_MAX - max length of a varchar accepted by Postgres
 */
const VARCHAR_MAX = 255;

/**
 * @constant {Number} SMALL_INT_MAX - max value of a smallint accepted by Postgres
 */
const SMALL_INT_MAX = 32767;

/**
 * @constant {Number} INT_MAX - max value of an int accepted by Postgres
 */
const INT_MAX = 2147483647;

module.exports = { VARCHAR_MAX, SMALL_INT_MAX, INT_MAX };
