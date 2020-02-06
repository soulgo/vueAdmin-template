import axios from 'axios'

export function getBookist(params) {
  return axios.get(`/api/book/?page=${params.page}&search=${params.search}`, params.page, params.search)
}

export function createBook(value) {
  return axios.post('/api/book/', value)
}

export function updateBook(value) {
  return axios.put(`/api/book/${value.id}/`, value.params)
}

export function deleteBook(id) {
  return axios.delete(`/api/book/${id}/`)
}

