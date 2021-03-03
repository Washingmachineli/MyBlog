//根据指定标签查找相应文章的信息
import {request} from "./request";

//获取标签
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

//获取指定分类下的文章
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

//获取指定分类下的文章的所有标签
export function getLabelByKind(data) {
  return request({
    method: 'post',
    data: {
      'kind': data
    },
    url: '/blog/getLabelByKind',
  })
}

//获取文章分类
export function articleKind(data) {
  return request({
    method: 'get',
    url: '/blog/articleKind',
  })
}

//添加评论
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

//获取评论
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

//修改文章
export function modifyArticle(id, articleName, articleAuthor, articleKind, articleDescribe, articleLabel, articleContent) {
  return request({
    method: 'post',
    data: {
      'id': id,
      'title': articleName,
      'author': articleAuthor,
      'kind': articleKind,
      'describe': articleDescribe,
      'label': articleLabel,
      'content': articleContent
    },
    url: '/blog/modifyArticle',
  })
}

//添加文章
export function addArticle(articleName, articleAuthor, articleKind, articleDescribe, articleLabel, picture, articleContent) {
  return request({
    method: 'post',
    data: {
      'title': articleName,
      'author': articleAuthor,
      'kind': articleKind,
      'describe': articleDescribe,
      'label': articleLabel,
      'picture': picture,
      'content': articleContent
    },
    url: '/blog/addArticle',
  })
}
