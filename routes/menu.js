const express = require("express");
const router = express.Router();
// const { getAllMenuItems } = require("../../api/queries.js");
const getAllMenuItems = function() {
  return null;
}; // dummy to prevent errors

// Routes: /

router.get("/", (req, res) => {
  getAllMenuItems()
    .then(function(result) {
      res.send(result);
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

router.get("/:id", (req, res) => {
  const id = req.params.id;

  if (typeof id === "string") {
    getAllMenuItems()
      .then(function(result) {
        res.send(result);
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
