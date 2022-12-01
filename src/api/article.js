import request from '@/utils/request'
// 获取文章
export const getArticleList = params => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}
