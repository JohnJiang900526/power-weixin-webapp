import axios from 'axios'
import qs from 'qs'
import storage from 'good-storage'
import { Base64 } from 'js-base64'
import { systemConfig, loginParams, localStorageTag } from 'common/js/config'

// 判断运行环境 是在开发中还是在生产环境中
const debug = process.env.NODE_ENV !== 'production'

// 缓存Token字符串
function storageToken (data) {
  storage.set(localStorageTag + 'Token', data.data.token)
}

// 执行登录功能
export function Login (Name, PassWord) {
  let url = debug ? systemConfig.devDomainName + '/Hoter/Login' : '/Hoter/Login'
  let params = Object.assign({}, loginParams)

  params.UserPass = PassWord
  params.UserCode = Name

  return new Promise((resolve, reject) => {
    console.log(url)
    axios.post(url, qs.stringify(params)).then((response) => {
      if (response.data.success) {
        storageToken(response.data)
      }
      resolve(response.data)
    }).catch((e) => {
      reject(e)
    })
  })
}

// 获取token字符串
export function getTokenString () {
  return storage.get(localStorageTag + 'Token')
}

// 获取Token中蕴含的信息
export function getTokenMsg () {
  let token = storage.get(localStorageTag + 'Token')

  if (token) {
    let msg = token.split('.')[1]
    let str = Base64.decode(msg)

    return JSON.parse(str)
  } else {
    return {}
  }
}
