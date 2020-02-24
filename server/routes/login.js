/** Express router providing login related routes
 * @module server/routers/login
 * @requires express
 */

// Imports
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { getUserByEmail, getUserById } = require('../db/queries');
const { invalidCredentials } = require('../utils/routeHelpers');

/**
 * Route verifying login credentials
 * @name get/login
 * @function
 * @memberof server/routes/login
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/', (req, res) => {
	if (req.session.user_id) {
		getUserById(req.session.user_id)
			.then((user) => {
				user.role === 'operator' ? res.send('operator') : res.send('customer');
			})
			.catch((err) => {
				res.send('customer');
			});
	}
});

/**
 * Route verifying login credentials
 * @name post/login
 * @function
 * @memberof server/routes/login
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/', (req, res) => {
	const { email, password } = req.body;

	getUserByEmail(email)
		.then((user) => {
			if (user) {
				const { password: hash, id } = user;
				bcrypt.compare(password, hash, (err, result) => {
					if (!err && result) {
						req.session.user_id = id;
						res.status(200);
					} else {
						invalidCredentials(res);
					}
				});
			} else {
				invalidCredentials(res);
			}
		})
		.catch(() => {
			invalidCredentials(res);
		});
});

module.exports = router;
