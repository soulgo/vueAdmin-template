import axios from 'axios'

export function getmanufacturerList(params) {
  return axios.get(`/api/manufacturer/?page=${params.page}`, params.page)
}

export function createmanufacturer(value) {
  return axios.post('/api/manufacturer/', value)
}

export function updatemanufacturer(value) {
  return axios.put(`/api/manufacturer/${value.id}/`, value.params)
}

export function deletemanufacturer(id) {
  return axios.delete(`/api/manufacturer/${id}/`)
}
