<template>
  <div id="app">
    <Nav
      :itemsInCart="this.cart.items"
      @openCartModal="setCartModal(true)"
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
      <MenuItems
        v-if="operatorTabValues.tabSelected === 'menu'"
        @addItem="addItemToCart"
      ></MenuItems>
    </div>
    <MenuModal
      @closeModal="setMenuModal(false)"
      :modalOpen="menuModalOpen"
    ></MenuModal>
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
    <SuccessModal
      @closeModal="setSuccessModal(false)"
      :modalOpen="successModalOpen"
    ></SuccessModal>
    <Footer @openLogin="setLoginModal(true)"></Footer>
  </div>
</template>

<script>
import Nav from './components/nav/Nav.vue';
import Hero from './components/hero/Hero.vue';
import Footer from './components/footer/Footer.vue';
import MenuItems from './components/menu_items/MenuItems.vue';
import MenuModal from './components/menu_modal/MenuModal.vue';
import LoginModal from './components/login_modal/LoginModal.vue';
import OrderModal from './components/order-modal/OrderModal.vue';
import CartModal from './components/cart_modal/CartModal.vue';
import SuccessModal from './components/success_modal/SuccessModal.vue';
import OperatorTab from './components/operator_tab/OperatorTab.vue';
import OrderItems from './components/order_items/OrderItems.vue';
import {
  validateSession,
  placeOrder,
  acceptOrder,
  fulfillOrder
} from './api/ajaxCalls';

export default {
  name: 'app',
  components: {
    Nav,
    Hero,
    OperatorTab,
    OrderItems,
    MenuItems,
    MenuModal,
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
      cart: {
        items: [],
        mobile: '',
        customer_note: '',
        pickup_name: ''
      },
      menuModalOpen: false,
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
      setTimeout(() => {
        this.setMenuModal(false);
      }, 3000);
    },
    setMenuModal: function(status) {
      if (typeof status === 'boolean') {
        this.menuModalOpen = status;
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
      validateSession().then(response => {
        if (response.data === 'operator') {
          this.operatorTabValues.show = true;
          this.operatorTabValues.tabSelected = 'orders';
          let container = this.$el.querySelector('#content-container');
          container.scrollTop = container.scrollHeight;
        }
      });
    },
    operatorTabClicked: function(payload) {
      this.operatorTabValues.tabSelected = payload;
    },
    onAcceptOrder(id, estimate) {
      let action = 'accept';
      acceptOrder(id, action, estimate)
        .then(response => {
          this.orderItemsUpdate = action + 'ed';
        })
        .catch(err => {
          console.log('Component err:', err);
        });
    },
    onFulfillOrder(id) {
      let action = 'fulfill';
      fulfillOrder(id, action)
        .then(response => {
          this.orderItemsUpdate = action + 'ed';
        })
        .catch(err => {
          console.log('Component err:', err);
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
