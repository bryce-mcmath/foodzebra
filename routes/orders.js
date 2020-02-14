const express = require('express');
const router = express.Router();
const {
  getUserById,
  getAllOrder,
  getAllOrderNew,
  getAllOrderAccepted,
  getAllOrderFulfilled,
  getOrderById,
  getOrderByPickupName,
  getOrderItemByOrderId,
  addOrderItem
} = require('../api/queries');
const { addOrder, updateOrder, deleteOrder } = require('../api/inserts');

// Get all orders
router.get('/', (req, res) => {
  getUserById(req.session.user_id)
    .then(resolve => {
      const user = resolve.rows[0];
      if (user.role === 'operator') {
        getAllOrder()
          .then(result => {
            if (result.rows) {
              res.json(result.rows);
            } else {
              res.json([]);
            }
          })
          .catch(err => {
            throw new Error('Error getting all orders: ', err);
          });
      } else {
        console.log('Access denied. You are not logged in as an operator.');
        res.status(403);
      }
    })
    .catch(err => {
      console.log('error getting user: ', err);
      res.status(400);
    });
});

router.get('/new', (req, res) => {
  getUserById(req.session.user_id)
    .then(resolve => {
      const user = resolve.rows[0];
      if (user.role === 'operator') {
        getAllOrderNew()
          .then(result => {
            if (result.rows) {
              res.json(result.rows);
            } else {
              res.json([]);
            }
          })
          .catch(err => {
            throw new Error('Error getting all new orders: ', err);
          });
      } else {
        console.log('Access denied. You are not logged in as an operator.');
        res.status(403);
      }
    })
    .catch(err => {
      console.log('error getting user: ', err);
      res.status(400);
    });
});

router.get('/accepted', (req, res) => {
  getUserById(req.session.user_id)
    .then(resolve => {
      const user = resolve.rows[0];
      if (user.role === 'operator') {
        getAllOrderAccepted()
          .then(result => {
            if (result.rows) {
              res.json(result.rows);
            } else {
              res.json([]);
            }
          })
          .catch(err => {
            throw new Error('Error getting all accepted orders: ', err);
          });
      } else {
        console.log('Access denied. You are not logged in as an operator.');
        res.status(403);
      }
    })
    .catch(err => {
      console.log('error getting user: ', err);
      res.status(400);
    });
});

router.get('/fulfilled', (req, res) => {
  getUserById(req.session.user_id)
    .then(resolve => {
      const user = resolve.rows[0];
      if (user.role === 'operator') {
        getAllOrderFulfilled()
          .then(result => {
            if (result.rows) {
              res.json(result.rows);
            } else {
              res.json([]);
            }
          })
          .catch(err => {
            throw new Error('Error getting all fulfilled orders: ', err);
          });
      } else {
        console.log('Access denied. You are not logged in as an operator.');
        res.status(403);
      }
    })
    .catch(err => {
      console.log('error getting user: ', err);
      res.status(400);
    });
});

router.post('/', (req, res) => {
  const user_id = req.session.user_id;
  const { pickup_name, customer_note, total_price, mobile, items } = req.body;
  for (let item of items) {
  }
  if (pickup_name && total_price) {
    addOrder(pickup_name, total_price, customer_note, mobile, user_id)
      .then(result => {
        if (result.rows) {
          const order_id = result.rows[0].id;
          for (let item of items) {
            const menu_item_id = item.id;
            addOrderItem(order_id, menu_item_id)
              .then(ordItem => {
                console.log(ordItem.rows);
              })
              .catch(err => {
                console.error(err);
              });
          }
          res.json(result.rows);
        } else {
          res.json([]);
        }
      })
      .catch(err => {
        throw new Error('Error adding order: ', err);
      });
  } else {
    throw new Error('Pickup name and total price required');
  }
});

router.get('/:id', (req, res) => {
  const user_id = req.session.user_id;
  getUserById(user_id)
    .then(resolve => {
      const user = resolve.rows[0];
      const id = req.params.id;
      if (user.role === 'operator') {
        getOrderById(id)
          .then(result => {
            if (result.rows) {
              res.json(result.rows);
            } else {
              res.json([]);
            }
          })
          .catch(err => {
            throw new Error('Error getting order: ', err);
          });
      } else {
        console.log('Access denied. You are not logged in as an operator');
        res.status(403);
      }
    })
    .catch(err => {
      console.log('error getting user: ', err);
      res.status(400);
    });
});

router.put('/:id', (req, res) => {
  const user_id = req.session.user_id;
  console.log('PUT: /orders/:id,', req.params.id, req.body.msg);
  getUserById(user_id)
    .then(resolve => {
      const user = resolve.rows[0];
      const id = req.params.id;
      if (user.role === 'operator') {
        updateOrder(id, req.body.msg, req.body.estimate)
          .then(result => {
            if (result.rows) {
              res.json(result.rows);
            } else {
              res.json([]);
            }
          })
          .catch(err => {
            throw new Error('Error updating order: ', err);
          });
      } else {
        console.log('Access denied. You are not logged in as an operator');
        res.status(403);
      }
    })
    .catch(err => {
      console.log('error getting user: ', err);
      res.status(400);
    });
});

router.delete('/:id', (req, res) => {
  const user_id = req.session.user_id;
  getUserById(user_id)
    .then(resolve => {
      const user = resolve.rows[0];
      const id = req.params.id;
      if (user.role === 'operator') {
        deleteOrder(id)
          .then(result => {
            if (result.rows) {
              res.json(result.rows);
            } else {
              res.json([]);
            }
          })
          .catch(err => {
            throw new Error('Error deleting order: ', err);
          });
      } else {
        console.log('Access denied. You are not logged in as an operator');
        res.status(403);
      }
    })
    .catch(err => {
      console.log('error getting user: ', err);
      res.status(400);
    });
});

router.get('/:id/items', (req, res) => {
  const user_id = req.session.user_id;
  getUserById(user_id)
    .then(resolve => {
      const user = resolve.rows[0];
      const id = req.params.id;
      if (user.role === 'operator') {
        getOrderItemByOrderId(id)
          .then(result => {
            if (result.rows) {
              res.json(result.rows);
            } else {
              res.json([]);
            }
          })
          .catch(err => {
            throw new Error('Error getting order items: ', err);
          });
      } else {
        console.log('Access denied. You are not logged in as an operator');
        res.status(403);
      }
    })
    .catch(err => {
      console.log('error getting user: ', err);
      res.status(400);
    });
});

module.exports = router;
