const express = require('express');
const router = express.Router();

router.delete('/', (req, res) => {
  res.send('You made a delete request to /logout');
});

module.exports = router;
