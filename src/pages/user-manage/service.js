import axios from 'axios'

export function addUser(body) {
  return axios.post('/api/user', {
    body,
  })
}

export function updateUser(id, body) {
  return axios.put(`/api/user/${id}`, {
    body,
  })
}

export function deleteUser(id) {
  return axios.delete(`/api/user/${id}`)
}
