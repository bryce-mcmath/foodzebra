/**
 * Mobile number formatting
 * @module mobileFormatter
 */

/**
 * Applies validation and regex to phone number, returns usable number
 * if possible, otherwise returns an empty string
 * @name mobileFormatter
 * @function
 * @param {(Number|String)} number Phone number
 */
const mobileFormatter = (number) => {
	if (typeof number !== 'string' && typeof number !== 'number') return '';
	number = typeof number === 'string' ? number.trim() : number;
	number = typeof number === 'number' ? number.toString() : number;
	return number.replace(/\D+/g, '');
};

module.exports = mobileFormatter;
