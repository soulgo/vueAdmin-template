import axios from 'axios'

export function getPublishList(params) {
  return axios.get(`/api/publish/?page=${params.page}&search=${params.search}`, params.page, params.search)
}

export function createPublish(value) {
  return axios.post('/api/publish/', value)
}

export function updatePublish(value) {
  return axios.put(`/api/publish/${value.id}/`, value.params)
}

export function deletePublish(id) {
  return axios.delete(`/api/publish/${id}/`)
}

