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
      <h2>
        <span v-if="items.length < 1"
          >No Orders In {{ tabSelected | capitalize }}</span
        ><span v-if="items.length > 0">{{ tabSelected | capitalize }}</span>
      </h2>
      <sui-card-group class="selection-container grid">
        <sui-card v-for="item in items" :key="item.id">
          <sui-card-content>
            <sui-card-header>Order for: {{ item.pickup_name }}</sui-card-header>
            <sui-card-description v-if="item.customer_note"
              >Customer note: {{ item.customer_note }}</sui-card-description
            >
          </sui-card-content>
          <sui-card-content extra>
            <div class="price">{{ item.total_price | priceProcess }}</div>
            <div v-if="item.created_at" class="price">
              Created at: {{ item.created_at | dateFilter }}
            </div>
            <div v-if="item.accepted_at" class="price">
              Accepted at: {{ item.accepted_at | dateFilter }}
            </div>
            <div class="price" v-if="item.estimate">
              Estimate:
              {{
                estimateCalculator(item.accepted_at, item.estimate) | dateFilter
              }}
            </div>
            <div class="price" v-if="item.fulfilled_at">
              Fulfilled at: {{ item.fulfilled_at | dateFilter }}
            </div>
            <sui-modal-actions>
              <sui-button
                secondary
                v-bind:id="item.id"
                @click.native="emitViewOrder($event)"
              >
                View
              </sui-button>
            </sui-modal-actions>
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
  props: ['orderItemsUpdate'],
  watch: {
    orderItemsUpdate: function(oldValue, newValue) {
      if (oldValue === 'accepted') {
        this.selectTab('accepted');
        this.getAllOrderAcceptedMethod();
      } else if (oldValue === 'fulfilled') {
        this.selectTab('fulfilled');
        this.getAllOrderFulfilledMethod();
      }
    }
  },
  methods: {
    getAllOrderNewMethod: function() {
      getAllOrderNew()
        .then(response => {
          this.items = response;
        })
        .catch(err => {
          this.items = [];
        });
    },
    getAllOrderAcceptedMethod: function() {
      getAllOrderAccepted()
        .then(response => {
          this.items = response;
        })
        .catch(err => {
          this.items = [];
        });
    },
    getAllOrderFulfilledMethod: function() {
      getAllOrderFulfilled()
        .then(response => {
          this.items = response;
        })
        .catch(err => {
          this.items = [];
        });
    },
    getAllOrderMethod: function() {
      getAllOrder()
        .then(response => {
          this.items = response;
        })
        .catch(err => {
          this.items = [];
        });
    },
    getOrderItemByOrderIdMethod: function(orderId) {
      if (!orderId) return;
      getOrderItemByOrderId(orderId)
        .then(response => {
          this.menuItems = response;
        })
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
      return new Date(acceptedDate.getTime() + estimateSeconds * 60 * 1000);
    },
    emitViewOrder: function(e) {
      this.$emit('openOrderModal', true, e.target.id);
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
      const dateArr = date.toUTCString().split(' ');
      const timeArr = dateArr[4].split(':');
      const hour =
        parseInt(timeArr[0]) + 7 > 23
          ? parseInt(timeArr[0]) + 7 - 24
          : parseInt(timeArr[0]) + 7;

      return `${hour}:${timeArr[1]} ${dateArr[2]} ${dateArr[1]} ${dateArr[3]}`;
    }
  }
};
</script>
