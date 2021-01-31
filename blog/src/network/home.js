import {request} from "./request";

//获取所有文章信息
export function getArticleInfo() {
  return request({
    method: 'get',
    url: '/home/articleInfo',
  })
}

//获取所有标签样式
export function getLabelInfo(content) {
  return request({
    method: 'get',
    url: '/home/labelInfo',
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
