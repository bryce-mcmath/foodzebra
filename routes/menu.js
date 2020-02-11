const express = require('express');
const router = express.Router();
const {
  getAllMenuItem,
  getMenuItemById,
  getUserById
} = require('../api/queries.js');
const { addMenuItem } = require('../api/inserts.js');

// Routes: /

// Queries DB for all menu items. Takes no args, returns array w/ objs inside
router.get('/', (req, res) => {
  getAllMenuItem()
    .then(result => {
      if (result.rows) {
        res.send(result.rows);
      } else {
        throw new Error('No rows in menu items');
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400);
    });
});

// If logged in as operator and valid info is sent, adds item to db and returns json object of db return value
router.post('/', (req, res) => {
  getUserById(req.session.user_id)
    .then(result => {
      const user = result.rows[0];
      if (user.role === 'operator') {
        console.log('body: ', req.body);
        const { name, desc, price, img_url, category } = req.body;
        if (name && desc && price && img_url && category) {
          console.log('name is: ', name);
          console.log('desc is: ', desc);
          console.log('price is: ', price);
          console.log('img_url is: ', img_url);
          console.log('category is: ', category);

          addMenuItem({ name, desc, price, img_url, category })
            .then(item => {
              res.json(item.rows[0]);
            })
            .catch(err => {
              console.log('error adding item: ', err);
            });
        } else {
          console.log('Incomplete order');
          res.send(400);
        }
      } else {
        console.log('Access denied. You are not logged in as an operator.');
        res.status(403);
      }
    })
    .catch(err => {
      console.log('error getting user: ', err);
    });
});

// Routes: /menu/:id params
// Queries DB for a menu item. Takes one id arg, returns array w/ obj inside
router.get('/:id', (req, res) => {
  const id = req.params.id;

  if (id) {
    getMenuItemById(id)
      .then(result => {
        res.json(result.rows[0]);
      })
      .catch(err => {
        console.log(err);
        res.status(400);
      });
  } else {
    res.status(400);
  }
});

router.put('/:id', (req, res) => {
  res.send('You are updating a menu item');
});

router.delete('/:id', (req, res) => {});

module.exports = router;
