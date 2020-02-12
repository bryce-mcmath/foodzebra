<template>
  <div id="app">
    <Nav :itemsInCart="this.cart.items"></Nav>
    <!-- if on / -->
    <Hero></Hero>
    <OperatorTab></OperatorTab>
    <!-- <OrderItems></OrderItems> -->
    <MenuItems @addItem="addItemToCard"></MenuItems>
    <!-- if on /orders as operator -->
    <!-- <Orders /> -->
    <MenuModal
      @closeModal="setMenuModal(false)"
      :modalOpen="menuModalOpen"
    ></MenuModal>
    <LoginModal
      @closeModal="setLoginModal(false)"
      @loggedIn="loginLogic()"
      :modalOpen="loginModalOpen"
    ></LoginModal>
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
import OperatorTab from './components/operator_tab/OperatorTab.vue';

export default {
  name: 'app',
  components: {
    Nav,
    Hero,
    OperatorTab,
    MenuItems,
    MenuModal,
    LoginModal,
    Footer
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
      loginModalOpen: false
    };
  },
  methods: {
    addItemToCard: function(payload) {
      this.cart.items.push(payload.id);
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
    loginLogic: function() {
      // TBD login ajax calls go here eventually
    }
  }
};
</script>

<style lang="scss">
@import './app.scss';
</style>
