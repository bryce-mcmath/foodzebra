const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { getUserByEmail } = require('../api/queries');

router.post('/', (req, res) => {
  const { email, password } = req.body;
  getUserByEmail(email)
    .then(user => {
      const { password: hash, id } = user.rows[0];
      bcrypt.compare(password, hash, (err, result) => {
        if (err) {
          console.log('err in login: ', err);
        } else {
          if (result) {
            // set cookie, refresh page
            req.session.user_id = id;
            res.redirect('/');
          }
        }
      });
    })
    .catch(err => {
      console.log('db error: ', err);
    });
});

module.exports = router;
