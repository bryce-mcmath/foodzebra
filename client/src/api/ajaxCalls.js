import axios from 'axios';

module.exports = {
	loginAjaxCall: (email, password) => {
		return axios
			.post(`/login`, { email, password })
			.then((response) => {
				return response;
			})
			.catch((err) => {
				if (err.response.status !== 401) {
					console.error('AJAX error logging in:', err);
				}
				return err.response;
			});
	},
	validateSession: () => {
		return axios
			.get(`/login`)
			.then((response) => {
				return response.data;
			})
			.catch((err) => {
				if (err.response.status !== 401) {
					console.error('AJAX error validating session:', err);
				}
				return err.response;
			});
	},
	getAllMenuItems: () => {
		return axios
			.get('/menu')
			.then((response) => response.data)
			.catch((err) => {
				console.error('AJAX error getting menu items:', err);
				return [];
			});
	},
	getMenuItems: (id) => {
		return axios
			.get(`/menu/${id}`)
			.then((response) => response.data)
			.catch((err) => {
				console.error('AJAX error getting menu item:', err);
				return [];
			});
	},
	getAllOrderNew: () => {
		return axios
			.get('/orders/new')
			.then((response) => response.data)
			.catch((err) => {
				console.error('AJAX error getting new orders:', err);
				return [];
			});
	},
	getAllOrderAccepted: () => {
		return axios
			.get('/orders/accepted')
			.then((response) => response.data)
			.catch((err) => {
				console.error('AJAX error getting accepted orders:', err);
				return [];
			});
	},
	getAllOrderFulfilled: () => {
		return axios
			.get('/orders/fulfilled')
			.then((response) => response.data)
			.catch((err) => {
				console.error('AJAX error getting fulfilled orders:', err);
				return [];
			});
	},
	getAllOrder: () => {
		return axios
			.get('/orders')
			.then((response) => response.data)
			.catch((err) => {
				console.error('AJAX error getting all orders:', err);
				return [];
			});
	},
	getOrderItemByOrderId: (id) => {
		if (!id) return Promise.reject('No id entered');

		return axios
			.get(`/orders/${id}/items`)
			.then((response) => {
				return response.data;
			})
			.catch((err) => {
				console.error('AJAX error getting order by id:', err.response);
				return [];
			});
	},
	placeOrder: (order) => {
		return axios
			.post('/orders', order)
			.then((response) => response.data)
			.catch((err) => {
				console.error('AJAX error placing new order:', err);
				return [];
			});
	},
	acceptOrder: (id, msg, estimate = '') => {
		return axios
			.put(`/orders/${id}`, { msg, estimate })
			.then((response) => response.data)
			.catch((err) => {
				console.error('AJAX error accepting new order:', err.data);
				return [];
			});
	},
	fulfillOrder: (id, msg, estimate = '') => {
		return axios
			.put(`/orders/${id}`, { msg, estimate })
			.then((response) => response.data)
			.catch((err) => {
				console.error('AJAX error fulfilling order:', err);
				return [];
			});
	}

	/* STRETCH
    - delete order
    - add menu item
    - update menu item
    - delete menu item
    - register user
    - logout user
  */
};
