<template lang="html">
  <sui-modal v-model="open">
    <sui-modal-header>Order</sui-modal-header>
    <sui-modal-content scrolling class="cart-modal-content">
      <h3>Items in Cart:</h3>
      <div
        class="order-modal-row flex"
        v-for="(item, index) in this.cart.items"
        :key="index"
      >
        <p>{{ item.name }}&nbsp;</p>
        <p>{{ item.price | priceProcess }}</p>
      </div>

      <div class="fwb">
        Total: {{ cartSum(this.cart.items) | priceProcess }}
      </div>
      <sui-form>
        <sui-header dividing>Order Info</sui-header>
        <sui-form-field>
          <label>Pickup Name</label>
          <sui-form-field>
            <input
              v-model="order.pickup_name"
              type="text"
              name="pickup_name"
              placeholder="Enter Your Name"
            />
          </sui-form-field>
        </sui-form-field>
        <sui-form-field>
          <label>Mobile Number (10 Digits)</label>
          <sui-form-field>
            <input
              type="text"
              v-model.number="order.mobile"
              name="mobile"
              placeholder="111 222 3333"
            />
          </sui-form-field>
        </sui-form-field>
        <sui-form-field>
          <label>Add a Note:</label>
          <textarea
            v-model="order.customer_note"
            name="customer_note"
            maxlength="255"
            rows="2"
          ></textarea>
        </sui-form-field>

        <sui-header dividing>Billing Information</sui-header>
        <p class="warning">
          Don't actually try to give us your billing info. This isn't real.
        </p>
        <sui-form-field disabled>
          <label>Card Type</label>
          <sui-dropdown disabled placeholder="Type" selection />
        </sui-form-field>
        <sui-form-fields>
          <sui-form-field disabled width="seven">
            <label>Card Number</label>
            <input disabled type="text" maxlength="16" placeholder="Card #" />
          </sui-form-field>
          <sui-form-field disabled width="three">
            <label>CVC</label>
            <input disabled type="text" maxlength="3" placeholder="CVC" />
          </sui-form-field>
          <sui-form-field disabled width="six">
            <label>Expiration</label>
            <sui-form-fields>
              <sui-form-field>
                <sui-dropdown disabled placeholder="Month" selection />
              </sui-form-field>
              <sui-form-field>
                <input type="text" maxlength="4" placeholder="Year" />
              </sui-form-field>
            </sui-form-fields>
          </sui-form-field>
        </sui-form-fields>
      </sui-form>
      <sui-modal-actions>
        <sui-button secondary @click.native="emitClose">
          Dismiss
        </sui-button>
        <sui-button
          v-if="order.pickup_name"
          positive
          @click.native="emitPlaceOrder"
        >
          Place Order
        </sui-button>
      </sui-modal-actions>
    </sui-modal-content>
  </sui-modal>
</template>

<script>
import { placeOrder } from '../../api/ajaxCalls';

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
    return {
      order: {
        mobile: '',
        customer_note: '',
        pickup_name: '',
        total_price: 0
      }
    };
  },
  updated() {
    this.order.total_price = this.cartSum(this.cart.items);
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
      this.$emit('placeOrder', this.order);
      this.$emit('closeModal');
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
