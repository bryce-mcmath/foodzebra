/** Express router providing logout related routes
 * @module server/routers/logout
 * @requires express
 */

// Imports
const express = require('express');
const router = express.Router();

// !ATTN: REMOVE THIS ROUTE AFTER TESTING
router.get('/', (req, res) => {
	req.session = null;
	res.redirect('/');
});

/**
 * Route removing login credentials
 * @name delete/logout
 * @function
 * @memberof server/routes/logout
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.delete('/', (req, res) => {
	req.session = null;
	res.redirect('/');
});

module.exports = router;
