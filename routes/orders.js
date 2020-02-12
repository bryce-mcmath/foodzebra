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
  getOrderItemByOrderId
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
              throw new Error('No rows in orders');
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
              throw new Error('No rows in orders');
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
              throw new Error('No rows in orders');
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
              throw new Error('No rows in orders');
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
  getUserById(user_id)
    .then(resolve => {
      const user = resolve.rows[0];
      if (user.role === 'customer' || user.role === 'operator') {
        const { pickup_name, customer_note, total_price } = req.body;
        if (pickup_name && total_price) {
          addOrder({ pickup_name, customer_note, total_price, user_id })
            .then(result => {
              if (result.rows[0]) {
                res.json(result.rows[0]);
              } else {
                throw new Error('Placed order not returned');
              }
            })
            .catch(err => {
              throw new Error('Error adding order: ', err);
            });
        } else {
          throw new Error('Pickup name and total price required');
        }
      } else {
        console.log(
          'Access denied. You are not logged in as a customer or operator'
        );
        res.status(403);
      }
    })
    .catch(err => {
      console.log('error getting user: ', err);
      res.status(400);
    });
});

router.get('/:id', (req, res) => {
  const user_id = req.session.user_id;
  getUserById(user_id)
    .then(resolve => {
      const user = resolve.rows[0];
      const id = req.params.id;
      if (user.role === 'operator' && id) {
        getOrderById(id)
          .then(result => {
            if (result.rows[0]) {
              res.json(result.rows[0]);
            } else {
              throw new Error('No order returned');
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
  getUserById(user_id)
    .then(resolve => {
      const user = resolve.rows[0];
      const id = req.params.id;
      if (user.role === 'operator' && id) {
        const { msg, estimate } = req.body;
        updateOrder(id, msg, estimate)
          .then(result => {
            if (result.rows[0]) {
              res.json(result.rows[0]);
            } else {
              throw new Error('No order returned');
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
      if (user.role === 'operator' && id) {
        deleteOrder(id)
          .then(result => {
            if (result.rows[0]) {
              res.json(result.rows[0]);
            } else {
              throw new Error('No order returned');
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
      if (user.role === 'operator' && id) {
        getOrderItemByOrderId(id)
          .then(result => {
            if (result.rows[0]) {
              res.json(result.rows);
            } else {
              throw new Error('No items returned');
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
