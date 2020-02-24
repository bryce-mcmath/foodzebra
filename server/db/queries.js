const db = require('../db');
const { isValidInt, isValidVarChar } = require('./validators');

const getAllMenuItem = () => {
  const query = `SELECT * FROM "MenuItem";`;
  return db.query(query);
};

const getMenuItemById = id => {
  if (!id || isValidInt(parseInt(id))) return new Error('Valid ID required');

  const query = `
  SELECT * FROM "MenuItem"
  WHERE id = $1;`;

  return db.query(query, [id]);
};

const getAllUser = () => {
  const query = `SELECT * FROM "User";`;

  return db.query(query);
};

const getUserById = (id = 0) => {
  if (typeof parseInt(id) !== 'number') return new Error('Must be valid ID');

  const query = `
  SELECT * FROM "User"
  WHERE id = $1;`;

  return db.query(query, [id]);
};

const getUserByEmail = inputParam => {
  if (!inputParam || !isValidVarChar(inputParam))
    return new Error('Valid email required');

  const query = `
  SELECT * FROM "User"
  WHERE email = $1;`;

  return db.query(query, [inputParam]);
};

const getUserByName = inputParam => {
  if (!inputParam || !isValidVarChar(inputParam))
    return new Error('Valid name required');

  const query = `
  SELECT * FROM "User"
  WHERE name = $1;`;

  return db.query(query, [inputParam]);
};

const getUserByMobile = inputParam => {
  if (!inputParam || !isValidVarChar(inputParam))
    return new Error('mobile required');

  const query = `
  SELECT * FROM "User"
  WHERE mobile = $1;`;

  return db.query(query, [inputParam]);
};

const getAllOrder = () => {
  const query = `
  SELECT * FROM "Order";`;

  return db.query(query);
};

const getAllOrderNew = () => {
  const query = `
  SELECT * FROM "Order"
  WHERE "accepted_at" IS NULL;`;

  return db.query(query);
};

const getAllOrderAccepted = () => {
  const query = `
  SELECT * FROM "Order"
  WHERE "accepted_at" IS NOT NULL
  AND "fulfilled_at" IS NULL;`;

  return db.query(query);
};

const getAllOrderFulfilled = () => {
  const query = `
  SELECT * FROM "Order"
  WHERE "fulfilled_at" IS NOT NULL;`;

  return db.query(query);
};

const getOrderById = id => {
  if (!id || !isValidInt(parseInt(id))) return new Error('Valid ID required');

  const query = `
  SELECT * FROM "Order"
  WHERE id = $1;`;

  return db.query(query, [id]);
};

const getOrderItemByOrderId = id => {
  if (!id || !isValidInt(parseInt(id))) return new Error('Order id required');

  const query = `
  SELECT "OrderItem"."id", "MenuItem"."name", "MenuItem"."price", "Order"."accepted_at", "Order"."fulfilled_at" FROM "OrderItem"
  JOIN "MenuItem" ON "OrderItem"."menu_item_id" = "MenuItem"."id"
  JOIN "Order" ON "Order"."id" = $1
  WHERE "OrderItem"."order_id" = $1;`;

  return db.query(query, [id]);
};

const getOrderByPickupName = inputParam => {
  if (!inputParam || !isValidVarChar(inputParam))
    return new Error('Valid pickup name required');

  const query = `
  SELECT * FROM "Order"
  WHERE "pickup_name" = $1;`;

  return db.query(query, [inputParam]);
};

const getMobileByOrderId = order_id => {
  if (!order_id || typeof parseInt(order_id) !== 'number')
    return new Error('Valid order_id required');

  const query = `
  SELECT mobile FROM "Order"
  WHERE "id" = $1;`;

  return db.query(query, [order_id]);
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
