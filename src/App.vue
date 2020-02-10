<template>
  <div id="app">
    <Nav></Nav>
    <!-- if on / -->
    <Hero></Hero>
    <!-- <Menu /> -->
    <!-- if on /orders as operator -->
    <!-- <Orders /> -->
    <!-- <Footer />  -->
  </div>
</template>

<script>
import Nav from "./components/nav/Nav.vue";
import Hero from "./components/hero/Hero.vue";

export default {
  name: "app",
  components: {
    Nav,
    Hero
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
