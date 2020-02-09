const express = require("express");
const router = express.Router();
const { getAllMenuItems, getMenuItem } = require("../api/queries.js");

// Routes: /

// Queries DB for all menu items. Takes no args, returns array w/ objs inside
router.get("/", (req, res) => {
  getAllMenuItems()
    .then(function(result) {
      if (result.rows) {
        res.send(result.rows);
      } else {
        throw new Error("No rows in menu items");
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400);
    });
});

router.post("/", (req, res) => {
  res.send("You posted to /menu");
});

// Routes: /menu/:id params

// Queries DB for a menu item. Takes one id arg, returns array w/ obj inside
router.get("/:id", (req, res) => {
  const id = req.params.id;

  if (typeof id === "string") {
    getMenuItem(id)
      .then(function(result) {
        res.send(result.rows);
      })
      .catch(err => {
        console.log(err);
        res.status(400);
      });
  } else {
    res.status(400);
  }
});

router.put("/:id", (req, res) => {
  res.send("You are updating a menu item");
});

router.delete("/:id", (req, res) => {
  res.send("You are deleting a menu item");
});

module.exports = router;
