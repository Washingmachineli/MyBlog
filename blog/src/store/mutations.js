import {CHANGE_ARTICLE_ID} from "@/store/mutations-types";

export default {
  [CHANGE_ARTICLE_ID](state, payload){
    state.articleId = payload
  }
}
