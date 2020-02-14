<template lang="html">
  <sui-modal
    @click.native="emitClose"
    class="menu-modal-container"
    v-model="open"
  >
    <sui-modal-header>Item Added to Order!</sui-modal-header>
    <div class="checkmark-wrapper">
      <img
        class="checkmark"
        src="../../../public/checkmark.gif"
        alt="checkmark"
      />
    </div>
    <sui-modal-actions>
      <sui-button positive>
        Dismiss
      </sui-button>
    </sui-modal-actions>
  </sui-modal>
</template>

<script>
export default {
  name: 'MenuModal',
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
