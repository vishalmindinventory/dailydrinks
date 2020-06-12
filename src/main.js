import Vue from "vue";
import App from "./App.vue";
import router from "./routers";
import VueSweetalert2 from "vue-sweetalert2";
import store from "./store";

Vue.use(VueSweetalert2);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
