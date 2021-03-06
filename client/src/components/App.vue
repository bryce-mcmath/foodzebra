<template>
	<div id="app">
		<Nav
			:itemsInCart="this.cart.items"
			:isLoggedIn="this.isLoggedIn"
			@logout="logout()"
			@openCartModal="setCartModal(true)"
			@openLogin="setLoginModal(true)"
			@openRegister="setRegisterModal(true)"
		></Nav>
		<Hero></Hero>
		<div id="content-container" class="content-container">
			<OperatorTab
				v-if="operatorTabValues.show"
				:operatorTab="operatorTabValues.tabSelected"
				@selectedOperatorTab="operatorTabClicked"
			></OperatorTab>
			<OrderItems
				:orderItemsUpdate="orderItemsUpdate"
				v-if="operatorTabValues.tabSelected === 'orders'"
				@openOrderModal="setOrderModal"
			></OrderItems>
			<MenuItems v-if="operatorTabValues.tabSelected === 'menu'" @addItem="addItemToCart"></MenuItems>
		</div>
		<MenuModal @closeModal="setMenuModal(false)" :modalOpen="menuModalOpen"></MenuModal>
		<RegisterModal
			@closeModal="setRegisterModal(false)"
			@registered="loginLogic()"
			:modalOpen="registerModalOpen"
		></RegisterModal>
		<LoginModal
			@closeModal="setLoginModal(false)"
			@loggedIn="loginLogic()"
			:modalOpen="loginModalOpen"
		></LoginModal>
		<OrderModal
			@closeModal="setOrderModal(false)"
			@acceptOrder="onAcceptOrder"
			@fulfillOrder="onFulfillOrder"
			:modalOpen="orderModalOpen"
			:order_id="current_order"
		></OrderModal>
		<CartModal
			@closeModal="setCartModal(false)"
			@placeOrder="onPlaceOrder"
			@clearCart="onClearCart"
			@openSuccessModal="setSuccessModal(true)"
			:modalOpen="cartModalOpen"
			:cart="cart"
		></CartModal>
		<SuccessModal @closeModal="setSuccessModal(false)" :modalOpen="successModalOpen"></SuccessModal>
		<Footer @openLogin="setLoginModal(true)"></Footer>
	</div>
</template>

<script>
import Nav from './nav/Nav.vue';
import Hero from './hero/Hero.vue';
import Footer from './footer/Footer.vue';
import MenuItems from './menu_items/MenuItems.vue';
import MenuModal from './menu_modal/MenuModal.vue';
import RegisterModal from './register_modal/RegisterModal.vue';
import LoginModal from './login_modal/LoginModal.vue';
import OrderModal from './order-modal/OrderModal.vue';
import CartModal from './cart_modal/CartModal.vue';
import SuccessModal from './success_modal/SuccessModal.vue';
import OperatorTab from './operator_tab/OperatorTab.vue';
import OrderItems from './order_items/OrderItems.vue';
import {
	validateSession,
	placeOrder,
	acceptOrder,
	fulfillOrder,
	logoutAjaxCall
} from '../api/ajaxCalls';

export default {
	name: 'app',
	components: {
		Nav,
		Hero,
		OperatorTab,
		OrderItems,
		MenuItems,
		MenuModal,
		RegisterModal,
		LoginModal,
		OrderModal,
		CartModal,
		SuccessModal,
		Footer
	},
	mounted() {
		this.loginLogic();
	},
	data() {
		return {
			isLoggedIn: false,
			cart: {
				items: [],
				mobile: '',
				customer_note: '',
				pickup_name: ''
			},
			menuModalOpen: false,
			registerModalOpen: false,
			loginModalOpen: false,
			orderModalOpen: false,
			orderItemsUpdate: false,
			cartModalOpen: false,
			successModalOpen: false,
			operatorTabValues: {
				show: false,
				tabSelected: 'menu'
			},
			current_order: ''
		};
	},
	methods: {
		addItemToCart: function(payload) {
			this.cart.items.push(payload);
			this.setMenuModal(true);
		},
		setMenuModal: function(status) {
			if (typeof status === 'boolean') {
				this.menuModalOpen = status;
			}
		},
		setRegisterModal: function(status) {
			if (typeof status === 'boolean') {
				this.registerModalOpen = status;
			}
		},
		setLoginModal: function(status) {
			if (typeof status === 'boolean') {
				this.loginModalOpen = status;
			}
		},
		setOrderModal: function(status, id) {
			if (id) {
				this.current_order = id;
			}
			if (typeof status === 'boolean') {
				this.orderModalOpen = status;
			}
		},
		setCartModal: function(status) {
			if (typeof status === 'boolean') {
				this.cartModalOpen = status;
			}
		},
		setSuccessModal: function(status) {
			if (typeof status === 'boolean') {
				this.successModalOpen = status;
			}
		},
		loginLogic: function() {
			console.log('loginLogic called');
			validateSession().then((role) => {
				console.log('Successfully validated');
				this.isLoggedIn = true;
				if (role === 'operator') {
					this.operatorTabValues.show = true;
					this.operatorTabValues.tabSelected = 'orders';
					let container = this.$el.querySelector('#content-container');
					container.scrollTop = container.scrollHeight;
				}
			});
		},
		logout: function() {
			logoutAjaxCall().then(() => {
				this.isLoggedIn = false;
				this.operatorTabValues.show = false;
				this.operatorTabValues.tabSelected = 'menu';
			});
		},
		operatorTabClicked: function(payload) {
			this.operatorTabValues.tabSelected = payload;
		},
		onAcceptOrder(id, estimate) {
			let action = 'accept';
			acceptOrder(id, action, estimate).then((response) => {
				this.orderItemsUpdate = action + 'ed';
			});
		},
		onFulfillOrder(id) {
			let action = 'fulfill';
			fulfillOrder(id, action).then((response) => {
				this.orderItemsUpdate = action + 'ed';
			});
		},
		onPlaceOrder(order) {
			if (this.cart.items.length) {
				const tmpOrder = { ...order, items: this.cart.items };
				placeOrder(tmpOrder);
				this.cart.items = [];
			}
		},
		onClearCart() {
			this.cart.items = [];
		}
	}
};
</script>
