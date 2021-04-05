import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    symbol: "",
  },
  mutations: {
    setSymbol(state, symbol) {
      state.symbol = symbol;
    },
  },
  actions: {},
});
