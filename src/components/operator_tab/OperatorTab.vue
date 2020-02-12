<template>
  <div id="operator-tab">
    <sui-menu class="sui-menu" :widths="2">
      <sui-menu-item @click="selectTab('Menu')" :active="isActive('Menu')"
        >Menu</sui-menu-item
      >
      <sui-menu-item @click="selectTab('Orders')" :active="isActive('Orders')"
        >Orders</sui-menu-item
      >
    </sui-menu>
  </div>
</template>

<script>
export default {
  name: 'OperatorTab',
  data() {
    return {
      tabSelected: 'Menu'
    };
  },
  methods: {
    selectTab: function(tabClicked) {
      this.$emit('');
      this.tabSelected = tabClicked;
    },
    isActive: function(tab) {
      return this.tabSelected === tab;
    }
  }
};
</script>
