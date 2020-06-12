import Vue from "vue";
import VueRouter from "vue-router";
import Order from "./views/Order.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", name: "order", component: Order },
  ],
});

export default router;
