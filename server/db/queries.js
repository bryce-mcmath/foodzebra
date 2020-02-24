const db = require('../db');
const { isValidInt, isValidVarChar } = require('./validators');

const getAllMenuItem = () => {
	const query = `SELECT * FROM "MenuItem" ORDER BY "price";`;
	return db.query(query).then((res) => res.rows || null);
};

const getMenuItemById = (id) => {
	if (!id || isValidInt(parseInt(id, 10)))
		return new Error('Valid ID required');

	const query = `
  SELECT * FROM "MenuItem"
  WHERE id = $1;`;

	return db.query(query, [id]).then((res) => res.rows[0] || null);
};

const getAllUser = () => {
	const query = `SELECT * FROM "User" ORDER BY "role";`;

	return db.query(query).then((res) => res.rows || null);
};

const getUserById = (id = 0) => {
	if (typeof parseInt(id, 10) !== 'number')
		return new Error('Must be valid ID');

	const query = `
  SELECT * FROM "User"
  WHERE id = $1;`;

	return db.query(query, [id]).then((res) => res.rows[0] || null);
};

const getUserByEmail = (inputParam) => {
	if (!inputParam || !isValidVarChar(inputParam))
		return new Error('Valid email required');

	const query = `
  SELECT * FROM "User"
  WHERE email = $1;`;

	return db.query(query, [inputParam]).then((res) => res.rows[0] || null);
};

const getUserByName = (inputParam) => {
	if (!inputParam || !isValidVarChar(inputParam))
		return new Error('Valid name required');

	const query = `
  SELECT * FROM "User"
  WHERE name = $1;`;

	return db.query(query, [inputParam]).then((res) => res.rows || null);
};

const getUserByMobile = (inputParam) => {
	if (!inputParam || !isValidVarChar(inputParam))
		return new Error('Valid mobile required');

	const query = `
  SELECT * FROM "User"
  WHERE mobile = $1;`;

	return db.query(query, [inputParam]).then((res) => res.rows[0] || null);
};

const getAllOrder = () => {
	const query = `
  SELECT * FROM "Order"
  ORDER BY "created_at";`;

	return db.query(query).then((res) => res.rows || null);
};

const getAllOrderNew = () => {
	const query = `
  SELECT * FROM "Order"
  WHERE "accepted_at" IS NULL
  ORDER BY "created_at";`;

	return db.query(query).then((res) => res.rows || null);
};

const getAllOrderAccepted = () => {
	const query = `
  SELECT * FROM "Order"
  WHERE "accepted_at" IS NOT NULL
  AND "fulfilled_at" IS NULL
  ORDER BY "created_at";`;

	return db.query(query).then((res) => res.rows || null);
};

const getAllOrderFulfilled = () => {
	const query = `
  SELECT * FROM "Order"
  WHERE "fulfilled_at" IS NOT NULL
  ORDER BY "created_at";`;

	return db.query(query).then((res) => res.rows || null);
};

const getOrderById = (id) => {
	if (!id || !isValidInt(parseInt(id, 10)))
		return new Error('Valid ID required');

	const query = `
  SELECT * FROM "Order"
  WHERE id = $1;`;

	return db.query(query, [id]).then((res) => res.rows[0] || null);
};

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

const getOrderByPickupName = (inputParam) => {
	if (!inputParam || !isValidVarChar(inputParam))
		return new Error('Valid pickup name required');

	const query = `
  SELECT * FROM "Order"
  WHERE "pickup_name" = $1
  ORDER BY "created_at";`;

	return db.query(query, [inputParam]).then((res) => res.rows || null);
};

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
	getUserByName,
	getUserByMobile,
	getAllOrder,
	getAllOrderNew,
	getAllOrderAccepted,
	getAllOrderFulfilled,
	getOrderById,
	getOrderByPickupName,
	getOrderItemByOrderId,
	getMobileByOrderId
};
