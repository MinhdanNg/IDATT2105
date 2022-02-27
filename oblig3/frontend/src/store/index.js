import Vuex from "vuex";

export default new Vuex.Store({
  state: {
    username: "user",
    loginStatus: false,
  },
  mutations: {
    SET_USERNAME(state, username) {
      state.username = username;
    },
    SET_STATUS(state, status) {
      state.loginStatus = status;
    },
  },
  actions: {
    login(context, username, status) {
      context.commit("SET_USERNAME", username);
      context.commit("SET_STATUS", status);
    },
  },
  modules: {},
});
