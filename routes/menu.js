const express = require("express");
const router = express.Router();
const dummyMenu = require("../src/dummyData/menuItems");

// Routes: /

router.get("/", (req, res) => {
  res.send(dummyMenu);
});

router.post("/", (req, res) => {
  res.send("You posted to /menu");
});

// Routes: /menu/:id params

router.get("/:id", (req, res) => {
  const id = req.params.id;
  let returnData = null;

  if (typeof id === "string") {
    for (let i = 0; i < dummyMenu.length; i++) {
      if (dummyMenu[i].id === id) {
        returnData = dummyMenu[i];
      }
    }

    res.send(returnData);
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
