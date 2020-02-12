import Vue from "vue";
import App from "./App.vue";
import axios from "axios";
import SuiVue from "semantic-ui-vue";
import "semantic-ui-css/semantic.min.css";
import vueSmoothScroll from "vue2-smooth-scroll";

Vue.use(SuiVue);
Vue.use(vueSmoothScroll);

// To set base URL for axios calls
let baseURL = window.location.origin;
if (process.env.BUILD_ENV === "production") {
  Vue.config.productionTip = false;
}
axios.defaults.baseURL = baseURL;

new Vue({
  el: "#app",
  render: h => h(App)
});
