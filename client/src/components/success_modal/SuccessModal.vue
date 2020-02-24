<template lang="html">
  <sui-modal class="menu-modal-container" v-model="open">
    <sui-modal-header>Order Placed!</sui-modal-header>
    <div class="checkmark-wrapper">
      <img
        class="checkmark"
        src="../../../public/checkmark.gif"
        alt="checkmark"
      />
    </div>
    <sui-modal-actions>
      <sui-button positive @click.native="emitClose">
        Dismiss
      </sui-button>
    </sui-modal-actions>
  </sui-modal>
</template>

<script>
export default {
  name: 'SuccessModal',
  props: {
    modalOpen: {
      type: Boolean,
      default: false
    }
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
    }
  }
};
</script>
