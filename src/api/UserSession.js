import storage from 'good-storage'
import { localStorageTag } from 'common/js/config.js'
import { getTokenString } from 'api/login.js'
import { APIUnit } from './APIUnit.js'

const API = '/Hoter/UserSession'
const params = {
  Token: null
}

// 获取UserInfo信息
export function getUserSession () {
  params.Token = getTokenString()
  return APIUnit(API, params)
}

// 缓存UserSession信息
export function storeUserSession (UserSession) {
  storage.set(localStorageTag + 'UserSession', UserSession)
}

// 获取缓存中的UserSession
export function getStoreUserSession () {
  return storage.get(localStorageTag + 'UserSession')
}
