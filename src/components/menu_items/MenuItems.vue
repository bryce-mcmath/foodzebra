<template>
  <section class="menu-items">
    <div class="menu-header flex">Menu</div>
    <div class="menu-separator"></div>
    <sui-menu class="fl-row" :widths="4">
      <sui-menu-item @click="selectTab('all')" :active="isActive('all')"
        >All</sui-menu-item
      >
      <sui-menu-item
        @click="selectTab('appetizer')"
        :active="isActive('appetizer')"
        >Appetizers</sui-menu-item
      >
      <sui-menu-item @click="selectTab('main')" :active="isActive('main')"
        >Mains</sui-menu-item
      >
      <sui-menu-item @click="selectTab('drink')" :active="isActive('drink')"
        >Drinks</sui-menu-item
      >
    </sui-menu>
    <section class="menu-section flex">
      <h2>{{ tabSelected | capitalize }}</h2>
      <sui-card-group class="appetizer-container grid">
        <sui-card v-for="item in selectedMenu" :key="item.id">
          <sui-image :src="item.img_url"></sui-image>
          <sui-card-content>
            <sui-card-header>{{ item.name }}</sui-card-header>
            <sui-card-meta>All</sui-card-meta>
            <sui-card-description>{{ item.desc }}</sui-card-description>
          </sui-card-content>
          <sui-card-content extra>
            <div class="price">${{ item.price | priceProcess }}</div>
            <button class="ui button">Add to Cart</button>
          </sui-card-content>
        </sui-card>
      </sui-card-group>
    </section>
  </section>
</template>

<script>
import { getAllMenuItems } from "../../api/ajaxCalls";

export default {
  name: "MenuItems",
  methods: {
    getItems: function() {
      getAllMenuItems().then(res => {
        this.items = res;
      });
    },
    selectTab: function(tabClicked) {
      this.tabSelected = tabClicked;
    },
    isActive: function(tab) {
      return this.tabSelected === tab;
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
      tabSelected: "all"
    };
  },
  computed: {
    selectedMenu: function() {
      if (!this.items) return [];

      return this.items.filter(item => {
        if (this.tabSelected === "all") return true;

        return item.category === this.tabSelected;
      });
    }
  },
  filters: {
    priceProcess: function(p) {
      if (!p) return "nope";
      return (p / 100).toFixed(2);
    },
    capitalize: function(value) {
      if (!value) return "what";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>
