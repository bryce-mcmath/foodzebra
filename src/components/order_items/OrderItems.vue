<template>
  <section id="menu">
    <div class="menu-header flex">Orders</div>
    <div class="menu-separator"></div>
    <sui-menu class="sui-menu" :widths="4">
      <sui-menu-item @click="selectTab('new')" :active="isActive('new')"
        >New</sui-menu-item
      >
      <sui-menu-item
        @click="selectTab('accepted')"
        :active="isActive('accepted')"
        >Accepted</sui-menu-item
      >
      <sui-menu-item
        @click="selectTab('fulfilled')"
        :active="isActive('fulfilled')"
        >Fulfilled</sui-menu-item
      >
      <sui-menu-item @click="selectTab('all')" :active="isActive('all')"
        >All</sui-menu-item
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
  name: 'OrderItems',
  methods: {
    getItems: function() {
      console.log('get items');
    },
    selectTab: function(tabClicked) {
      this.tabSelected = tabClicked;
    },
    isActive: function(tab) {
      return this.tabSelected === tab;
    }
  },
  mounted() {
    console.log('OrderItems Mounted');
  },
  data: function() {
    return {
      items: [],
      tabSelected: 'new'
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
    priceProcess: function(input) {
      if (!input) return 'nope';
      return (input / 100).toFixed(2);
    },
    capitalize: function(input) {
      if (!input) return 'what';
      input = input.toString();
      return input.charAt(0).toUpperCase() + input.slice(1);
    }
  }
};
</script>
