<template>
  <section class="menu-items flex">
    <div class="menu-header flex">Menu</div>
    <div class="menu-separator"></div>
    <section class="menu-section flex">
      <h2>Appetizers</h2>
      <sui-card-group class="appetizer-container grid">
        <sui-card v-for="appetizer in appetizers" :key="appetizer.id">
          <sui-image :src="appetizer.img_url"></sui-image>
          <sui-card-content>
            <sui-card-header>{{appetizer.name}}</sui-card-header>
            <sui-card-meta>Appetizer</sui-card-meta>
            <sui-card-description>{{appetizer.desc}}</sui-card-description>
          </sui-card-content>
          <sui-card-content extra>
            <div class="price">${{appetizer.price | priceProcess}}</div>
            <button class="ui button">Add to Cart</button>
          </sui-card-content>
        </sui-card>
      </sui-card-group>
    </section>
    <div class="menu-separator"></div>
    <section class="menu-section flex">
      <h2>Mains</h2>
      <sui-card-group class="main-container grid">
        <sui-card v-for="main in mains" :key="main.id">
          <sui-image :src="main.img_url"></sui-image>
          <sui-card-content>
            <sui-card-header>{{main.name}}</sui-card-header>
            <sui-card-meta>Appetizer</sui-card-meta>
            <sui-card-description>{{main.desc}}</sui-card-description>
          </sui-card-content>
          <sui-card-content extra>
            <div class="price">${{main.price | priceProcess}}</div>
            <button class="ui button">Add to Cart</button>
          </sui-card-content>
        </sui-card>
      </sui-card-group>
    </section>
    <div class="menu-separator"></div>
    <section class="menu-section flex">
      <h2>Drinks</h2>
      <sui-card-group class="drink-container grid">
        <sui-card v-for="drink in drinks" :key="drink.id">
          <sui-image :src="drink.img_url"></sui-image>
          <sui-card-content>
            <sui-card-header>{{drink.name}}</sui-card-header>
            <sui-card-meta>Appetizer</sui-card-meta>
            <sui-card-description>{{drink.desc}}</sui-card-description>
          </sui-card-content>
          <sui-card-content extra>
            <div class="price">${{drink.price | priceProcess}}</div>
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
        this.appetizers = [
          ...res.filter(item => item.category === "appetizer")
        ];
        this.mains = [...res.filter(item => item.category === "main")];
        this.drinks = [...res.filter(item => item.category === "drink")];
      });
    }
  },
  created() {
    this.getItems();
  },
  data: function() {
    return {
      items: [],
      appetizers: [],
      mains: [],
      drinks: []
    };
  },
  filters: {
    priceProcess: function(p) {
      return (p / 100).toFixed(2);
    }
  }
};
</script>
