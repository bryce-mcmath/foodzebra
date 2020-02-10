const db = require("../db");

const getAllMenuItem = () => {
  let query = `SELECT * FROM "MenuItem";`;
  return db.query(query);
};

const getMenuItemById = (id = "") => {
  if (!id) Promise.reject("Id required");

  let query = `
  SELECT * FROM "MenuItem"
  WHERE id = $1;`;

  return db.query(query, [id]);
};

const getAllUser = () => {
  let query = `SELECT * FROM "User";`;

  return db.query(query);
};

const getUserById = (id = "") => {
  if (!id) Promise.reject("Id required");

  let query = `
  SELECT * FROM "User"
  WHERE id = $1;`;

  return db.query(query, [id]);
};

const getAllOrder = () => {
  let query = `
  SELECT * FROM "Order"
  LIMIT 30;`;

  return db.query(query);
};

const getOrderById = (id = "") => {
  if (!id) Promise.reject("Id required");

  let query = `
  SELECT * FROM "Order"
  WHERE id = $1;`;

  return db.query(query, [id]);
};

const getOrderItemByOrderId = (id = "") => {
  if (!id) Promise.reject("Order id required");

  let query = `
  SELECT * FROM "OrderItem"
  JOIN "Order" ON "Order".id = "OrderItem".order_id
  WHERE "Order".id = $1;`;

  return db.query(query, [id]);
};

module.exports = {
  getAllMenuItem,
  getMenuItemById,
  getAllUser,
  getUserById,
  getAllOrder,
  getOrderById,
  getOrderItemByOrderId
};
