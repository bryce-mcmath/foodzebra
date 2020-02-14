const db = require('../db');

const getAllMenuItem = () => {
  const query = `SELECT * FROM "MenuItem";`;
  return db.query(query);
};

const getMenuItemById = (id = '') => {
  if (!id) throw new Error('Id required');

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
  if (typeof parseInt(id) !== 'number') throw new Error('Must be valid ID');

  const query = `
  SELECT * FROM "User"
  WHERE id = $1;`;

  return db.query(query, [id]);
};

const getUserByEmail = (inputParam = '') => {
  if (!inputParam) throw new Error('email required');

  const query = `
  SELECT * FROM "User"
  WHERE email = $1;`;

  return db.query(query, [inputParam]);
};

const getUserByName = (inputParam = '') => {
  if (!inputParam) throw new Error('name required');

  const query = `
  SELECT * FROM "User"
  WHERE name = $1;`;

  return db.query(query, [inputParam]);
};

const getUserByMobile = (inputParam = '') => {
  if (!inputParam) throw new Error('mobile required');

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

const getOrderById = (id = '') => {
  if (!id) throw new Error('Id required');

  const query = `
  SELECT * FROM "Order"
  WHERE id = $1;`;

  return db.query(query, [id]);
};

const getOrderItemByOrderId = (id = '') => {
  if (!id) throw new Error('Order id required');

  const query = `
  SELECT "OrderItem"."id", "MenuItem"."name", "MenuItem"."price", "Order"."accepted_at", "Order"."fulfilled_at" FROM "OrderItem"
  JOIN "MenuItem" ON "OrderItem"."menu_item_id" = "MenuItem"."id"
  JOIN "Order" ON "Order"."id" = $1
  WHERE "OrderItem"."order_id" = $1;`;

  return db.query(query, [id]);
};

const getOrderByPickupName = (inputParam = '') => {
  if (!inputParam) throw new Error('pickup_name required');

  const query = `
  SELECT * FROM "Order"
  WHERE "pickup_name" = $1;`;

  return db.query(query, [inputParam]);
};

const getMobileByOrderId = order_id => {
  if (!order_id || typeof parseInt(order_id) !== 'number')
    throw new Error('valid order_id required');

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
