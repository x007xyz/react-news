import axios from "axios";

const http = axios.create({
  baseURL: 'https://unidemo.dcloud.net.cn/api/'
})

http.interceptors.response.use(
  res => res.data,
  err => {
    console.log('错误', err)
  }
)

export default http