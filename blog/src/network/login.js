import {request} from "./request";

export function login(username, password) {
  return request({
    method: 'post',
    url: '/login',
    data: {
      username,
      password
    }
  })
}

export function checkToken(token) {
  return request({
    method: 'post',
    url: '/checkToken',
    data: {
      token,
    }
  })
}
