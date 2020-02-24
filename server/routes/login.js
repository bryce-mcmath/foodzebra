const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { getUserByEmail, getUserById } = require('../db/queries');

const { invalidCredentials } = require('../utils/routeHelpers');

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

router.post('/', (req, res) => {
	const { email, password } = req.body;

	getUserByEmail(email)
		.then((user) => {
			if (user) {
				const { password: hash, id } = user;
				bcrypt.compare(password, hash, (err, result) => {
					if (!err && result) {
						req.session.user_id = id;
						res.send({ status: 200 });
					} else {
						invalidCredentials(res);
					}
				});
			}
		})
		.catch((err) => {
			invalidCredentials(res);
		});
});

module.exports = router;
