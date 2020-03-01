/**
 * Collection of database query functions
 * @module queries
 * @requires db
 * @requires validators
 */

const db = require('../db');
const { isValidInt, isValidVarChar } = require('./validators');

/**
 * Fetches all menu items
 * @function
 * @returns {Promise} a promise that either resolves to the menu items or null
 */
const getAllMenuItem = () => {
	const query = `SELECT * FROM "MenuItem" ORDER BY "price";`;
	return db.query(query).then((res) => res.rows || null);
};

/**
 * Fetches menu item by id
 * @param id
 * @function
 * @returns {Promise} a promise that either resolves to the menu item or null
 */
const getMenuItemById = (id) => {
	if (!id || isValidInt(parseInt(id, 10)))
		return new Error('Valid ID required');

	const query = `
  SELECT * FROM "MenuItem"
  WHERE id = $1;`;

	return db.query(query, [id]).then((res) => res.rows[0] || null);
};

/**
 * Fetches all users
 * @function
 * @returns {Promise} a promise that either resolves to the users or null
 */
const getAllUser = () => {
	const query = `SELECT * FROM "User" ORDER BY "role";`;

	return db.query(query).then((res) => res.rows || null);
};

/**
 * Fetches user by id
 * @param id
 * @function
 * @returns {Promise} a promise that either resolves to the user or null
 */
const getUserById = (id = 0) => {
	if (typeof parseInt(id, 10) !== 'number')
		return new Error('Must be valid ID');

	const query = `
  SELECT * FROM "User"
  WHERE id = $1;`;

	return db.query(query, [id]).then((res) => res.rows[0] || null);
};

/**
 * Fetches user by email
 * @param {String} email
 * @function
 * @returns {Promise} a promise that either resolves to the user or null
 */
const getUserByEmail = (email) => {
	if (!email || !isValidVarChar(email))
		return new Error('Valid email required');

	const query = `
  SELECT * FROM "User"
  WHERE email = $1;`;

	return db.query(query, [email]).then((res) => res.rows[0] || null);
};

/**
 * Fetches all orders
 * @function
 * @returns {Promise} a promise that either resolves to the orders or null
 */
const getAllOrder = () => {
	const query = `
  SELECT * FROM "Order"
  ORDER BY "created_at";`;

	return db.query(query).then((res) => res.rows || null);
};

/**
 * Fetches all new orders
 * @function
 * @returns {Promise} a promise that either resolves to the new orders or null
 */
const getAllOrderNew = () => {
	const query = `
  SELECT * FROM "Order"
  WHERE "accepted_at" IS NULL
  ORDER BY "created_at";`;

	return db.query(query).then((res) => res.rows || null);
};

/**
 * Fetches all accepted orders
 * @function
 * @returns {Promise} a promise that either resolves to the accepted orders or null
 */
const getAllOrderAccepted = () => {
	const query = `
  SELECT * FROM "Order"
  WHERE "accepted_at" IS NOT NULL
  AND "fulfilled_at" IS NULL
  ORDER BY "created_at";`;

	return db.query(query).then((res) => res.rows || null);
};

/**
 * Fetches all fulfilled orders
 * @function
 * @returns {Promise} a promise that either resolves to the fulfilled orders or null
 */
const getAllOrderFulfilled = () => {
	const query = `
  SELECT * FROM "Order"
  WHERE "fulfilled_at" IS NOT NULL
  ORDER BY "created_at";`;

	return db.query(query).then((res) => res.rows || null);
};

/**
 * Fetches order by id
 * @param {Number} id
 * @function
 * @returns {(Promise|Error)} a promise that either resolves to the order or null
 */
const getOrderById = (id) => {
	if (!id || !isValidInt(parseInt(id, 10)))
		return new Error('Valid ID required');

	const query = `
  SELECT * FROM "Order"
  WHERE id = $1;`;

	return db.query(query, [id]).then((res) => res.rows[0] || null);
};

/**
 * Fetches order item by id
 * @param {Number} id
 * @function
 * @returns {(Promise|Error)} a promise that either resolves to the order item or null
 */
const getOrderItemByOrderId = (id) => {
	if (!id || !isValidInt(parseInt(id, 10)))
		return new Error('Valid order id required');

	const query = `
  SELECT "OrderItem"."id", "MenuItem"."name", "MenuItem"."price", "Order"."accepted_at", "Order"."fulfilled_at" FROM "OrderItem"
  JOIN "MenuItem" ON "OrderItem"."menu_item_id" = "MenuItem"."id"
  JOIN "Order" ON "Order"."id" = $1
  WHERE "OrderItem"."order_id" = $1
  ORDER BY "Order"."created_at";`;

	return db.query(query, [id]).then((res) => res.rows || null);
};

/**
 * Fetches mobile by order id
 * @param {Number} order_id
 * @function
 * @returns {(Promise|Error)} a promise that either resolves to the order or null
 */
const getMobileByOrderId = (order_id) => {
	if (!order_id || typeof parseInt(order_id, 10) !== 'number')
		return new Error('Valid order_id required');

	const query = `
  SELECT mobile FROM "Order"
  WHERE "id" = $1;`;

	return db.query(query, [order_id]).then((res) => res.rows[0].mobile || null);
};

module.exports = {
	getAllMenuItem,
	getMenuItemById,
	getAllUser,
	getUserById,
	getUserByEmail,
	getAllOrder,
	getAllOrderNew,
	getAllOrderAccepted,
	getAllOrderFulfilled,
	getOrderById,
	getOrderItemByOrderId,
	getMobileByOrderId
};
