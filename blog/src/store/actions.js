import {CHANGE_ARTICLE_ID} from "./mutations-types";


export default {
  addCurrentArticle(context, payload) {

    context.commit(CHANGE_ARTICLE_ID, payload);
  },
}
