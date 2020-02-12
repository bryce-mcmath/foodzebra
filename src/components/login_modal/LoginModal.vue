<template lang="html">
  <sui-modal class="login-modal-container" v-model="open">
    <sui-modal-header>Login</sui-modal-header>
    <sui-modal-content image>
      <sui-modal-description>
        <sui-input
          v-model="email"
          placeholder="Email"
          @keyup.enter="submitCredentials()"
        ></sui-input>
        <sui-input
          v-model="password"
          type="password"
          placeholder="Password"
          @keyup.enter="submitCredentials()"
        ></sui-input>
      </sui-modal-description>
      <sui-modal-description v-show="loginFailed"
        >Invalid username or password</sui-modal-description
      >
    </sui-modal-content>
    <sui-modal-actions>
      <sui-button positive @click.native="submitCredentials()">
        OK
      </sui-button>
    </sui-modal-actions>
  </sui-modal>
</template>

<script>
import { loginAjaxCall } from "../../api/ajaxCalls";

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
      password: "",
      loginFailed: false
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
    submitCredentials() {
      this.loginFailed = false;
      loginAjaxCall(this.email, this.password)
        .then(response => {
          if (response.status > 199 && response.status < 300) {
            this.emitClose();
            this.emitLogin();
          } else {
            this.loginFailed = true;
          }
        })
        .catch(err => {
          console.log("Component 'LoginModal' error:", err);
        });
    },
    emitClose() {
      this.$emit("closeModal");
    },
    emitLogin() {
      this.$emit("loggedIn");
    }
  }
};
</script>
