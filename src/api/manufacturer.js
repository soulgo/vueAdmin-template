import axios from 'axios'

export function getmanufacturerList() {
  return axios.get('/api/manufacturer/')
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
