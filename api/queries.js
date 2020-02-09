const db = require('../db');

const getAllMenuItems = () => {
  const query = `
  SELECT * FROM "MenuItem";
  `;
  return db.query(query);
};

module.exports = {
  getAllMenuItems
};
