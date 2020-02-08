const express = require("express");
const router = express.Router();
const dummyMenu = require("../src/dummyData/menuItems");

router.get("/", (req, res) => {
  console.log("dummyMenu", dummyMenu);
  res.send(dummyMenu);
});

router.post("/", (req, res) => {
  res.send("You posted to /menu");
});

router.put("/:id", (req, res) => {
  res.send("You are updating a menu item");
});

router.delete("/:id", (req, res) => {
  res.send("You are deleting a menu item");
});

module.exports = router;
