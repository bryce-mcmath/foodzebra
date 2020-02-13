<template>
  <section id="menu">
    <div class="menu-header flex">Orders</div>
    <div class="menu-separator"></div>
    <sui-menu class="sui-menu" :widths="4">
      <sui-menu-item
        @click="
          selectTab('new');
          getAllOrderNewMethod();
        "
        :active="isActive('new')"
        >New</sui-menu-item
      >
      <sui-menu-item
        @click="
          selectTab('accepted');
          getAllOrderAcceptedMethod();
        "
        :active="isActive('accepted')"
        >Accepted</sui-menu-item
      >
      <sui-menu-item
        @click="
          selectTab('fulfilled');
          getAllOrderFulfilledMethod();
        "
        :active="isActive('fulfilled')"
        >Fulfilled</sui-menu-item
      >
      <sui-menu-item
        @click="
          selectTab('all');
          getAllOrderMethod();
        "
        :active="isActive('all')"
        >All</sui-menu-item
      >
    </sui-menu>
    <section class="menu-section flex">
      <h2>{{ tabSelected | capitalize }}</h2>
      <sui-card-group class="selection-container grid">
        <sui-card v-for="item in items" :key="item.id">
          <sui-card-content>
            <sui-card-header>Order for: {{ item.pickup_name }}</sui-card-header>
            <sui-card-description
              >Customer note: {{ item.customer_note }}</sui-card-description
            >
          </sui-card-content>
          <sui-card-content extra>
            <div class="price">{{ item.total_price | priceProcess }}</div>
            <div class="price">
              Created at: {{ item.created_at | dateFilter }}
            </div>
            <div class="price">
              Accepted at: {{ item.accepted_at | dateFilter }}
            </div>
            <div class="price">
              Estimate:
              {{
                estimateCalculator(item.accepted_at, item.estimate) | dateFilter
              }}
            </div>
            <div class="price">
              Fulfilled at: {{ item.fulfilled_at | dateFilter }}
            </div>
          </sui-card-content>
        </sui-card>
      </sui-card-group>
    </section>
  </section>
</template>

<script>
import {
  getAllOrderNew,
  getAllOrderAccepted,
  getAllOrderFulfilled,
  getAllOrder,
  getOrderItemByOrderId
} from '../../api/ajaxCalls';

export default {
  name: 'OrderItems',
  methods: {
    getAllOrderNewMethod: function() {
      getAllOrderNew()
        .then(response => {
          console.log('getAllOrderNewMethod', response);
          this.items = response;
        })
        .catch(err => {
          console.log("Component 'LoginModal' error:", err);
          this.items = [];
        });
    },
    getAllOrderAcceptedMethod: function() {
      getAllOrderAccepted()
        .then(response => {
          console.log('getAllOrderAcceptedMethod', response);
          this.items = response;
        })
        .catch(err => {
          console.log("Component 'LoginModal' error:", err);
          this.items = [];
        });
    },
    getAllOrderFulfilledMethod: function() {
      getAllOrderFulfilled()
        .then(response => {
          console.log('getAllOrderFulfilled', response);
          this.items = response;
        })
        .catch(err => {
          console.log("Component 'LoginModal' error:", err);
          this.items = [];
        });
    },
    getAllOrderMethod: function() {
      getAllOrder()
        .then(response => {
          console.log('getAllOrder', response);
          this.items = response;
        })
        .catch(err => {
          console.log("Component 'LoginModal' error:", err);
          this.items = [];
        });
    },
    getOrderItemByOrderIdMethod: function(orderId) {
      if (!orderId) return;
      getOrderItemByOrderId(orderId)
        .then(response => {
          this.menuItems = response;
        })
        .catch(err => {
          console.log('err', err);
        });
    },
    selectTab: function(tabClicked) {
      this.tabSelected = tabClicked;
    },
    isActive: function(tab) {
      return this.tabSelected === tab;
    },
    estimateCalculator: function(acceptTimeStamp, estimateSeconds) {
      if (!acceptTimeStamp || !estimateSeconds) return '';
      let acceptedDate = new Date(acceptTimeStamp);
      return new Date(acceptedDate.getTime() + estimateSeconds * 1000);
    }
  },
  mounted() {
    this.getAllOrderNewMethod();
  },
  data: function() {
    return {
      items: [],
      menuItems: [],
      tabSelected: 'new'
    };
  },
  filters: {
    priceProcess: function(input) {
      if (!input) return '$0.00';
      return `$${(input / 100).toFixed(2)}`;
    },
    capitalize: function(input) {
      if (!input) return '';
      input = input.toString();
      return input.charAt(0).toUpperCase() + input.slice(1);
    },
    dateFilter: function(input) {
      if (!input) return 'N/A';

      const date = new Date(input);
      return `${date.getHours() +
        1}:${date.getMinutes()}, ${date.getFullYear()}/${date.getMonth() +
        1}/${date.getDate()}`;
    }
  }
};
</script>
