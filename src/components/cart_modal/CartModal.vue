<template lang="html">
  <sui-modal v-model="open">
    <sui-modal-header>Order</sui-modal-header>
    <div class="cart-modal-content">
      <h3>Items in Cart:</h3>
      <div
        class="order-modal-row flex"
        v-for="(item, index) in this.cart.items"
        :key="index"
      >
        <p>{{ item.name }}&nbsp;</p>
        <p>{{ item.price | priceProcess }}</p>
      </div>
      <div>Total: {{ cartSum(this.cart.items) | priceProcess }}</div>
    </div>
    <sui-modal-actions>
      <sui-button secondary @click.native="emitClose">
        Dismiss
      </sui-button>
      <sui-button positive @click.native="emitPlaceOrder">
        Place Order
      </sui-button>
    </sui-modal-actions>
  </sui-modal>
</template>

<script>
import {} from '../../api/ajaxCalls';

export default {
  name: 'CartModal',
  props: {
    modalOpen: {
      type: Boolean,
      default: false
    },
    cart: {
      default: {}
    }
  },
  data() {
    return {};
  },
  computed: {
    open: {
      get: function() {
        return this.modalOpen;
      },
      set: function(newValue) {
        if (!newValue) this.emitClose();
      }
    }
  },
  methods: {
    emitClose() {
      this.$emit('closeModal');
    },
    emitPlaceOrder() {
      this.$emit('placeOrder');
    },
    cartSum(cartArray) {
      if (Array.isArray(cartArray)) {
        console.log('cart', cartArray);
        return cartArray.reduce((a, b) => a + b.price, 0);
      } else {
        return 0;
      }
    }
  },
  filters: {
    priceProcess: function(input) {
      if (!input) return '$0.00';
      return `$${(input / 100).toFixed(2)}`;
    }
  }
};
</script>
