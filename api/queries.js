const db = require("../db");

const getAllMenuItem = () => {
  let query = `SELECT * FROM "MenuItem";`;
  return db.query(query);
};

const getMenuItemById = (id = "") => {
  if (!id) throw new Error("Id required");

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
  if (!id) throw new Error("Id required");

  let query = `
  SELECT * FROM "User"
  WHERE id = $1;`;

  return db.query(query, [id]);
};

const getUserByEmail = (inputParam = "") => {
  if (!inputParam) throw new Error("email required");

  let query = `
  SELECT * FROM "User"
  WHERE email = $1;`;

  return db.query(query, [inputParam]);
};

const getUserByName = (inputParam = "") => {
  if (!inputParam) throw new Error("name required");

  let query = `
  SELECT * FROM "User"
  WHERE name = $1;`;

  return db.query(query, [inputParam]);
};

const getUserByMobile = (inputParam = "") => {
  if (!inputParam) throw new Error("mobile required");

  let query = `
  SELECT * FROM "User"
  WHERE mobile = $1;`;

  return db.query(query, [inputParam]);
};

const getAllOrder = () => {
  let query = `
  SELECT * FROM "Order"
  LIMIT 30;`;

  return db.query(query);
};

const getOrderById = (id = "") => {
  if (!id) throw new Error("Id required");

  let query = `
  SELECT * FROM "Order"
  WHERE id = $1;`;

  return db.query(query, [id]);
};

const getOrderItemByOrderId = (id = "") => {
  if (!id) throw new Error("Order id required");

  let query = `
  SELECT * FROM "OrderItem"
  JOIN "Order" ON "Order".id = "OrderItem".order_id
  WHERE "Order".id = $1;`;

  return db.query(query, [id]);
};

const getOrderByPickupName = (inputParam = "") => {
  if (!inputParam) throw new Error("pickup_name required");

  let query = `
  SELECT * FROM "Order"
  WHERE pickup_name = $1;`;

  return db.query(query, [inputParam]);
};

const getOrderByCreatedTime = (after = "", before = "") => {
  if (!after) throw new Error("time 'estimate' in seconds required");

  let values = [after];
  let query = `
  SELECT * FROM "Order"
  WHERE created_at > $1`;

  if (before) query += `AND created_at < $2`;

  query += ";";
  values.push(before);

  return db.query(query, values);
};

const getOrderByEstimateTime = (after = "", before = "") => {
  if (!after) throw new Error("time 'estimate' in seconds required");

  let values = [after];
  let query = `
  SELECT * FROM "Order"
  WHERE estimate > $1`;

  if (before) query += `AND estimate < $2`;

  query += ";";
  values.push(before);

  return db.query(query, values);
};

const getOrderByAcceptedTime = (after = "", before = "") => {
  if (!after) throw new Error("time 'estimate' in seconds required");

  let values = [after];
  let query = `
  SELECT * FROM "Order"
  WHERE accepted_at > $1`;

  if (before) query += `AND accepted_at < $2`;

  query += ";";
  values.push(before);

  return db.query(query, values);
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
  getOrderById,
  getOrderItemByOrderId,
  getOrderByPickupName,
  getOrderByCreatedTime,
  getOrderByEstimateTime,
  getOrderByAcceptedTime
};
