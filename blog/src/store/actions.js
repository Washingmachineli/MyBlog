import {CHANGE_ARTICLE_ID, CHANGE_ARTICLE_KIND, ADD_TOKEN} from "./mutations-types";


export default {
  addCurrentArticle(context, payload) {
    context.commit(CHANGE_ARTICLE_ID, payload);
  },
  changeArticleKind(context, payload) {
    context.commit(CHANGE_ARTICLE_KIND, payload);
  },
  addToken(context, payload) {
    context.commit(ADD_TOKEN, payload)
  }
}
