import Vue from 'vue';
import Vuex from 'vuex';

import mutations from "@/store/mutations";
import actions from "@/store/actions";
import getters from "@/store/getters";

Vue.use(Vuex)

const state = {
  articleId: null,
  articleKind: null,
  token: null,
  isLogin: false,
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store;
