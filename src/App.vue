<template>
  <div id="app">
    <Nav :itemsInCart="this.cart.items"></Nav>
    <!-- if on / -->
    <Hero></Hero>
    <MenuItems @addItem="addItemToCard"></MenuItems>
    <!-- if on /orders as operator -->
    <!-- <Orders /> -->
    <MenuModal
      @closeMenuModal="closeMenuModal"
      :modalOpen="modalOpen"
    ></MenuModal>
    <Footer></Footer>
  </div>
</template>

<script>
import Nav from "./components/nav/Nav.vue";
import Hero from "./components/hero/Hero.vue";
import Footer from "./components/footer/Footer.vue";
import MenuItems from "./components/menu_items/MenuItems.vue";
import MenuModal from "./components/menu_modal/MenuModal.vue";

export default {
  name: "app",
  components: {
    Nav,
    Hero,
    MenuItems,
    MenuModal,
    Footer
  },
  data() {
    return {
      cart: {
        items: [],
        mobile: "",
        customer_note: "",
        pickup_name: ""
      },
      modalOpen: false
    };
  },
  methods: {
    addItemToCard: function(payload) {
      this.cart.items.push(payload.id);
      this.modalOpen = true;
      setTimeout(() => {
        this.modalOpen = false;
      }, 3000);
    },
    closeMenuModal: function() {
      this.modalOpen = false;
    }
  }
};
</script>

<style lang="scss">
@import "./app.scss";
</style>
