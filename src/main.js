import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import config from "./config";
import modificators from "./modificators";

Vue.config.productionTip = false;

Vue.prototype.$http = axios.create({
  baseURL: config.apiUrl,
});

Vue.use(modificators);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
