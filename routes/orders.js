const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('You got /orders');
});

router.post('/', (req, res) => {
  res.send('You added an order');
});

router.get('/:id', (req, res) => {
  res.send('You got a specific order');
});

router.put('/:id', (req, res) => {
  res.send('You are updating a order');
});

router.delete('/:id', (req, res) => {
  res.send('You are deleting an order');
});

module.exports = router;
