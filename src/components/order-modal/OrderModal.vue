<template lang="html">
  <sui-modal v-model="open">
    <sui-modal-header>Order {{ this.order_id }}</sui-modal-header>
    <div class="order-modal-content">
      <h3>Menu Items Ordered:</h3>
      <div class="order-modal-row flex" v-for="item in items" :key="item.id">
        <p>{{ item.name }}</p>
        <p>{{ item.price | priceProcess }}</p>
      </div>
      <div class="order-modal-total">
        <!-- {{ this.items.map(x => x.price) | sumPrices | priceProcess }} -->
      </div>
      <!-- form with estimate input -->
    </div>
    <sui-modal-actions>
      <sui-button primary @click.native="emitAcceptOrder">
        Send Estimate
      </sui-button>
      <sui-button positive @click.native="emitFulfillOrder">
        Ready
      </sui-button>
      <sui-button secondary @click.native="emitClose">
        Dismiss
      </sui-button>
    </sui-modal-actions>
  </sui-modal>
</template>

<script>
import { getOrderItemByOrderId } from '../../api/ajaxCalls';

export default {
  name: 'OrderModal',
  props: ['modalOpen', 'order_id'],
  data() {
    return {
      estimate: 1800,
      items: []
    };
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
  watch: {
    order_id: function(n, o) {
      this.getOrderItemByIdMethod();
    }
  },
  methods: {
    emitClose() {
      this.$emit('closeModal');
    },
    emitAcceptOrder() {
      this.$emit('acceptOrder', Number(this.order_id), this.estimate);
      this.$emit('closeModal');
    },
    emitFulfillOrder(id) {
      this.$emit('fulfillOrder', Number(this.order_id));
      this.$emit('closeModal');
    },
    getOrderItemByIdMethod() {
      console.log(
        'The thing was called. Number(this.order_id) is: ',
        Number(this.order_id)
      );
      if (this.order_id !== '') {
        getOrderItemByOrderId(Number(this.order_id))
          .then(response => {
            console.log('getMenuItemsMethod', response);
            this.items = response;
          })
          .catch(err => {
            console.log("Component 'OrderModal' error:", err);
            this.items = [];
          });
      }
    }
  },
  filters: {
    priceProcess: function(input) {
      if (!input) return '$0.00';
      return `$${(input / 100).toFixed(2)}`;
    },
    sumPrices: function(prices) {
      const sum = (tot, price) => {
        return tot + price;
      };

      return prices.reduce(sum, 0);
    }
  }
};
</script>
