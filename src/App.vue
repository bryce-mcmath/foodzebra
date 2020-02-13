<template>
  <div id="app">
    <Nav :itemsInCart="this.cart.items"></Nav>
    <!-- if on / -->
    <Hero></Hero>

    <div class="content-container" @click.once="loginLogic()">
      <OperatorTab
        v-if="operatorTabValues.show"
        :operatorTab="operatorTabValues.tabSelected"
        @selectedOperatorTab="operatorTabClicked"
      ></OperatorTab>
      <OrderItems
        v-if="operatorTabValues.tabSelected === 'orders'"
      ></OrderItems>
      <MenuItems
        v-if="operatorTabValues.tabSelected === 'menu'"
        @addItem="addItemToCard"
      ></MenuItems>
      <!-- if on /orders as operator -->
      <!-- <Orders /> -->
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
import OrderItems from './components/order_items/OrderItems.vue';

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
      loginModalOpen: false,
      operatorTabValues: {
        show: false,
        tabSelected: 'menu'
      }
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
      console.log('loginLogic');
      this.operatorTabValues.show = true;
      // TBD login ajax calls go here eventually
    },
    operatorTabClicked: function(payload) {
      this.operatorTabValues.tabSelected = payload;
    }
  }
};
</script>

<style lang="scss">
@import './app.scss';
.content-container {
  margin-top: 544px;
}
</style>
