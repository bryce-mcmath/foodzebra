<template>
  <div>
    <nav class="nav flex" v-bind:class="{ transparent: !isScrolled }">
      <ul class="nav-left flex">
        <li>
          <a href="#menu">Menu</a>
        </li>
        <li>
          <a href="#">Events</a>
        </li>
      </ul>
      <a href="/" class="brand">
        <img src="../../../public/foodzebrabrand.PNG" alt="foodzebra" />
      </a>
      <ul class="nav-right flex">
        <li>
          <a href="#footer">Hours</a>
        </li>
        <li>
          <a href="#footer">Contact</a>
        </li>
      </ul>
    </nav>
    <div class="nav-underlay"></div>
  </div>
</template>

<script>
module.exports = {
  methods: {
    handleScroll: function() {
      if (window.scrollY > 120) {
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
