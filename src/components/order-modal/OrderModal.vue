<template lang="html">
  <sui-modal class="order-modal-container" v-model="open">
    <sui-modal-header>Order {{ this.order_id }}</sui-modal-header>
    <!-- <div class="order-modal-content"> -->
    <sui-modal-content class="order-modal-content">
      <h3>Menu Items Ordered:</h3>
      <div class="order-modal-row flex" v-for="item in items" :key="item.id">
        <p>{{ item.name }}</p>
        <p>{{ item.price | priceProcess }}</p>
      </div>
      <div class="order-modal-total fwb flex">
        <p class="fwb">Total price:</p>
        <p class="fwb">{{ sumPrices(items) | priceProcess }}</p>
      </div>
      <!-- </div> -->
    </sui-modal-content>
    <!-- form with estimate input -->

    <sui-modal-actions>
      <sui-input
        type="number"
        v-model.number="estimate"
        placeholder="Estimate in minutes"
        v-if="!accepted"
      ></sui-input>
      <sui-button
        class="order-button"
        :disabled="!estimate"
        v-if="!accepted"
        primary
        @click.native="emitAcceptOrder"
      >
        Accept
      </sui-button>
      <sui-button
        class="order-button"
        positive
        v-if="accepted && !fulfilled"
        @click.native="emitFulfillOrder"
      >
        Ready
      </sui-button>
      <sui-button class="order-button" secondary @click.native="emitClose">
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
      estimate: '',
      items: [],
      accepted: false,
      fulfilled: false
    };
  },
  computed: {
    open: {
      get: function() {
        return this.modalOpen;
      },
      set: function(newValue) {
        this.clearItems();
        if (!newValue) {
          this.emitClose();
        }
      }
    }
  },
  watch: {
    order_id: function(n, o) {
      this.getOrderItemByIdMethod();
    }
  },
  methods: {
    clearItems() {
      this.items = [];
    },
    emitClose() {
      this.clearItems();
      this.$emit('closeModal');
    },
    emitAcceptOrder() {
      this.clearItems();
      this.$emit('acceptOrder', Number(this.order_id), this.estimate);
      this.$emit('closeModal');
    },
    emitFulfillOrder(id) {
      this.clearItems();
      this.$emit('fulfillOrder', Number(this.order_id));
      this.$emit('closeModal');
    },
    getOrderItemByIdMethod() {
      if (this.order_id !== '') {
        getOrderItemByOrderId(Number(this.order_id))
          .then(response => {
            this.items = response;
            for (let item of this.items) {
              if (item.accepted_at) {
                this.accepted = true;
              }
              if (item.fulfilled_at) {
                this.fulfilled = true;
              }
            }
          })
          .catch(err => {
            console.log("Component 'OrderModal' error:", err);
            this.items = [];
          });
      }
    },
    sumPrices(itemArray) {
      if (Array.isArray(itemArray)) {
        return itemArray.reduce((a, b) => a + b.price, 0);
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
