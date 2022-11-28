// axios请求模块封装
import axios from 'axios'

const request = axios.create({
  baseURL: 'api'
})

export default request
