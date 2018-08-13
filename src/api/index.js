import { getTokenString } from 'api/login.js'
import { APIUnit } from './APIUnit.js'
import axios from 'axios'
import { systemConfig } from 'common/js/config'

// 判断运行环境 是在开发中还是在生产环境中
const debug = process.env.NODE_ENV !== 'production'

// 获取基础数据BaseDataList@DataType
export function BaseDataList (DataType) {
  const API = '/Hoter/BaseDataList'
  const params = {
    Token: getTokenString(),
    DataType: DataType
  }
  return APIUnit(API, params)
}

// 通过关键词及关键字获取当前业务对象的所有数据(含子表)@KeyWord,KeyValue
export function BusinessDataLoad (obj) {
  const API = '/Hoter/BusinessDataLoad'
  const params = {
    Token: getTokenString(),
    KeyWord: obj.KeyWord,
    KeyValue: obj.KeyValue
  }
  return APIUnit(API, params)
}

// 执行退出
export function ChangePass (OldPass, NewPass) {
  const API = '/Hoter/ChangePass'
  const params = {
    Token: getTokenString(),
    OldPass: OldPass,
    NewPass: NewPass
  }
  return APIUnit(API, params)
}

// 获取EpsProjects
export function getEpsProjects () {
  const API = '/Hoter/EpsProjects'
  const params = {
    Token: getTokenString()
  }
  return APIUnit(API, params)
}

// 加载表单数据(含配置的子表)@FormId,KeyValue,extparams(缺省)
export function FormData (obj) {
  const API = '/Hoter/FormData'
  const params = {
    Token: getTokenString(),
    FormId: obj.FormId,
    KeyValue: obj.KeyValue || '',
    extparams: obj.extparams
  }
  return APIUnit(API, params)
}

// 获取FormId对应的Config配置文件@FormId,FormState,KeyValue
export function FormInit (obj) {
  const API = '/Hoter/FormInit'
  const params = {
    Token: getTokenString(),
    FormId: obj.FormId,
    KeyValue: obj.KeyValue || '',
    FormState: obj.FormState
  }
  params.Token = getTokenString()
  params.FormId = obj.FormId
  params.KeyValue = obj.KeyValue || ''
  params.FormState = obj.FormState
  return APIUnit(API, params)
}

//  加载表单单条数据@KeyWord,KeyWordType,KeyValue,select,formstate
// (KeyValue为空,表示获取一条新增记录,formstate:view/add/edit 3个值)
export function FormLoad (obj) {
  const API = '/Hoter/FormLoad'
  const params = {
    Token: getTokenString(),
    KeyWord: obj.KeyWord,
    KeyValue: obj.KeyValue || '',
    KeyWordType: obj.KeyWordType || 'BO',
    swhere: obj.swhere,
    select: obj.select,
    formstate: obj.formstate
  }
  return APIUnit(API, params)
}

// 保存表单数据@JsonData(表单json格式参数),
// FormId,Encode(缺省参数是否base64编码true,base),Params
// (缺省参数json对象base64编码后的字符串)
export function FormSave (obj) {
  const API = '/Hoter/FormSave'
  const params = {
    Token: getTokenString(),
    JsonData: obj.JsonData,
    FormId: obj.FormId,
    Encode: obj.Encode,
    Params: obj.Params
  }
  return APIUnit(API, params)
}

// string Token, string JsonData, string FormId
export function FormSave2 (obj) {
  const API = '/Hoter/FormSave2'
  const params = {
    Token: getTokenString(),
    JsonData: obj.JsonData,
    FormId: obj.FormId
  }
  return APIUnit(API, params)
}

// 读取附件信息@KeyWord,KeyValue,index,size, sort, select,swhere
export function GetDocFiles (obj) {
  const API = '/Hoter/GetDocFiles'
  const params = {
    Token: getTokenString(),
    KeyWord: obj.KeyWord,
    KeyValue: obj.KeyValue,
    index: obj.index,
    size: obj.size,
    sort: obj.sort,
    select: obj.select,
    swhere: obj.swhere
  }
  return APIUnit(API, params)
}

// 加载窗体列表数据,包含缺省权限
// @KeyWord,KeyWordType,select,swhere,sort,index,size,extparams
export function GridPageLoad (obj) {
  const API = '/Hoter/GridPageLoad'
  let params = {
    Token: getTokenString(),
    KeyWord: '',
    KeyWordType: 'BO',
    index: '',
    size: '',
    swhere: '',
    select: '',
    sort: '',
    extparams: ''
  }
  params = Object.assign(params, obj)
  return APIUnit(API, params)
}

// 执行退出
export function LoginOut () {
  const API = '/Hoter/Logout'
  const params = {
    Token: getTokenString()
  }
  return APIUnit(API, params)
}

// 获取菜单信息信息
export function getMenu () {
  const API = '/Hoter/Menu'
  const params = {
    Token: getTokenString()
  }
  params.Token = getTokenString()
  return APIUnit(API, params)
}

// MenuWidget 获取指定菜单下有权限的Widget列表
export function MenuWidget (MenuId) {
  const API = '/Hoter/MenuWidget'
  const params = {
    Token: getTokenString(),
    MenuId: MenuId
  }
  return APIUnit(API, params)
}

// 获取当前登录用户的个人通知、消息、待办记录总数infos@HumanId(可缺省)
export function MyInformCount (HumanId) {
  const API = '/Hoter/MyInformCount'
  const params = {
    Token: getTokenString(),
    HumanId: HumanId
  }
  return APIUnit(API, params)
}

// 获取当前人员的个人消息，包括已读、未读、发送
// @types(infos,actived,joins),index,size,swhere
export function MyMessageInfos (obj) {
  const API = '/Hoter/MyMessageInfos'
  let params = {
    Token: getTokenString(),
    types: '',
    index: '',
    size: '',
    swhere: ''
  }
  params = Object.assign(params, obj)
  return APIUnit(API, params)
}

// 获取当前人员的个人通知，包括待处理的、已处理的、我发起的
// @types(infos,actived,joins),index,size,swhere
export function MyNotifyInfos (obj) {
  const API = '/Hoter/MyNotifyInfos'
  let params = {
    Token: getTokenString(),
    types: '',
    index: '',
    size: '',
    swhere: ''
  }
  params = Object.assign(params, obj)
  return APIUnit(API, params)
}

// 获取当前登录用户 待审批、发起、参与的流程信息
// @types(infos/actived/join:
// 我的待审批/我发起的流程/我参与的流程),
// index,size,swhere,humanid(可缺省)
export function MyWorkInfos (obj) {
  const API = '/Hoter/MyWorkInfos'
  let params = {
    Token: getTokenString(),
    types: '',
    index: '',
    size: '',
    swhere: '',
    humanid: ''
  }
  params = Object.assign(params, obj)
  return APIUnit(API, params)
}

// 密码强度规则
export function PassRole () {
  const API = '/Hoter/PassRole'
  const params = {
    Token: getTokenString()
  }
  return APIUnit(API, params)
}

// ProjectInfo
export function ProjectInfo (ProjectGuid) {
  const API = '/Hoter/ProjectInfo'
  const params = {
    Token: getTokenString(),
    ProjectGuid: ProjectGuid
  }
  return APIUnit(API, params)
}

// 切换项目
export function SwitchEpsProject (ProjectGuid) {
  const API = '/Hoter/SwitchEpsProject'
  const params = {
    Token: getTokenString(),
    ProjectGuid: ProjectGuid
  }
  return APIUnit(API, params)
}

// 更新人员信息
export function UpdHumanInfo (HumanInfo) {
  const API = '/Hoter/UpdHumanInfo'
  const params = {
    Token: getTokenString(),
    HumanInfo: JSON.stringify(HumanInfo)
  }
  return APIUnit(API, params)
}

// 获取UserInfo信息
export function getUserInfo () {
  const API = '/Hoter/UserInfo'
  const params = {
    Token: getTokenString()
  }
  return APIUnit(API, params)
}

// 删除附件
// _type=default&action=delete&_fileid=' + id
export function deleteFileTatch (obj) {
  let api = '/PowerPlat/Control/File.ashx'
  let url = debug ? systemConfig.devDomainName + api : api
  let params = {
    _type: 'default',
    action: 'delete',
    _fileid: ''
  }
  params = Object.assign(params, obj)
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then((response) => {
      resolve(response.data)
    }).catch((e) => {
      reject(e)
    })
  })
}
