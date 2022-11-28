import request from '@/utils/request'
import store from '@/store/index'
// 用户登陆信息提交
export const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}
// 发送验证码
export const sendMsg = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
// 获取用户信息 需要headers参数携带Bearer+token
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user',
    // Bearer后面有空格注意
    headers: {
      Authorization: `Bearer ${store.state.userToken.token}`
    }
  })
}
// 获取频道列表
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}
