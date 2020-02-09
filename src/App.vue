<template>
  <div id="app">
    <Nav></Nav>
  </div>
</template>

<script>
import Nav from "./components/nav/Nav.vue";

export default {
  name: "app",
  components: {
    Nav
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App!"
    };
  }
};
</script>

<style lang="css">
@import "./app.scss";

#app {
  color: #56b983;
}
</style>
