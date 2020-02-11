const db = require("../db");
const varCharMaxLength = 255;
const smallIntLimit = 32767;
const intLimit = 2147483647;

// Helper functions to be called
const isValidVarChar = inputString => {
  if (
    typeof inputString === "string" &&
    inputString.length <= varCharMaxLength
  ) {
    return true;
  }
  return false;
};

const isValidInt = inputNum => {
  if (isNaN(inputNum) && Math.abs(inpuinputNumtString) <= intLimit) {
    return true;
  }
  return false;
};

const isValidSmallInt = inputNum => {
  if (isNaN(inputNum) && Math.abs(inpuinputNumtString) <= smallIntLimit) {
    return true;
  }
  return false;
};

const addUser = options => {
  let { name, email, role, mobile, password } = options;
  let values = [name, email, role, mobile, password];
  let invalidReason = false;

  if (!isValidVarChar(name)) invalidReason = "name";
  if (!isValidVarChar(email)) invalidReason = "email";
  if (!isValidVarChar(role)) invalidReason = "role";
  if (!isValidVarChar(mobile)) invalidReason = "mobile";
  if (!isValidVarChar(password)) invalidReason = "password";

  if (invalidReason) return Promise.reject(`${invalidReason} is not valid`);

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

const customerAddOrder = options => {
  let {
    pickup_name,
    customer_note,
    // created_at,
    estimate,
    total_price,
    // accepted_at,
    // deleted_at,
    user_id
  } = options;
  let values = [pickup_name, customer_note, estimate, total_price, user_id];
  let invalidReason = false;

  if (isValidVarChar(pickup_name)) invalidReason = "pickup_name";
  if (isValidVarChar(customer_note)) invalidReason = "customer_note";
  if (isValidInt(estimate)) invalidReason = "estimate";
  if (isValidSmallInt(total_price)) invalidReason = "total_price";
  if (isValidVarChar(user_id)) invalidReason = "user_id";

  if (invalidReason) return Promise.reject(`${invalidReason} is not valid`);

  let query = `
  INSERT INTO "Order" (
    "pickup_name",
    "customer_note",
    "created_at",
    "estimate",
    "total_price",
    "accepted_at",
    "deleted_at",
    "user_id") 
  VALUES 
  ($1, $2, NOW(), $3, $4, NULL, NULL, $5)
  RETURNING *;`;

  return db.query(query, values);
};

const addMenuItem = options => {
  let { name, desc, price, img_url, category } = options;
  let invalidReason = "";

  if (isValidVarChar(name)) invalidReason = "name";
  if (isValidVarChar(desc)) invalidReason = "desc";
  if (isValidSmallInt(price)) invalidReason = "price";
  if (isValidVarChar(img_url)) invalidReason = "img_url";
  if (isValidVarChar(category)) invalidReason = "category";

  if (invalidReason) return Promise.reject(`${invalidReason} is not valid`);

  let query = `
  INSERT INTO "MenuItem" (
    "name" VARCHAR(255) NOT NULL,
    "desc" TEXT NOT NULL,
    "price" SMALLINT NOT NULL,
    "img_url" VARCHAR(255),
    "category" VARCHAR(255),
  );
  VALUES 
  ($1, $2, $3, $4, $5)
  RETURNING *;`;

  return db.query(query, values);
};

module.exports = {
  addUser,
  customerAddOrder,
  addMenuItem
};
