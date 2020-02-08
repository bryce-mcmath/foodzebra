const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('You got /menu');
});

router.post('/', (req, res) => {
  res.send('You posted to /menu');
});

router.put('/:id', (req, res) => {
  res.send('You are updating a menu item');
});

router.delete('/:id', (req, res) => {
  res.send('You are deleting a menu item');
});

module.exports = router;
