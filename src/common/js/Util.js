import storage from 'good-storage'
import { systemConfig } from 'common/js/config.js'
import { getTokenString, getTokenMsg } from 'api/login.js'

// 退出的时候清空缓存
export function clearStorage () {
  storage.clear()
}

// 登录成功之后路由重定向
export function redirectRoutes (Map) {
  let Token = getTokenString()
  let TokenMsg = getTokenMsg()
  let routes = []
  let obj = {}
  let keepLogin = checkLoginTime(TokenMsg)

  if (Token && keepLogin) {
    obj = Object.assign({}, {
      path: '/',
      redirect: '/weixin/business'
    })
    routes.push(obj)
  } else {
    obj = Object.assign({}, {
      path: '/',
      redirect: '/weixin/login'
    })
    routes.push(obj)
  }

  routes = routes.concat(Map)
  return routes
}

// 设置菜单的字体和背景
export function setFontColor (data) {
  data.forEach((item, index) => {
    let reIndex = index % systemConfig.fontMap.length
    item = Object.assign(item, systemConfig.fontMap[reIndex])
  })

  return data
}

// 获取上一级菜单
export function getNextHigherLevel (ParentId, menuList) {
  let obj = {
    menu: [],
    title: ''
  }

  function getHigherLevel (ParentId, menu) {
    let menuList = menu.concat()
    if (!ParentId || ParentId === '') {
      obj.menu = menuList
      obj.title = ''
      return obj
    }

    let item = null
    for (let i = 0; i < menuList.length; i++) {
      item = menuList[i]
      if (item.ParentId !== '' && item.Id === ParentId) {
        obj.menu = item.children
        obj.title = item.Name
      } else if (item.children && item.children.length > 0) {
        getHigherLevel(ParentId, item.children)
      }
    }

    return obj
  }
  getHigherLevel(ParentId, menuList)

  return obj
}

// 自定义时间格式 ：format
// "yyyy-MM-dd HH:mm:ss";"yyyy-MM-dd-HH-mm-ss"
// "yyyy-MM-ddTHH:mm:ss" ....
export function formatDate (time, format) {
  if (!time) {
    return ''
  }
  let t = new Date(time)
  if (t.getTime() === 0) {
    t = new Date()
  }

  let tf = function (i) {
    return (i < 10 ? '0' : '') + i
  }
  if (!format) {
    format = 'yyyy-MM-dd'
  }

  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function (type) {
    switch (type) {
      case 'yyyy':
        return tf(t.getFullYear())
      case 'MM':
        return tf(t.getMonth() + 1)
      case 'mm':
        return tf(t.getMinutes())
      case 'dd':
        return tf(t.getDate())
      case 'HH':
        return tf(t.getHours())
      case 'ss':
        return tf(t.getSeconds())
    }
  })
}

// 获取子菜单
export function getChildrenMenu (parent) {
  var menu = []
  if (parent.children && parent.children.length > 0) {
    menu = parent.children
  }
  return menu
}
// 导航守卫 处理title 和判断登录的问题
export function routerBeforeEach (router) {
  router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title
    const Token = getTokenString()
    const isLoginPage = to.fullPath === '/weixin/login'
    const TokenMsg = getTokenMsg()
    const hasLogin = checkLoginTime(TokenMsg)

    if (!Token && !isLoginPage && !hasLogin) {
      // 回到登录页 要清除缓存
      storage.clear()
      next('/weixin/login')
    } else {
      next()
    }
  })
}

// 判断两个对象的属性值、和属性是否相等
// 不考虑像个对象的__proto__属性里面的东西
// 这个方法的原理和Object.is()方法不同
export function isObjectValueEqual (a, b) {
  let aKeys = Object.keys(a)
  let bKeys = Object.keys(b)

  if (aKeys.length !== bKeys.length) {
    return false
  }

  for (var i = 0; i < aKeys.length; i++) {
    var keyName = aKeys[i]
    if (a[keyName] !== b[keyName]) {
      return false
    }
  }

  return true
}

// 获取窗体链接中的MenuId
export function getMenuId (router) {
  let fullPath = router.history.current.fullPath
  let fullArray = fullPath.replace('/weixin/form/', '').split('/')

  return fullArray[0]
}

export function findIndex (ary, fn) {
  if (ary.findIndex) {
    return ary.findIndex(fn)
  }
  /* istanbul ignore next */
  let index = -1
  /* istanbul ignore next */
  ary.some(function (item, i, ary) {
    const ret = fn.call(this, item, i, ary)
    if (ret) {
      index = i
      return ret
    }
  })
  /* istanbul ignore next */
  return index
}

// 删除数组的一条信息
export function removeList (arr, item) {
  let selfItem = {}
  for (let i = 0; i < arr.length; i++) {
    selfItem = arr[i]
    if (selfItem.Id === item.Id) {
      arr.splice(i, 1)
      break
    }
  }
  return arr
}

// 格式化formAllConfig中的信息
export function formatFormAllConfig (formAllConfig) {
  let obj = Object.assign({}, formAllConfig)

  if (obj.formconfig !== '') {
    obj.formconfig = JSON.parse(obj.formconfig)
  }

  if (obj.keywordright !== '') {
    obj.keywordright = JSON.parse(obj.keywordright)
  }

  if (obj.sessiondata !== '') {
    obj.sessiondata = JSON.parse(obj.sessiondata)
  }

  if (obj.workflowdata !== '') {
    obj.workflowdata = JSON.parse(obj.workflowdata)
  }

  if (obj.comboboxdata !== '') {
    obj.comboboxdata = JSON.parse(obj.comboboxdata)
  }

  return obj
}

// 返回一个主机名和端口号
export function hostAddress (NODE_ENV) {
  const debug = NODE_ENV !== 'production'
  let url = debug ? systemConfig.devDomainName + '/' : '/'

  return url
}

// 获取附件的icon
export function getFileIcon (item) {
  let imgPath = '/PowerPlat/Control/File.ashx?action=browser&_type=ftp&_fileid='
  let publicPath = '/Images/fileIcon/'

  if (!item.FileExt) {
    return publicPath + 'fileOther.png'
  }

  if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(item.FileExt)) {
    return imgPath + item.Id
  } else if (/\.(mp4|webm|ogg|flv|mpg)(\?.*)?$/.test(item.FileExt)) {
    return publicPath + 'fileVideo.png'
  } else if (/\.(mp3|wav|flac|aac)(\?.*)?$/.test(item.FileExt)) {
    return publicPath + 'fileAudio.png'
  } else if (/\.(doc|docx|docm|dot|dotx|dotm)(\?.*)?$/.test(item.FileExt)) {
    return publicPath + 'fileWord.png'
  } else if (/\.(pdf)(\?.*)?$/.test(item.FileExt)) {
    return publicPath + 'filePdf.png'
  } else if (/\.(xls|xlsx|xlsm|xlt|xltx|xltm|csv)(\?.*)?$/.test(item.FileExt)) {
    return publicPath + 'fileExcel.png'
  } else if (/\.(ppt|pptx|pptm|pot|potx|potm|pps|ppsx|ppsm)(\?.*)?$/.test(item.File)) {
    return publicPath + 'filePpt.png'
  } else {
    return publicPath + 'fileOther.png'
  }
}

// 获取信息修改成前端可以显示的数据
// 主要是针对下拉框里面的数据进行转换
export function formatFromDataToView (comboboxdata, formData, keyWord) {
  let obj = Object.assign({}, formData)

  for (let key in comboboxdata) {
    let _keyWord = key.split('.')[0]
    let field = key.split('.')[1]

    if (keyWord === _keyWord && obj[field]) {
      let selectItem = comboboxdata[key]
      let TextField = selectItem['TextField']
      let ValueField = selectItem['ValueField']
      let value = obj[field]
      let dataItem = findDataItem(selectItem['Data'], value, ValueField)
      obj[field] = dataItem[TextField]
    }
  }
  return obj
}

// 获取页面显示信息修改成后端可以识别的数据
// 主要是针对下拉框里面的数据进行转换
export function formatFromDataToSave (comboboxdata, formData, keyWord) {
  let obj = Object.assign({}, formData)

  for (let key in comboboxdata) {
    let _keyWord = key.split('.')[0]
    let field = key.split('.')[1]

    if (keyWord === _keyWord && obj[field]) {
      let selectItem = comboboxdata[key]
      let TextField = selectItem['TextField']
      let ValueField = selectItem['ValueField']
      let text = obj[field]
      let dataItem = findTextItem(selectItem['Data'], text, TextField)
      obj[field] = dataItem[ValueField]
    }
  }
  return obj
}

// 组织保存表单的参数
// @obj KeyWord, comboboxdata, KeyWordType, data, formDate,FormId
export function organizeParams (objParmas) {
  let parmas = {
    JsonData: '',
    FormId: ''
  }

  let obj = {}
  let data = objParmas.data.concat()
  data = data.map((item) => {
    let objItem = Object.assign({}, item)
    item = formatFromDataToSave(
      objParmas.formAllConfig.comboboxdata,
      objItem,
      objParmas.KeyWord
    )

    if (objParmas.formDate === 'edit') {
      item['_state'] = 'modified'
    } else if (objParmas.formDate === 'add') {
      item['_state'] = 'added'
    } else if (objParmas.formDate === 'delete') {
      item['_state'] = 'removed'
    }
    return item
  })

  obj[objParmas['KeyWord']] = {
    KeyWordType: objParmas.KeyWordType || 'BO',
    data: data
  }

  parmas.JsonData = JSON.stringify(obj)
  parmas.FormId = objParmas.FormId

  return parmas
}

// 列表转换成树形结构 递归
export function listToTreeData (bootItem, Data) {
  bootItem.children = []
  Data.forEach((item) => {
    if (item.ParentId === bootItem.Id) {
      bootItem.children.push(item)
    }
  })

  if (bootItem.children.length > 0) {
    bootItem.children.forEach((item) => {
      listToTreeData(item, Data)
    })
  } else {
    return false
  }
}

// 在comboboxdata Text查询指定的数据
function findTextItem (data, text, TextField) {
  let obj = {}
  if (data.length) {
    for (let i = 0; i < data.length; i++) {
      let item = data[i]
      if (item[TextField] === text) {
        obj = item
        break
      }
    }
  }
  return obj
}

// 在comboboxdata Data查询指定的数据
function findDataItem (data, value, ValueField) {
  let obj = {}
  if (data.length) {
    for (let i = 0; i < data.length; i++) {
      let item = data[i]
      if (item[ValueField] === value) {
        obj = item
        break
      }
    }
  }
  return obj
}

// 检测是否还是持续登录的状态
function checkLoginTime (TokenMsg) {
  let nowTime = (new Date()).getTime()

  if ((nowTime - TokenMsg.exp) > 0) {
    return true
  } else {
    return false
  }
}
