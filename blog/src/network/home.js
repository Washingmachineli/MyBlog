import {request} from "./request";

//获取所有文章信息
export function ArticleInfo(page) {
  return request({
    method: 'post',
    data: {
      'page': page
    },
    url: '/home/articleInfo',
  })
}

//获取所有标签
export function getArticleLabel(content) {
  return request({
    method: 'get',
    url: '/home/getArticleLabel',
  })
}

//某个标签样式
export function findLabelInfo(content) {
  return request({
    method: 'post',
    data: {
      'content': content
    },
    url: '/home/findLabelInfo',
  })
}

//查看文章详情
export function findArticle(content) {
  return request({
    method: 'post',
    data: {
      'id': content
    },
    url: '/blog/findArticle',
  })
}
