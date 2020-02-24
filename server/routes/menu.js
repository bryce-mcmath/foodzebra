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

// Routes: /

// Queries DB for all menu items. Takes no args, returns array w/ objs inside
router.get('/', (req, res) => {
	getAllMenuItem()
		.then((menu) => {
			return menu ? res.send(menu) : new Error('No rows in menu items');
		})
		.catch((err) => dbError(res));
});

// If logged in as operator and valid info is sent, adds item to db and returns json object of newly created item
router.post('/', (req, res) => {
	getUserById(req.session.user_id)
		.then((user) => {
			if (user.role === 'operator') {
				const { name, desc, price, img_url, category } = req.body;
				if (name && price && typeof price === 'number') {
					addMenuItem(name, price, desc, img_url, category)
						.then((item) => res.status(200).json(item))
						.catch((err) => dbError(res));
				} else {
					res.status(400).send('Name and valid price required');
				}
			} else {
				notOperator(res);
			}
		})
		.catch((err) => notOperator(res));
});

// Routes: /menu/:id params
// Queries DB for a menu item. Takes one id arg, returns JSON of menu item
router.get('/:id', (req, res) => {
	const id = req.params.id;

	getMenuItemById(id)
		.then((item) => (item ? res.json(item) : res.redirect('/')))
		.catch((err) => dbError(res));
});

// update menu item
router.put('/:id', (req, res) => {
	getUserById(req.session.user_id)
		.then((user) => {
			if (user.role === 'operator') {
				const { name, desc, price, img_url, category } = req.body;
				const id = req.params.id;

				if (id && name && price) {
					updateMenuItem(id, name, price, desc, img_url, category)
						.then((item) => (item ? res.json(item) : res.status))
						.catch((err) => dbError(res));
				} else {
					res.status(400).send('ID, name, and price required');
				}
			} else {
				notOperator(res);
			}
		})
		.catch((err) => dbError(res));
});

router.delete('/:id', (req, res) => {
	getUserById(req.session.user_id)
		.then((user) => {
			if (user.role === 'operator') {
				const id = req.params.id;
				deleteMenuItem(id)
					.then((item) => {
						res.json(item.rows);
					})
					.catch((err) => dbError(res));
			} else {
				notOperator(res);
			}
		})
		.catch((err) => dbError(res));
});

module.exports = router;
