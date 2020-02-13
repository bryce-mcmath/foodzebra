<template>
  <section id="menu">
    <div class="menu-header flex">Menu</div>
    <sui-menu class="sui-menu" :widths="4">
      <sui-menu-item @click="selectTab('all')" :active="isActive('all')"
        >All</sui-menu-item
      >
      <sui-menu-item
        @click="selectTab('appetizers')"
        :active="isActive('appetizers')"
        >Appetizers</sui-menu-item
      >
      <sui-menu-item @click="selectTab('mains')" :active="isActive('mains')"
        >Mains</sui-menu-item
      >
      <sui-menu-item @click="selectTab('drinks')" :active="isActive('drinks')"
        >Drinks</sui-menu-item
      >
    </sui-menu>
    <section class="menu-section flex">
      <h2>{{ tabSelected | capitalize }}</h2>
      <sui-card-group class="selection-container grid">
        <sui-card v-for="item in selectedMenu" :key="item.id">
          <div class="card-img-wrapper">
            <sui-image :src="item.img_url" class="card-img"></sui-image>
          </div>
          <sui-card-content>
            <sui-card-header>{{ item.name }}</sui-card-header>
            <sui-card-meta>{{ item.category | capitalize }}</sui-card-meta>
            <sui-card-description>{{ item.desc }}</sui-card-description>
          </sui-card-content>
          <sui-card-content extra>
            <div class="price">${{ item.price | priceProcess }}</div>
            <button class="ui button" @click="emitAddToCart(item)">
              Add to Cart
            </button>
          </sui-card-content>
        </sui-card>
      </sui-card-group>
    </section>
  </section>
</template>

<script>
import { getAllMenuItems } from '../../api/ajaxCalls';

export default {
  name: 'MenuItems',
  methods: {
    getItems: function() {
      setTimeout(() => {
        getAllMenuItems().then(res => {
          this.items = res;
        });
      }, 1500);
    },
    selectTab: function(tabClicked) {
      this.tabSelected = tabClicked;
    },
    isActive: function(tab) {
      return this.tabSelected === tab;
    },
    emitAddToCart: function(item) {
      this.toggleModal();
      this.$emit('addItem', item);
    },
    toggleModal() {
      this.modalOpen = !this.modalOpen;
    }
  },
  mounted() {
    this.getItems();
  },
  data: function() {
    return {
      items: [],
      appetizers: [],
      mains: [],
      drinks: [],
      tabSelected: 'all',
      modalOpen: false
    };
  },
  computed: {
    selectedMenu: function() {
      if (!this.items) return [];

      return this.items.filter(item => {
        if (this.tabSelected === 'all') return true;

        return item.category === this.tabSelected;
      });
    }
  },
  filters: {
    priceProcess: function(int) {
      if (!int) return '';
      return (int / 100).toFixed(2);
    },
    capitalize: function(str) {
      if (!str) return '';
      str = str.toString();
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }
};
</script>
