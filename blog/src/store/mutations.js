import {CHANGE_ARTICLE_ID, CHANGE_ARTICLE_KIND, ADD_TOKEN} from "@/store/mutations-types";

export default {
  [CHANGE_ARTICLE_ID](state, payload){
    state.articleId = payload
  },
  [CHANGE_ARTICLE_KIND](state, payload) {
    state.articleKind = payload
  },
  [ADD_TOKEN](state, payload) {
    state.token = payload
  }
}
