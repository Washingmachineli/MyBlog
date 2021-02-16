//根据指定标签查找相应文章的信息
import {request} from "./request";

export function getArticleByLabel(kind, label) {
  return request({
    method: 'post',
    data: {
      'kind': kind,
      'label': label
    },
    url: '/blog/getArticleByLabel',
  })
}

export function getArticleByKind(data) {
  return request({
    method: 'post',
    data: {
      'kind': data
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

export function addComment(commentator, article, comment) {
  return request({
    method: 'post',
    data: {
      'commentator': commentator,
      'comment': comment,
      'article': article
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
