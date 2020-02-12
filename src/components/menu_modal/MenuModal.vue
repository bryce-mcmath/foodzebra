<template lang="html">
  <sui-modal v-model="open">
    <sui-modal-header>Select a Photo</sui-modal-header>
    <sui-modal-content image>
      <sui-image wrapped size="medium" src="" />
      <sui-modal-description>
        <sui-header>Default Profile Image</sui-header>
        <p>
          We've found the following gravatar image associated with your e-mail
          address.
        </p>
        <p>Is it okay to use this photo?</p>
      </sui-modal-description>
    </sui-modal-content>
    <sui-modal-actions>
      <sui-button positive @click.native="emitClose">
        OK
      </sui-button>
    </sui-modal-actions>
  </sui-modal>
</template>

<script>
export default {
  name: "MenuModal",
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
      this.$emit("closeModal");
    }
  }
};
</script>
