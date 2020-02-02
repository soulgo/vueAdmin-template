import request from '@/utils/request'

export function getServerList(params) {
  return request({
    url: '/server/',
    method: 'get',
    params
  })
}
