/** Express router providing logout related routes
 * @module server/routes/logout
 * @memberof server
 * @requires express
 */

const express = require('express');
const router = express.Router();

/**
 * Route removing login credentials
 * @name delete/logout
 * @function
 * @param {String} path Express path
 * @param {Function} middleware Callback function used as middleware
 */
router.delete('/', (req, res) => {
	console.log('logout route hit');
	req.session = null;
	res.status(200).send('Successfully logged out!');
});

module.exports = router;
