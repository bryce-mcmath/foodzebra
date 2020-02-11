<template>
  <section class="menu-items flex">
    <div class="menu-header flex">Menu</div>
    <div class="menu-separator"></div>
    <section class="menu-section flex">
      <h2>Appetizers</h2>
      <sui-card-group class="appetizer-container grid">
        <sui-card>
          <sui-image src="https://images.unsplash.com/photo-1473093226795-af9932fe5856"></sui-image>
          <sui-card-content>
            <sui-card-header>Pasta</sui-card-header>
            <sui-card-meta>Appetizer</sui-card-meta>
            <sui-card-description>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt sapiente quam minima? Veniam perferendis pariatur repellat tempore fugiat maxime sit.</sui-card-description>
          </sui-card-content>
          <sui-card-content extra>
            <div class="price">$8.99</div>
            <button class="ui button">Add to Cart</button>
          </sui-card-content>
        </sui-card>
      </sui-card-group>
    </section>
    <div class="menu-separator"></div>
    <section class="menu-section flex">
      <h2>Mains</h2>
      <div class="main-container grid"></div>
    </section>
    <div class="menu-separator"></div>
    <section class="menu-section flex">
      <h2>Drinks</h2>
      <div class="drink-container grid"></div>
    </section>
  </section>
</template>

<script>
import SuiVue from "semantic-ui-vue";

export default {
  name: "MenuItems",
  data: function() {
    return {};
  }
};
</script>
