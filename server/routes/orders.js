const express = require('express');
const router = express.Router();
const twilioAPI = require('../api/twilio_api');
const {
	getUserById,
	getAllOrder,
	getAllOrderNew,
	getAllOrderAccepted,
	getAllOrderFulfilled,
	getOrderById,
	getOrderItemByOrderId,
	getMobileByOrderId
} = require('../db/queries');
const {
	addOrder,
	updateOrder,
	deleteOrder,
	addOrderItem
} = require('../db/inserts');

const { dbError, notOperator, twilioError } = require('../utils/routeHelpers');

// Get all orders
router.get('/', (req, res) => {
	getUserById(req.session.user_id)
		.then((user) => {
			if (user.role === 'operator') {
				getAllOrder()
					.then((orders) => res.json(orders || []))
					.catch(() => dbError(res));
			} else {
				notOperator(res);
			}
		})
		.catch(() => dbError(res));
});

router.get('/new', (req, res) => {
	getUserById(req.session.user_id)
		.then((user) => {
			if (user.role === 'operator') {
				getAllOrderNew()
					.then((orders) => res.json(orders || []))
					.catch(() => dbError(res));
			} else {
				notOperator(res);
			}
		})
		.catch(() => dbError(res));
});

router.get('/accepted', (req, res) => {
	getUserById(req.session.user_id)
		.then((user) => {
			if (user.role === 'operator') {
				getAllOrderAccepted()
					.then((orders) => res.json(orders || []))
					.catch(() => dbError(res));
			} else {
				notOperator(res);
			}
		})
		.catch(() => dbError(res));
});

router.get('/fulfilled', (req, res) => {
	getUserById(req.session.user_id)
		.then((user) => {
			if (user.role === 'operator') {
				getAllOrderFulfilled()
					.then((orders) => res.json(orders || []))
					.catch(() => dbError(res));
			} else {
				notOperator(res);
			}
		})
		.catch(() => dbError(res));
});

router.post('/', (req, res) => {
	const user_id = req.session.user_id;
	const { pickup_name, customer_note, total_price, mobile, items } = req.body;
	if (pickup_name && total_price) {
		addOrder(
			pickup_name,
			total_price,
			customer_note,
			mobile.toString(),
			user_id
		)
			.then((order) => {
				if (order) {
					const order_id = order.id;
					for (let item of items) {
						const menu_item_id = item.id;
						addOrderItem(order_id, menu_item_id)
							.then((ordItem) => {
								res.status(200);
							})
							.catch(() => dbError(res));
					}
					const customerMessage = `Your order (#${order_id}) has been placed! You will be notified when it has been accepted.`;
					twilioAPI.sendSMS(mobile, customerMessage, (response) => {
						if (response.error) twilioError(res);
					});
					const restaurantMessage = `A new order has been placed by ${pickup_name}`;
					twilioAPI.sendSMS('2508968729', restaurantMessage, (response) => {
						if (response.error) twilioError(res);
					});
				}
				res.json(order || []);
			})
			.catch(() => dbError(res));
	} else {
		res.status(400).send('Pickup name and price required');
	}
});

router.get('/:id', (req, res) => {
	const user_id = req.session.user_id;
	getUserById(user_id)
		.then((user) => {
			const id = req.params.id;
			if (user.role === 'operator') {
				getOrderById(id)
					.then((order) => res.json(order || []))
					.catch(() => dbError(res));
			} else {
				notOperator(res);
			}
		})
		.catch(() => dbError(res));
});

router.put('/:id', (req, res) => {
	const user_id = req.session.user_id;
	getUserById(user_id)
		.then((user) => {
			const id = req.params.id;
			const { msg, estimate } = req.body;
			if (user.role === 'operator') {
				updateOrder(id, msg, estimate)
					.then((order) => {
						if (order) {
							getMobileByOrderId(id).then((mobile) => {
								if (msg && msg === 'accept') {
									const customerMessage = `Your order has been accepted! It should be ready in about ${estimate} minutes. See you soon!`;
									twilioAPI.sendSMS(
										mobile,
										customerMessage,
										(response) => response.error && twilioError(res)
									);
								} else if (msg && msg === 'fulfill') {
									const customerMessage = `Your order is ready for pickup! Thank you for using FoodZebra 🦓`;
									twilioAPI.sendSMS(
										mobile,
										customerMessage,
										(response) => response.error && twilioError(res)
									);
								}
							});
						}
						res.json(order || []);
					})
					.catch(() => dbError(res));
			} else {
				notOperator(res);
			}
		})
		.catch(() => dbError(res));
});

router.delete('/:id', (req, res) => {
	const user_id = req.session.user_id;
	getUserById(user_id)
		.then((user) => {
			const id = req.params.id;
			if (user.role === 'operator') {
				deleteOrder(id)
					.then((order) => res.json(order || []))
					.catch(() => dbError(res));
			} else {
				notOperator(res);
			}
		})
		.catch(() => dbError(res));
});

router.get('/:id/items', (req, res) => {
	const user_id = req.session.user_id;
	getUserById(user_id)
		.then((user) => {
			const id = req.params.id;
			if (user.role === 'operator') {
				getOrderItemByOrderId(id)
					.then((items) => res.json(items || []))
					.catch(() => dbError(res));
			} else {
				notOperator(res);
			}
		})
		.catch(() => dbError(res));
});

module.exports = router;
