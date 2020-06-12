import Vue from "vue";
import Vuex from "vuex";
import orders from "./models/order";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    orders: orders,
  },
  mutations: {
    remove_order(state, index) {
      if (index > -1) {
        state.orders.splice(index, 1);
      }
    },
    add_order(state, payload) {
      state.orders.push(payload);
    },
    edit_order(state, payload) {
      state.orders = state.orders.map((i) => {
        if (i.id == payload.id) {
          return payload;
        }
        return i;
      });
    },
  },
  actions: {
    removeOrder({ state, commit }, id) {
      try {
        var index = state.orders
          .map((i) => {
            if (id == i.id) return true;
            return false;
          })
          .indexOf(true);

        if (index != -1) {
          commit("remove_order", index);
          return true;
        } else {
          return false;
        }
      } catch (error) {
        return false;
      }
    },
    addOrder({ commit }, payload) {
      commit("add_order", payload);
    },
    editOrder({ commit }, payload) {
      commit("edit_order", {
        id: payload.id,
        name: payload.name,
        price: payload.price,
        notes: payload.notes
      });
    },
  },
});

export default store;
