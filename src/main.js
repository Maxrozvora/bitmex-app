import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import modificators from "./modificators";

Vue.config.productionTip = false;

Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_apiUrl,
});

Vue.prototype.$socket = new WebSocket(process.env.VUE_APP_socketUrl);

Vue.use(modificators);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
