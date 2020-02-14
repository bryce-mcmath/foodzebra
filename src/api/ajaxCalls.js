import axios from 'axios';

module.exports = {
  getAllMenuItems: () => {
    return axios
      .get('/menu')
      .then(response => response.data)
      .catch(err => {
        console.log('ajaxCalls error', err);
        return [];
      });
  },
  getMenuItems: id => {
    return axios
      .get(`/menu/${id}`)
      .then(response => response.data)
      .catch(err => {
        console.log('ajaxCalls error', err);
        return [];
      });
  },
  loginAjaxCall: (email = '', password = '') => {
    return axios
      .post(`/login`, { email, password })
      .then(response => {
        return response;
      })
      .catch(err => {
        if (err.response.status !== 401) {
          console.log('ajaxCalls error', err);
        }
        return err.response;
      });
  },
  validateSession: () => {
    return axios
      .get(`/login`)
      .then(response => {
        return response;
      })
      .catch(err => {
        if (err.response.status !== 401) {
          console.log('ajaxCalls error', err);
        }
        return err.response;
      });
  },
  getAllOrderNew: () => {
    return axios
      .get('/orders/new')
      .then(response => response.data)
      .catch(err => {
        console.log('ajaxCalls error', err);
        return [];
      });
  },
  getAllOrderAccepted: () => {
    return axios
      .get('/orders/accepted')
      .then(response => response.data)
      .catch(err => {
        console.log('ajaxCalls error', err);
        return [];
      });
  },
  getAllOrderFulfilled: () => {
    return axios
      .get('/orders/fulfilled')
      .then(response => response.data)
      .catch(err => {
        console.log('ajaxCalls error', err);
        return [];
      });
  },
  getAllOrder: () => {
    return axios
      .get('/orders')
      .then(response => response.data)
      .catch(err => {
        console.log('ajaxCalls error', err);
        return [];
      });
  },
  getOrderItemByOrderId: id => {
    if (!id) {
      return Promise.reject('No id entered');
    }
    return axios
      .get(`/orders/${id}/items`)
      .then(response => {
        return response.data;
      })
      .catch(err => {
        console.log('ajaxCalls error', err.response);
        return [];
      });
  },
  placeOrder: order => {
    return axios
      .post('/orders', order)
      .then(response => response.data)
      .catch(err => {
        console.log('ajaxCalls error', err);
        return [];
      });
  }
};
