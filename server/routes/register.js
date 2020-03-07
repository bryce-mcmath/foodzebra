/** Express router providing login related routes
 * @module server/routes/register
 * @memberof server
 * @requires dotenv
 * @requires express
 * @requires bcryptjs
 * @requires queries
 * @requires routeHelpers
 */

const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { dbError } = require('../utils/routeHelpers');
const { getUserByEmail } = require('../db/queries');
const { addUser } = require('../db/inserts');
require('dotenv').config();
const { SALT: saltRounds } = process.env;

/**
 * Route creating a new user
 * @name post/register
 * @function
 * @param {String} path - Express path
 * @param {Function} middleware - Callback function used as middleware
 */
router.post('/', (req, res) => {
	console.log('register route hit');
	const { name, email, mobile, password } = req.body;
	console.log('name, email, mobile, password: ', name, email, mobile, password);

	getUserByEmail(email)
		.then((user) => {
			if (!user) {
				bcrypt.hash(password, parseInt(saltRounds), function(err, hash) {
					addUser(name, hash, email, 'operator', mobile)
						.then((newUser) => {
							console.log('All good');
							req.session.user_id = newUser.id;
							res.status(200).send('Successfully registered!');
						})
						.catch((err) => {
							console.error(err);
							console.log('Fail here...');
							dbError(res);
						});
				});
			} else {
				res.status(403).send('That email is already taken');
			}
		})
		.catch(() => {
			console.log('Fail here?!');
			dbError(res);
		});
});

module.exports = router;
