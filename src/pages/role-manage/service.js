import axios from 'axios'
import { stringify } from 'qs'

export function getRoles(filter) {
  return axios.get(`/api/roles?${stringify(filter)}`)
}

export function addRole(body) {
  return axios.post('/api/role', body)
}

export function updateRole(id, body) {
  return axios.put(`/api/role/${id}`, body)
}
