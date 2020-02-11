<template>
  <div id="app">
    <Nav></Nav>
    <!-- if on / -->
    <Hero></Hero>
    <MenuItems></MenuItems>
    <!-- if on /orders as operator -->
    <!-- <Orders /> -->
    <Footer></Footer>
  </div>
</template>

<script>
import Nav from "./components/nav/Nav.vue";
import Hero from "./components/hero/Hero.vue";
import Footer from "./components/footer/Footer.vue";
import MenuItems from "./components/menu_items/MenuItems.vue";

export default {
  name: "app",
  components: {
    Nav,
    Hero,
    MenuItems,
    Footer
  },
  data() {
    return {
      cart: {
        items: [],
        mobile: "",
        customer_note: "",
        pickup_name: ""
      }
    };
  }
};
</script>

<style lang="scss">
@import "./app.scss";
</style>
