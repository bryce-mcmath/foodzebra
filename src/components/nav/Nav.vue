<template>
  <div>
    <nav class="nav flex" v-bind:class="{ transparent: !isScrolled }">
      <ul class="nav-left flex">
        <li>
          <a shref="#menu">Menu</a>
        </li>
        <li>
          <a href="#">Events</a>
        </li>
      </ul>
      <a href="/" class="brand flex">
        <img src="../../../public/foodzebralogo.png" alt="logo" />
        <span>food</span>zebra
      </a>
      <ul class="nav-right flex">
        <li>
          <a href="#footer">Hours</a>
        </li>
        <li>
          <a href="#footer">Contact</a>
        </li>
      </ul>
      <div class="cart flex">
        <i class="fas fa-shopping-cart fa-2x"></i>
        <div class="count flex">
          <span>3</span>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Nav",
  methods: {
    handleScroll: function() {
      if (window.scrollY > 80) {
        this.isScrolled = true;
      } else {
        this.isScrolled = false;
      }
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  data: function() {
    return {
      isScrolled: false
    };
  }
};
</script>
