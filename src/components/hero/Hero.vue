<template>
  <div class="hero">
    <div class="hero-img"></div>
    <div class="hero-content flex">
      <h1>Eat Your Heart Out</h1>
      <p>
        Order from the comfort of your home or just the comfort of your phone,
        and recieve a text as soon as your order is placed and ready.
      </p>

      <a href="#menu" v-smooth-scroll>
        <button class="massive ui button">
          View Menu
          <i class="fas fa-arrow-circle-down"></i>
        </button>
      </a>
    </div>
    <div class="hero-overlay"></div>
  </div>
</template>

<script>
export default {
  name: 'Hero',
  data: function() {
    return {};
  }
};
</script>
