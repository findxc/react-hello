import axios from 'axios'

export function getCurrentUser() {
  return axios.get('/api/current-user')
}
