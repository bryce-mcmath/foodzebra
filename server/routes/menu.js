const express = require('express');
const router = express.Router();

const {
  getAllMenuItem,
  getMenuItemById,
  getUserById
} = require('../db/queries.js');
const {
  addMenuItem,
  updateMenuItem,
  deleteMenuItem
} = require('../db/inserts.js');

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

// If logged in as operator and valid info is sent, adds item to db and returns json object of newly created item
router.post('/', (req, res) => {
  getUserById(req.session.user_id)
    .then(result => {
      const user = result.rows[0];
      if (user.role === 'operator') {
        const { name, desc, price, img_url, category } = req.body;
        if (name && price && typeof price === 'number') {
          addMenuItem(name, price, desc, img_url, category)
            .then(item => {
              res.json(item.rows);
            })
            .catch(err => {
              console.log('error adding menu item: ', err);
            });
        } else {
          console.log('Name and price required');
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
// Queries DB for a menu item. Takes one id arg, returns JSON of menu item
router.get('/:id', (req, res) => {
  const id = req.params.id;

  if (id) {
    getMenuItemById(id)
      .then(result => {
        res.json(result.rows);
      })
      .catch(err => {
        console.log(err);
        res.status(400);
      });
  } else {
    res.status(400);
  }
});

// update menu item
router.put('/:id', (req, res) => {
  getUserById(req.session.user_id)
    .then(result => {
      const user = result.rows[0];
      if (user.role === 'operator') {
        const { name, desc, price, img_url, category } = req.body;
        const id = req.params.id;
        if (id && name && price) {
          updateMenuItem(id, name, price, desc, img_url, category)
            .then(item => {
              res.json(item.rows);
            })
            .catch(err => {
              console.log('error updating item: ', err);
            });
        } else {
          console.log('Incomplete item options');
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

router.delete('/:id', (req, res) => {
  getUserById(req.session.user_id)
    .then(result => {
      const user = result.rows[0];
      if (user.role === 'operator') {
        const id = req.params.id;
        deleteMenuItem(id)
          .then(item => {
            res.json(item.rows);
          })
          .catch(err => {
            console.log('error adding item: ', err);
          });
      } else {
        console.log('Access denied. You are not logged in as an operator.');
        res.status(403);
      }
    })
    .catch(err => {
      console.log('error getting user: ', err);
    });
});

module.exports = router;
