const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  res.send('You posted to /login');
});

module.exports = router;
