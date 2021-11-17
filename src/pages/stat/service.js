import axios from 'axios'
import { stringify } from 'qs'

export function getStatWeek(filter) {
  return axios.get(`/api/stat/week?${stringify(filter)}`)
}
