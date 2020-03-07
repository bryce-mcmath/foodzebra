/** Express router providing login related routes
 * @module server/routes/login
 * @memberof server
 * @requires express
 * @requires bcryptjs
 * @requires queries
 * @requires routeHelpers
 */

const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { getUserByEmail, getUserById } = require('../db/queries');
const { invalidCredentials } = require('../utils/routeHelpers');

/**
 * Route verifying login credentials
 * @name get/login
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
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
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
router.post('/', (req, res) => {
	const { email, password } = req.body;
	getUserByEmail(email)
		.then((user) => {
			if (user) {
				const { password: hash, id } = user;
				bcrypt.compare(password, hash, (err, result) => {
					if (!err && result) {
						console.log('All good');
						req.session.user_id = id;
						res.status(200).send('Successfully logged in!');
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
