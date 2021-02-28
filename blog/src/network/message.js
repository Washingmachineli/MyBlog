import {request} from "./request";

export function replyComment(id, reply) {
  return request({
    method: 'post',
    url: '/comment/replyComment',
    data: {
      id,
      reply
    }
  })
}

export function replyDelete(id) {
  return request({
    method: 'post',
    url: '/comment/replyDelete',
    data: {
      id
    }
  })
}

export function commentDelete(id) {
  return request({
    method: 'post',
    url: '/comment/commentDelete',
    data: {
      id
    }
  })
}
