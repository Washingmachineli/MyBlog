//根据指定标签查找相应文章的信息
import {request} from "./request";

export function getArticleByLabel(kind, label, page) {
  return request({
    method: 'post',
    data: {
      'kind': kind,
      'label': label,
      'page': page,
    },
    url: '/blog/getArticleByLabel',
  })
}

export function getArticleByKind(kind, page) {
  return request({
    method: 'post',
    data: {
      'kind': kind,
      'page': page,
    },
    url: '/blog/getArticleByKind',
  })
}

export function getLabelByKind(data) {
  return request({
    method: 'post',
    data: {
      'kind': data
    },
    url: '/blog/getLabelByKind',
  })
}

export function articleKind(data) {
  return request({
    method: 'get',
    url: '/blog/articleKind',
  })
}


export function addComment(commentator, article, articleId, comment) {
  return request({
    method: 'post',
    data: {
      'commentator': commentator,
      'comment': comment,
      'article': article,
      'articleId': articleId
    },
    url: '/blog/addComment',
  })
}

export function getComment(article, page) {
  return request({
    method: 'post',
    data: {
      'article': article,
      'page': page
    },
    url: '/blog/getComment',
  })
}
