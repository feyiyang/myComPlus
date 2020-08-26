/* eslint-disable */
import axios from "axios"
import {Toast} from 'vant'
import storage from './storage'

var apiRoot =
  process.env.NODE_ENV == "production"
    ? "https://server.ai3culture.com/" // 
    // ?  "https://testserver.ai3culture.com/"
    // :  "https://server.ai3culture.com/"
    // :  "https://testserver.ai3culture.com/"
    :  "https://testserver.ai3culture.com/"
      // "http://172.18.19.238:8888"

// var iHost = process.env.NODE_ENV == "production"
//     // ? 'http://testreport.ai3culture.com'
//     ?  "http://report.ai3culture.com"
//     : 'http://testreport.ai3culture.com'

var timeout = 1000 * 15
/*** 网络请求的 baseurl & 设置请求头中的token  */
let h5token = decodeURIComponent(storage.get("token"))
let did = decodeURIComponent(storage.get("did"))

const setConfig = function(config, instanceSetFn) {
  apiRoot = config.apiRoot?config.apiRoot: apiRoot
  // iHost= config.iHost?config.iHost: iHost
  timeout = config.timeout?config.timeout: timeout

  instance.defaults.baseURL = apiRoot
  instanceSetFn && instanceSetFn()
  return config
}

// console.log(apiRoot)

// 创建axios实例
var instance = axios.create({timeout: timeout})
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

instance.defaults.baseURL = apiRoot
instance.defaults.headers.common["Authorization"] = h5token || ""
instance.defaults.headers.common["deviceId"] = did
/** 
 * 请求拦截器 
 * 每次请求前，如果存在token则在请求头中携带token 
 */ 
instance.interceptors.request.use(    
  config => {        
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况        
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token        
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码        
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。        
    const token = storage.get("token")     
    token && (config.headers.Authorization = token)       
    return config
  },    
  error => Promise.error(error))

// 响应拦截器
instance.interceptors.response.use(    
  // 请求成功
  res => {
    Toast.clear()
    if(res.data.status == 200 || res.data.success){
      return Promise.resolve(res.data.data)
    }else{
      return Promise.reject(res.data)
    }
  },    
  // 请求失败
  error => {
      const { response } = error
      // console.log(response)
      Toast.clear()
      if (response) {
        // 请求已发出，但是不在2xx的范围 
        // errorHandle(response.status, response.data.message);
        return Promise.reject(response.data)
      } else {
        // 处理断网的情况
        // eg:请求超时或断网时，更新state的network状态
        // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
        // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
        if (!window.navigator.onLine) {
          Toast({        
            message: '请检查您的网络连接',        
            duration: 1600,        
            forbidClick: true    
          });
        } else {
          return Promise.reject(error.data)
        }
      }
  })

function doAxios(method, url, params, toast={hideErr: false, showLoading: false}) {
  toast.showLoading && Toast.loading({
    duration: 0,
    message: '',
    forbidClick: true
  })
  return new Promise((resolve, reject) => {
    if(method=='get'){
      instance.get(url, {params}).then(res => {
        resolve(res)
      }).catch(err => {
        !toast.hideErr && Toast({ message: `status: ${err.status}, message: ${err.errorMsg || '数据错误'}` })
        reject(err)
      })
    }else {
      instance.post(url, params).then(res => {
        resolve(res)
      }).catch(err => {
        !toast.hideErr && Toast({ message: `status: ${err.status}, message: ${err.errorMsg || '数据错误'}` })
        reject(err)
      })
    }
  })
}

export default {
  setConfig,
  instance,
  // apiRoot,
  // iHost,
  doAxios,
}

