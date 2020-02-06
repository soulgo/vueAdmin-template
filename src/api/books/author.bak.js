import axios from 'axios'

export function getAuthorList(params) {
  return axios.get(`/api/author/?page=${params.page}&search=${params.search}`, params.page, params.search)
}

export function createAuthor(value) {
  console.log(value)
  return axios.post('/api/author/', value)
}

export function updateAuthor(value) {
  return axios.put(`/api/author/${value.id}/`, value.params)
}

export function deleteAuthor(id) {
  return axios.delete(`/api/author/${id}/`)
}

