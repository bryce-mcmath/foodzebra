/** Express router providing order related routes
 * @module server/routes/sms
 * @memberof server
 * @requires express
 * @requires twilio
 */

const express = require('express');
const router = express.Router();
const MessagingResponse = require('twilio').twiml.MessagingResponse;

/**
 * Route auto-replying to customers who talk back to SMS
 * @name post/sms
 * @function
 * @param {String} path Express path
 * @param {Function} middleware Callback function used as middleware
 */
router.post('/', (_, res) => {
	const twiml = new MessagingResponse();

	twiml.message('New phone, who dis');

	res.writeHead(200, { 'Content-Type': 'text/xml' });
	res.end(twiml.toString());
});

module.exports = router;
