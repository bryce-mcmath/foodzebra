/**
 * Functions used to interact with Twilio
 * @module twilioAPI
 * @requires dotenv
 * @requires twilio
 * @requires mobileFormatter
 */

require('dotenv').config();
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const mobileFormatter = require('../utils/mobileFormatter');

module.exports = {
	/**
	 * Handle sending SMS using Twilio API
	 * @name sendSMS
	 * @function
	 * @param {String|Number} toNumber Mobile number to send SMS to
	 * @param {String} message Message to be sent
	 * @param {Function} callback Callback function to be passed in and handle response
	 */
	sendSMS: (toNumber, message, callback) => {
		const cleanNum = mobileFormatter(toNumber);
		if (cleanNum && typeof message === 'string') {
			client.messages
				.create({
					body: message,
					from: '+12362371332',
					to: `${cleanNum}`
				})
				.then((msg) => {
					callback({ data: msg });
				})
				.catch((err) => {
					callback({ error: err });
				});
		} else {
			callback({ error: 'Invalid mobile number or message' });
		}
	}
};
