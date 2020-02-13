const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { getUserByEmail, getUserById } = require('../api/queries');

//
router.get('/', (req, res) => {
  const notValid = () => null;

  if (req.session.user_id) {
    getUserById(req.session.user_id)
      .then(response => {
        console.log(response.rows);
        if (response.rows[0].role === 'operator') res.send('valid');
        else notValid();
      })
      .catch(err => {
        notValid();
      });
  } else {
    notValid();
  }
});

router.post('/', (req, res) => {
  const invalidCredentials = () => {
    res.status(401).send('Wrong username or password');
  };
  const { email = '', password = '' } = req.body;

  if (email && password) {
    getUserByEmail(email)
      .then(user => {
        if (user.rows.length) {
          const { password: hash, id } = user.rows[0];
          bcrypt.compare(password, hash, (err, result) => {
            if (!err) {
              if (result) {
                // set cookie, refresh page
                req.session.user_id = id;
                res.send({ status: 200 });
              } else {
                invalidCredentials();
              }
            } else {
              console.log('bcrypt err: ', err);
              invalidCredentials();
            }
          });
        } else {
          invalidCredentials();
        }
      })
      .catch(err => {
        console.log('db error: ', err);
        invalidCredentials();
      });
  } else {
    invalidCredentials();
  }
});

module.exports = router;
