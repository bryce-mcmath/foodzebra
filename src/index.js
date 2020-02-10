import Vue from "vue";
import App from "./App.vue";
import axios from "axios";

console.log(process.env.BUILD_ENV);

let baseURL = window.location.origin;

if (process.env.BUILD_ENV === "production") {
  Vue.config.productionTip = false;
}
axios.defaults.baseURL = baseURL;

new Vue({
  el: "#app",
  render: h => h(App)
});
