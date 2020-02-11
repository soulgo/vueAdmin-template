import request from '@/utils/request'

export function getmanufacturerList(params) {
  return request({
    url: '/manufacturer/',
    method: 'get',
    params
  })
}

export function createmanufacturer(data) {
  return request({
    url: '/manufacturer/',
    method: 'post',
    data
  })
}

export function updatemanufacturer(id, data) {
  return request({
    url: '/manufacturer/' + id + '/',
    method: 'put',
    data
  })
}

export function deletemanufacturer(id) {
  return request({
    url: '/manufacturer/' + id + '/',
    method: 'delete'
  })
}
