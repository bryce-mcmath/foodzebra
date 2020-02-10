const express = require('express');
const router = express.Router();

// Routes: /

router.get('/', (req, res) => {});

router.post('/', (req, res) => {
  res.send('You posted to /menu');
});

// Routes: /menu/:id params

router.get('/:id', (req, res) => {});

router.put('/:id', (req, res) => {
  res.send('You are updating a menu item');
});

router.delete('/:id', (req, res) => {
  res.send('You are deleting a menu item');
});

module.exports = router;
