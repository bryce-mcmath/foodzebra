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
	req.session = null;
	res.redirect('/');
});

module.exports = router;
