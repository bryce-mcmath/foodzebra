<template>
  <div id="app">
    <Nav></Nav>
    <div style="height: 300vh"><div>
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
    return {};
  }
};
</script>

<style lang="scss">
@import "./app.scss";
</style>
