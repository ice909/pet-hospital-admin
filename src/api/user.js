import http from '@/utils/http'

export function resetPassword(pass) {
  return http.put('/user/reset', pass)
}

export function login(user) {
  return http.post('/user/login', user)
}
