<template lang="html">
  <sui-modal class="login-modal-container" v-model="open">
    <sui-modal-header>Login</sui-modal-header>
    <sui-modal-content image>
      <sui-modal-description>
        <sui-input v-model="email" placeholder="Email"></sui-input>
        <sui-input
          v-model="password"
          type="password"
          placeholder="Password"
        ></sui-input>
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
  name: "LoginModal",
  props: {
    modalOpen: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      email: "",
      password: ""
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
      this.$emit("closeModal");
    }
  }
};
</script>
