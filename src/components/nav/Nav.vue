<template>
  <div>
    <nav class="nav flex" v-bind:class="{ transparent: !isScrolled }">
      <ul class="nav-left hide-sm flex">
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
      <ul class="nav-right flex hide-sm">
        <li>
          <a href="#footer" class="noSelect" v-smooth-scroll>Hours</a>
        </li>
        <li>
          <a href="#footer" class="noSelect" v-smooth-scroll>Contact</a>
        </li>
      </ul>
      <div class="hamburger show-sm">
        <label for="btn-hamb" class="showmenu">&#9776;</label>
        <input type="checkbox" id="btn-hamb" />
        <ul
          class="navigation__list"
          id="showmenu"
          v-bind:class="{ transparent: !isScrolled }"
        >
          <li><a href="#menu" class="noSelect fwb" v-smooth-scroll>Menu</a></li>
          <li>
            <a href="#footer" class="noSelect fwb" v-smooth-scroll>Contact</a>
          </li>
          <li>
            <a href="#"
              ><div class="noSelect hamb-cart flex">
                <i class="fas fa-shopping-cart fa-2x"></i>
                <div v-if="itemsNumber" class="count flex fwb">
                  <span>{{ itemsNumber }}</span>
                </div>
              </div></a
            >
          </li>
        </ul>
      </div>
    </nav>
    <div
      class="noSelect cart hide-sm flex"
      v-bind:class="{ 'cart-up': isScrolled }"
    >
      <i class="fas fa-shopping-cart fa-2x"></i>
      <div v-if="itemsNumber" class="count flex fwb">
        <span>{{ itemsNumber }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  props: {
    itemsInCart: {
      type: Array
    }
  },
  methods: {
    handleScroll: function() {
      if (window.scrollY > 80) {
        this.isScrolled = true;
      } else {
        this.isScrolled = false;
      }
    },
    handleCheck: function() {
      this.isChecked = !this.isChecked;
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
      isScrolled: false,
      isChecked: false
    };
  },
  computed: {
    itemsNumber: function() {
      return this.itemsInCart.length;
    }
  }
};
</script>
