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
  if (invalidReason) throw new Error(`${invalidReason} is not valid`);

  let values = [name, email, role, mobile, password];
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

const addMenuItem = (
  name,
  price,
  desc = 'N/A',
  img_url = '',
  category = 'mains'
) => {
  let invalidReason = '';

  if (!isValidVarChar(name)) invalidReason = 'name';
  if (!isValidVarChar(desc)) invalidReason = 'desc';
  if (!isValidSmallInt(price) || price <= 0) invalidReason = 'price';
  if (!isValidVarChar(img_url)) invalidReason = 'img_url';
  if (!isValidVarChar(category)) invalidReason = 'category';
  if (invalidReason) throw new Error(`${invalidReason} is not valid`);

  const values = [name, desc, price, img_url, category];

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

const updateMenuItem = (
  id,
  name,
  price,
  desc = '',
  img_url = '',
  category = 'mains'
) => {
  let invalidReason = '';

  if (!isValidVarChar(name)) invalidReason = 'name';
  if (!isValidVarChar(desc)) invalidReason = 'desc';
  if (!isValidSmallInt(price) || price <= 0) invalidReason = 'price';
  if (!isValidVarChar(img_url)) invalidReason = 'img_url';
  if (!isValidVarChar(category)) invalidReason = 'category';
  if (invalidReason) throw new Error(`${invalidReason} is not valid`);

  const values = [id, name, desc, price, img_url, category];

  let query = `
  UPDATE "MenuItem"
    SET "name" = $2,
     "desc" = $3,
     "price" = $4,
     "img_url" = $5,
     "category" = $6
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

  const values = [
    pickup_name,
    customer_note,
    mobile,
    total_price,
    parseInt(user_id)
  ];

  console.log(mobile);
  if (invalidReason) {
    console.log('THERE IS AN INVALID REASON AND IT IS: ', invalidReason);
    throw new Error(`${invalidReason} is not valid`);
  }

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

  console.log('query is: ', query);

  console.log('values is: ', values);

  return db.query(query, values).catch(err => {
    console.log('query is: ', query);
    console.log('values is: ', values);
    console.log('err is: ', err);
  });
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

const addOrderItem = (order_id, menu_item_id) => {
  let invalidReason = false;

  if (!isValidInt(order_id)) invalidReason = 'order_id';
  if (!isValidInt(menu_item_id)) invalidReason = 'menu_item_id';

  if (invalidReason) throw new Error(`${invalidReason} is not valid`);

  const values = [order_id, menu_item_id];
  const query = `
  INSERT INTO "OrderItem" (
    "order_id",
    "menu_item_id",
  VALUES 
  ($1, $2)
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
  deleteOrder,
  addOrderItem
};
