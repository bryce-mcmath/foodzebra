/** Express router providing menu related routes
 * @module server/routes/menu
 * @memberof server
 * @requires express
 * @requires queries
 * @requires inserts
 * @requires routeHelpers
 */

const express = require('express');
const router = express.Router();
const {
	getAllMenuItem,
	getMenuItemById,
	getUserById
} = require('../db/queries.js');
const {
	addMenuItem,
	updateMenuItem,
	deleteMenuItem
} = require('../db/inserts.js');
const { dbError, notOperator } = require('../utils/routeHelpers');

/**
 * Route fetching all menu items
 * @name get/menu
 * @function
 * @param {String} path Express path
 * @param {Function} middleware Callback function used as middleware
 * @returns {JSON} All menu items
 */
router.get('/', (_, res) => {
	getAllMenuItem()
		.then((menu) => {
			return menu ? res.send(menu) : new Error('No rows in menu items');
		})
		.catch(() => dbError(res));
});

/**
 * Route verifying user and adding menu item to database
 * @name post/menu
 * @function
 * @param {String} path Express path
 * @param {Function} middleware Callback function used as middleware
 * @returns {JSON} Newly created item
 */
router.post('/', (req, res) => {
	getUserById(req.session.user_id)
		.then((user) => {
			if (user.role === 'operator') {
				const { name, desc, price, img_url, category } = req.body;
				if (name && price && typeof price === 'number') {
					addMenuItem(name, price, desc, img_url, category)
						.then((item) => res.status(200).json(item))
						.catch(() => or(res));
				} else {
					res.status(400).send('Name and valid price required');
				}
			} else {
				notOperator(res);
			}
		})
		.catch(() => notOperator(res));
});

/**
 * Route getting specific menu item database
 * @name get/menu/:id
 * @function
 * @param {String} path Express path
 * @param {Function} middleware Callback function used as middleware
 * @returns {JSON} Menu item associated with id
 */
router.get('/:id', (req, res) => {
	const id = req.params.id;

	getMenuItemById(id)
		.then((item) => (item ? res.json(item) : res.redirect('/')))
		.catch(() => dbError(res));
});

/**
 * Route verifying user and updating menu item in database
 * @name put/menu/:id
 * @function
 * @param {String} path Express path
 * @param {Function} middleware Callback function used as middleware
 * @returns {JSON} Updated menu item associated with id
 */
router.put('/:id', (req, res) => {
	getUserById(req.session.user_id)
		.then((user) => {
			if (user.role === 'operator') {
				const { name, desc, price, img_url, category } = req.body;
				const id = req.params.id;

				if (id && name && price) {
					updateMenuItem(id, name, price, desc, img_url, category)
						.then((item) => (item ? res.json(item) : res.status))
						.catch(() => dbError(res));
				} else {
					res.status(400).send('ID, name, and price required');
				}
			} else {
				notOperator(res);
			}
		})
		.catch(() => dbError(res));
});

/**
 * Route verifying user and deleting menu item from database
 * @name delete/menu/:id
 * @function
 * @param {String} path Express path
 * @param {Function} middleware Callback function used as middleware
 * @returns {JSON} Deleted menu item associated with id
 */
router.delete('/:id', (req, res) => {
	getUserById(req.session.user_id)
		.then((user) => {
			if (user.role === 'operator') {
				const id = req.params.id;
				deleteMenuItem(id)
					.then((item) => {
						res.json(item.rows);
					})
					.catch(() => dbError(res));
			} else {
				notOperator(res);
			}
		})
		.catch(() => dbError(res));
});

module.exports = router;
