import {CHANGE_ARTICLE_ID, CHANGE_ARTICLE_KIND, ADD_TOKEN, CLEAR_TOKEN, SIGN_IN, SIGN_OUT} from "./mutations-types";


export default {
  addCurrentArticle(context, payload) {
    context.commit(CHANGE_ARTICLE_ID, payload);
  },
  changeArticleKind(context, payload) {
    context.commit(CHANGE_ARTICLE_KIND, payload);
  },
  addToken(context, payload) {
    context.commit(ADD_TOKEN, payload)
  },
  signIn(context) {
    context.commit(SIGN_IN)
  },
  signOut(context) {
    context.commit(SIGN_OUT)
  },
  clearToken(context) {
    context.commit(CLEAR_TOKEN)
  }
}
