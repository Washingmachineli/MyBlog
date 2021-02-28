import {CHANGE_ARTICLE_ID, CHANGE_ARTICLE_KIND, ADD_TOKEN, CLEAR_TOKEN, SIGN_IN, SIGN_OUT} from "@/store/mutations-types";

export default {
  [CHANGE_ARTICLE_ID](state, payload){
    state.articleId = payload
  },
  [CHANGE_ARTICLE_KIND](state, payload) {
    state.articleKind = payload
  },
  [ADD_TOKEN](state, payload) {
    state.token = payload
  },
  [CLEAR_TOKEN](state) {
    state.token = null
  },
  [SIGN_IN](state) {
    state.isLogin = true
  },
  [SIGN_OUT](state) {
    state.isLogin = false
  }
}
