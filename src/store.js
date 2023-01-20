import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: {},
    token: "",
    isDefaultPass: false,
    tokenType: "",
    scopeType: "",
    schoolType:"",
  },
  mutations: {
    updateUser: (state, payload) => {
      state.user = payload;
    },
    updateToken: (state, payload) => {
      state.token = payload;
    },
    updateTokenType: (state, payload) => {
      state.tokenType = payload;
    },
    updateScopeType: (state, payload) => {
      state.scopeType = payload;
    },
    updateSchoolType: (state,payload) => {
      state.schoolType = payload
    }
  },
  actions: {
    updateUser: (context, payload) => {
      context.commit("updateUser", payload);
    },
    updateToken: (context, payload) => {
      context.commit("updateToken", payload);
    },
    updateTokenType: (context, payload) => {
      context.commit("updateTokenType", payload);
    },
    updateScopeType: (context, payload) => {
      context.commit("updateScopeType", payload);
    },
    updateSchoolType: (context, payload) => {
      context.commit("updateSchoolType", payload);
    }
  },
  plugins: [createPersistedState()],
});
