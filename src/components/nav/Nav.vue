<template>
  <div>
    <nav class="nav flex" v-bind:class="{ transparent: !isScrolled }">
      <ul class="nav-left flex">
        <li>
          <a class="noSelect" href="#menu" v-smooth-scroll>Menu</a>
        </li>
        <li>
          <a href="#" class="noSelect">Events</a>
        </li>
      </ul>
      <a href="/" class="noSelect brand flex">
        <img src="../../../public/foodzebralogo.png" alt="logo" />
        <span>food</span>zebra
      </a>
      <ul class="nav-right flex">
        <li>
          <a href="#footer" class="noSelect" v-smooth-scroll>Hours</a>
        </li>
        <li>
          <a href="#footer" class="noSelect" v-smooth-scroll>Contact</a>
        </li>
      </ul>
    </nav>
    <div class="noSelect cart flex" v-bind:class="{ 'cart-up': isScrolled }">
      <i class="fas fa-shopping-cart fa-2x"></i>
      <div class="count flex">
        <span>3</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nav',
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
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  data: function() {
    return {
      isScrolled: false
    };
  }
};
</script>
