import axios from 'axios'
import { stringify } from 'qs'

export function getRoles(filter) {
  return axios.get(`/api/roles?${stringify(filter)}`)
}
