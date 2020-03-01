/**
 * Collection of database insert functions
 * @module inserts
 * @requires db
 * @requires validators
 */

const db = require('./index');
const { isValidInt, isValidSmallInt, isValidVarChar } = require('./validators');

/**
 * Creates a new user in the database
 * @function
 * @param {String} name
 * @param {String} password
 * @param {String} email
 * @param {String} role
 * @param {String} mobile
 * @returns {(Promise|Error)} a promise that either resolves to the created user or null
 */
const addUser = (
	name,
	password,
	email = '',
	role = 'customer',
	mobile = ''
) => {
	let invalidReason = false;

	if (!isValidVarChar(name)) invalidReason = 'name';
	if (!isValidVarChar(email)) invalidReason = 'email';
	if (!isValidVarChar(role)) invalidReason = 'role';
	if (!isValidVarChar(mobile)) invalidReason = 'mobile';
	if (!isValidVarChar(password)) invalidReason = 'password';
	if (invalidReason) return new Error(`${invalidReason} is not valid`);

	const values = [name, email, role, mobile, password];
	const query = `
  INSERT INTO "User" (
    "name",
    "email",
    "role",
    "mobile",
    "password")
  VALUES
  ($1, $2, $3, $4, $5),
  RETURNING *;`;

	return db.query(query, values).then((res) => res.rows[0] || null);
};

/**
 * Creates a new menu item in the database
 * @function
 * @param {String} name
 * @param {Number} price
 * @param {String} desc
 * @param {String} img_url
 * @param {String} category
 * @returns {(Promise|Error)} a promise that either resolves to the created menu item or null
 */
const addMenuItem = (
	name,
	price,
	desc = 'N/A',
	img_url = '',
	category = 'mains'
) => {
	let invalidReason = false;

	if (!isValidVarChar(name)) invalidReason = 'name';
	if (!isValidVarChar(desc)) invalidReason = 'desc';
	if (!isValidSmallInt(price) || price <= 0) invalidReason = 'price';
	if (!isValidVarChar(img_url)) invalidReason = 'img_url';
	if (!isValidVarChar(category)) invalidReason = 'category';
	if (invalidReason) return new Error(`${invalidReason} is not valid`);

	const values = [name, desc, price, img_url, category];

	const query = `
  INSERT INTO "MenuItem" (
    "name",
    "desc",
    "price",
    "img_url",
    "category"
  )
  VALUES
  ($1, $2, $3, $4, $5)
  RETURNING *;`;

	return db.query(query, values).then((res) => res.rows[0] || null);
};

/**
 * Updates a new menu item in the database
 * @function
 * @param {Number} id
 * @param {String} name
 * @param {Number} price
 * @param {String} desc
 * @param {String} img_url
 * @param {String} category
 * @returns {(Promise|Error)} a promise that either resolves to the updated menu item or null
 */
const updateMenuItem = (
	id,
	name,
	price,
	desc = '',
	img_url = '',
	category = 'mains'
) => {
	let invalidReason = false;

	if (!isValidVarChar(name)) invalidReason = 'name';
	if (!isValidVarChar(desc)) invalidReason = 'desc';
	if (!isValidSmallInt(price) || price <= 0) invalidReason = 'price';
	if (!isValidVarChar(img_url)) invalidReason = 'img_url';
	if (!isValidVarChar(category)) invalidReason = 'category';
	if (invalidReason) return new Error(`${invalidReason} is not valid`);

	const values = [id, name, desc, price, img_url, category];

	const query = `
  UPDATE "MenuItem"
    SET "name" = $2,
     "desc" = $3,
     "price" = $4,
     "img_url" = $5,
     "category" = $6
  WHERE "id" = $1
  RETURNING *;`;

	return db.query(query, values).then((res) => res.rows[0] || null);
};

/**
 * Deletes a new menu item in the database
 * @function
 * @param {Number} id
 * @returns {Promise} a promise that either resolves to the deleted menu item or null
 */
const deleteMenuItem = (id) => {
	const values = [id];

	const query = `
  UPDATE "MenuItem"
    SET "deleted_at" = now()
  WHERE "id" = $1
  RETURNING *;`;

	return db.query(query, values).then((res) => res.rows[0] || null);
};

/**
 * Adds a new order in the database
 * @function
 * @param {String} pickup_name
 * @param {Number} total_price
 * @param {String} customer_note
 * @param {String} mobile
 * @param {Number} user_id
 * @returns {Promise|Error} a promise that either resolves to the new order or null
 */
const addOrder = (
	pickup_name,
	total_price,
	customer_note = '',
	mobile = '',
	user_id = 0
) => {
	let invalidReason = false;

	if (!isValidVarChar(pickup_name)) invalidReason = 'pickup_name';
	if (!isValidVarChar(customer_note) && customer_note !== '')
		invalidReason = 'customer_note';
	if (!isValidVarChar(mobile) && mobile !== '') invalidReason = 'mobile';

	if (!isValidSmallInt(total_price)) invalidReason = 'total_price';
	if (!isValidInt(user_id)) invalidReason = 'user_id';
	if (invalidReason) return new Error(`${invalidReason} is not valid`);

	const values = [
		pickup_name,
		customer_note,
		mobile,
		total_price,
		parseInt(user_id, 10)
	];

	const query = `
  INSERT INTO "Order" (
    "pickup_name",
    "customer_note",
    "created_at",
    "mobile",
    "total_price",
    "user_id")
  VALUES
  ($1, $2, now(), $3, $4, $5)
  RETURNING *;`;

	return db.query(query, values).then((res) => res.rows[0] || null);
};

/**
 * Updates an order in the database
 * @function
 * @param {Number} id
 * @param {String} msg
 * @param {Number} estimate
 * @returns {(Promise|Error)} a promise that either resolves to the updated order or null
 */
const updateOrder = (id, msg, estimate = 1800) => {
	if (!id || !msg) return new Error(`Missing ID or message`);

	if (msg === 'accept') {
		const values = [estimate, id];
		const query = `
      UPDATE "Order"
        SET "accepted_at" = now(),
            "estimate" = $1
      WHERE "id" = $2
      RETURNING *;`;

		return db.query(query, values);
	} else if (msg === 'fulfill') {
		const values = [id];
		const query = `
      UPDATE "Order"
        SET "fulfilled_at" = now()
      WHERE "id" = $1
      RETURNING *;`;

		return db.query(query, values).then((res) => res.rows[0] || null);
	}

	return new Error(`Invalid message type`);
};

/**
 * Adds a deleted_at property to an order in the database
 * @function
 * @param {String} pickup_name
 * @param {Number} total_price
 * @param {String} customer_note
 * @param {String} mobile
 * @param {Number} user_id
 * @returns {Promise|Error} a promise that either resolves to the deleted order or null
 */
const deleteOrder = (id) => {
	if (!id) return new Error('Missing ID');

	const values = [id];
	const query = `
    UPDATE "Order"
      SET "deleted_at" = now()
    WHERE "id" = $1
    RETURNING *;`;

	return db.query(query, values).then((res) => res.rows[0] || null);
};

/**
 * Adds a new order item in the database
 * @function
 * @param {Number} order_id
 * @param {Number} menu_item_id
 * @returns {Promise|Error} a promise that either resolves to the new order item or null
 */
const addOrderItem = (order_id, menu_item_id) => {
	let invalidReason = false;

	if (!isValidInt(order_id)) invalidReason = 'order_id';
	if (!isValidInt(menu_item_id)) invalidReason = 'menu_item_id';
	if (invalidReason) return new Error(`${invalidReason} is not valid`);

	const values = [order_id, menu_item_id];
	const query = `
  INSERT INTO "OrderItem" (
    "order_id",
    "menu_item_id")
  VALUES
  ($1, $2)
  RETURNING *;`;

	return db.query(query, values).then((res) => res.rows[0] || null);
};

module.exports = {
	addUser,
	addMenuItem,
	updateMenuItem,
	deleteMenuItem,
	addOrder,
	updateOrder,
	deleteOrder,
	addOrderItem
};
