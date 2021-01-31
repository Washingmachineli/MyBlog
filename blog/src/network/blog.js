//根据指定标签查找相应文章的信息
import {request} from "./request";

export function findArticleInfoByKind(data) {
  return request({
    method: 'post',
    data: {
      'label': data
    },
    url: '/blog/findArticleInfoByKind',
  })
}
