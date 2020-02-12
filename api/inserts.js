const db = require('../db');
const varCharMaxLength = 255;
const smallIntLimit = 32767;
const intLimit = 2147483647;

// Helper functions to be called
const isValidVarChar = inputString => {
  if (
    typeof inputString === 'string' &&
    inputString.length <= varCharMaxLength
  ) {
    return true;
  }
  return false;
};

const isValidInt = inputNum => {
  if (!Number.isNaN(inputNum) && Math.abs(inputNum) <= intLimit) {
    return true;
  }
  return false;
};

const isValidSmallInt = inputNum => {
  if (!isNaN(inputNum) && Math.abs(inputNum) <= smallIntLimit) {
    return true;
  }
  return false;
};

const addUser = options => {
  let { name, email, role, mobile, password } = options;
  let values = [name, email, role, mobile, password];
  let invalidReason = false;

  if (!isValidVarChar(name)) invalidReason = 'name';
  if (!isValidVarChar(email)) invalidReason = 'email';
  if (!isValidVarChar(role)) invalidReason = 'role';
  if (!isValidVarChar(mobile)) invalidReason = 'mobile';
  if (!isValidVarChar(password)) invalidReason = 'password';

  if (invalidReason) throw new Error(`${invalidReason} is not valid`);

  let query = `
  INSERT INTO "User" (
    "name",
    "email",
    "role",
    "mobile",
    "password") 
  VALUES 
  ($1, $2, $3, $4, $5),
  RETURNING *;`;

  return db.query(query, values);
};

const addMenuItem = options => {
  const { name, desc, price, img_url, category } = options;
  const values = [name, desc, price, img_url, category];
  let invalidReason = '';

  if (!isValidVarChar(name)) invalidReason = 'name';
  if (!isValidVarChar(desc)) invalidReason = 'desc';
  if (!isValidSmallInt(price) || price <= 0) invalidReason = 'price';
  if (!isValidVarChar(img_url)) invalidReason = 'img_url';
  if (!isValidVarChar(category)) invalidReason = 'category';

  if (invalidReason) throw new Error(`${invalidReason} is not valid`);

  let query = `
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

  return db.query(query, values);
};

const updateMenuItem = options => {
  const { id, name, desc, price, img_url, category } = options;
  const values = [id, name, desc, price, img_url, null, category];
  let invalidReason = '';

  if (!isValidVarChar(name)) invalidReason = 'name';
  if (!isValidVarChar(desc)) invalidReason = 'desc';
  if (!isValidSmallInt(price) || price <= 0) invalidReason = 'price';
  if (!isValidVarChar(img_url)) invalidReason = 'img_url';
  if (!isValidVarChar(category)) invalidReason = 'category';
  if (invalidReason) throw new Error(`${invalidReason} is not valid`);

  let query = `
  UPDATE "MenuItem"
    SET "name" = $2,
     "desc" = $3,
     "price" = $4,
     "img_url" = $5,
     "deleted_at" = $6,
     "category" = $7
  WHERE "id" = $1
  RETURNING *;`;

  return db.query(query, values);
};

const deleteMenuItem = id => {
  const values = [id];

  let query = `
  UPDATE "MenuItem"
    SET "deleted_at" = now()
  WHERE "id" = $1
  RETURNING *;`;

  return db.query(query, values);
};

const addOrder = options => {
  const { pickup_name, customer_note, total_price, user_id } = options;
  const values = [pickup_name, customer_note, total_price, user_id];
  let invalidReason = false;

  if (!isValidVarChar(pickup_name)) invalidReason = 'pickup_name';
  if (!isValidVarChar(customer_note)) invalidReason = 'customer_note';
  if (!isValidSmallInt(total_price)) invalidReason = 'total_price';
  if (!isValidInt(user_id)) invalidReason = 'user_id';

  if (invalidReason) throw new Error(`${invalidReason} is not valid`);

  const query = `
  INSERT INTO "Order" (
    "pickup_name",
    "customer_note",
    "created_at",
    "estimate",
    "total_price",
    "accepted_at",
    "fulfilled_at",
    "deleted_at",
    "user_id") 
  VALUES 
  ($1, $2, now(), NULL, $3, NULL, NULL, NULL, $4)
  RETURNING *;`;

  return db.query(query, values);
};

const updateOrder = (id = '', msg = '', estimate = 1800) => {
  if (!id || !msg) {
    throw new Error('id and message required');
  }

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

    return db.query(query, values);
  }
};

const deleteOrder = (id = '') => {
  if (!id) {
    throw new Error('id required');
  }

  const values = [id];
  const query = `
    UPDATE "Order"
      SET "deleted_at" = now()
    WHERE "id" = $1
    RETURNING *;`;

  return db.query(query, values);
};

module.exports = {
  addUser,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  addOrder,
  updateOrder,
  deleteOrder
};
