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
        <sui-header dividing>Shipping Information</sui-header>
        <sui-form-field>
          <label>Name</label>
          <sui-form-fields fields="two">
            <sui-form-field>
              <input
                type="text"
                name="shipping[first-name]"
                placeholder="First Name"
              />
            </sui-form-field>
            <sui-form-field>
              <input
                type="text"
                name="shipping[last-name]"
                placeholder="Last Name"
              />
            </sui-form-field>
          </sui-form-fields>
        </sui-form-field>
        <sui-form-field>
          <label>Billing Address</label>
          <sui-form-fields>
            <sui-form-field width="twelve">
              <input
                type="text"
                name="shipping[address]"
                placeholder="Street Address"
              />
            </sui-form-field>
            <sui-form-field width="four">
              <input
                type="text"
                name="shipping[address-2]"
                placeholder="Apt #"
              />
            </sui-form-field>
          </sui-form-fields>
        </sui-form-field>
        <sui-form-fields fields="two">
          <sui-form-field>
            <label>State</label>
            <sui-dropdown
              placeholder="State"
              selection
              :options="states"
              v-model="currentState"
            />
          </sui-form-field>
          <sui-form-field>
            <label>State</label>
            <sui-dropdown
              :options="countries"
              placeholder="Country"
              search
              selection
              v-model="currentCountry"
            />
          </sui-form-field>
        </sui-form-fields>
        <sui-header dividing>Billing Information</sui-header>
        <sui-form-field>
          <label>Card Type</label>
          <sui-dropdown
            placeholder="Type"
            selection
            :options="cardTypes"
            v-model="currentCardType"
          />
        </sui-form-field>
        <sui-form-fields>
          <sui-form-field width="seven">
            <label>Card Number</label>
            <input
              type="text"
              name="card[number]"
              maxlength="16"
              placeholder="Card #"
            />
          </sui-form-field>
          <sui-form-field width="three">
            <label>CVC</label>
            <input
              type="text"
              name="card[cvc]"
              maxlength="3"
              placeholder="CVC"
            />
          </sui-form-field>
          <sui-form-field width="six">
            <label>Expiration</label>
            <sui-form-fields>
              <sui-form-field>
                <sui-dropdown
                  placeholder="Month"
                  selection
                  :options="months"
                  v-model="currentMonth"
                />
              </sui-form-field>
              <sui-form-field>
                <input
                  type="text"
                  name="card[expire-year]"
                  maxlength="4"
                  placeholder="Year"
                />
              </sui-form-field>
            </sui-form-fields>
          </sui-form-field>
        </sui-form-fields>
      </sui-form>
      <sui-modal-actions>
        <sui-button secondary @click.native="emitClose">
          Dismiss
        </sui-button>
        <sui-button positive @click.native="emitPlaceOrder">
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
      order: {}
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
