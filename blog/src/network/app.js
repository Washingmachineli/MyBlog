//根据指定标签查找相应文章的信息
import {request} from "./request";

export function getArticleKind(data) {
  return request({
    method: 'get',
    url: '/getArticleKind',
  })
}
