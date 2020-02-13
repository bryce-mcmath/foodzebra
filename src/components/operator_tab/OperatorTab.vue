<template>
  <div id="operator-tab">
    <sui-menu class="sui-menu" :widths="2">
      <sui-menu-item @click="selectTab('menu')" :active="isActive('menu')"
        >Menu</sui-menu-item
      >
      <sui-menu-item @click="selectTab('orders')" :active="isActive('orders')"
        >Orders</sui-menu-item
      >
    </sui-menu>
  </div>
</template>

<script>
export default {
  name: 'OperatorTab',
  props: ['operatorTab'],
  computed: {
    tabSelected: function() {
      return this.operatorTab;
    }
  },
  methods: {
    selectTab: function(tabClicked) {
      this.$emit('selectedOperatorTab', tabClicked);
    },
    isActive: function(tab) {
      return this.tabSelected === tab;
    }
  }
};
</script>
