const express = require('express');
const router = express.Router();
const twilioAPI = require('../api/twilio_api');
const {
  getUserById,
  getAllOrder,
  getAllOrderNew,
  getAllOrderAccepted,
  getAllOrderFulfilled,
  getOrderById,
  getOrderByPickupName,
  getOrderItemByOrderId,
  getMobileByOrderId
} = require('../db/queries');
const {
  addOrder,
  updateOrder,
  deleteOrder,
  addOrderItem
} = require('../db/inserts');

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
  if (pickup_name && total_price) {
    addOrder(
      pickup_name,
      total_price,
      customer_note,
      mobile.toString(),
      user_id
    )
      .then(result => {
        if (result.rows) {
          const order_id = result.rows[0].id;
          for (let item of items) {
            const menu_item_id = item.id;
            addOrderItem(order_id, menu_item_id)
              .then(ordItem => {
                res.status(200);
              })
              .catch(err => {
                console.error('Error adding order items: ', err);
                res.status(500);
              });
          }
          const customerMessage = `Your order (#${order_id}) has been placed! You will be notified when it has been accepted.`;
          twilioAPI.sendSMS(mobile, customerMessage, response => {
            if (response.error) {
              console.log('Err in POST: /Orders', response.error);
              res.status(500);
            }
          });
          const restaurantMessage = `A new order has been placed by ${pickup_name}`;
          twilioAPI.sendSMS('2508968729', restaurantMessage, response => {
            if (response.error) {
              console.log('Err in POST: /Orders', response.error);
              res.status(500);
            }
          });
          res.json(result.rows);
        } else {
          res.json([]);
        }
      })
      .catch(err => {
        console.error('Error adding order: ', err);
        res.status(500);
      });
  } else {
    console.error('Pickup name and price required: ', err);
    res.status(400);
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
            console.error('Error getting order: ', err);
            res.status(500);
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
      if (user.role === 'operator') {
        updateOrder(id, req.body.msg, req.body.estimate)
          .then(result => {
            if (result.rows) {
              getMobileByOrderId(id).then(mobres => {
                if (req.body.msg && req.body.msg === 'accept') {
                  const customerMessage = `Your order has been accepted! It should be ready in about ${req.body.estimate} minutes. See you soon!`;
                  twilioAPI.sendSMS(
                    mobres.rows[0].mobile,
                    customerMessage,
                    response => {
                      if (response.error) {
                        console.log('Err in PUT: /Orders', response.error);
                        res.status(500);
                      }
                    }
                  );
                } else if (req.body.msg && req.body.msg === 'fulfill') {
                  const customerMessage = `Your order is ready for pickup! Thank you for using FoodZebra 🦓`;
                  twilioAPI.sendSMS(
                    mobres.rows[0].mobile,
                    customerMessage,
                    response => {
                      if (response.error) {
                        console.log('Err in PUT: /Orders', response.error);
                        res.status(500);
                      }
                    }
                  );
                }
              });

              res.json(result.rows);
            } else {
              res.json([]);
            }
          })
          .catch(err => {
            console.error('Error updating order: ', err);
            res.status(500);
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
            console.error('Error deleting order: ', err);
            res.status(500);
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
            console.error('Error getting order items: ', err);
            res.status(500);
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
