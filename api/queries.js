const db = require("../db");

const getAllMenuItems = () => {
  const query = `
  SELECT * FROM "MenuItem";
  `;
  return db.query(query);
};

const getMenuItem = menuId => {
  const values = [menuId];
  const query = `
  SELECT * FROM "MenuItem"
  WHERE id = $1;
  `;
  return db.query(query, values);
};

module.exports = {
  getAllMenuItems,
  getMenuItem
};
