// 系统配置
export const systemConfig = {
  devDomainName: 'http://pm.chmc.ltd:8482',
  // 重机 http://pm.chmc.ltd:8482
  // 吴石磊 http://192.168.55.105:8053
  // 重机测试服务器 http://zj.goodr.cn:8482  admin CHMC123chmc | passw0rd123
  // 北京服务器 http://bj.goodr.cn:8003
  imgBaseUrl: '/PowerPlat/Control/File.ashx?action=browser&_type=ftp&_fileid=',
  fontMap: [
    {
      font: 'fa fa-bandcamp',
      bg: '#295AA6'
    }, {
      font: 'fa fa-bath',
      bg: '#51BDBD'
    }, {
      font: 'fa fa-envelope-open',
      bg: '#FEAD6B'
    }, {
      font: 'fa fa-etsy',
      bg: '#F784A5'
    }, {
      font: 'fa fa-meetup',
      bg: '#CEB559'
    }, {
      font: 'fa fa-quora',
      bg: '#30B5D6'
    }, {
      font: 'fa fa-ravelry',
      bg: '#4B4221'
    }, {
      font: 'fa fa-snowflake-o',
      bg: '#A6BE42'
    }, {
      font: 'fa fa-superpowers',
      bg: '#8DC584'
    }, {
      font: 'fa fa-anchor',
      bg: '#C5D64A'
    }, {
      font: 'fa fa-archive',
      bg: '#FEF79C'
    }, {
      font: 'fa fa-area-chart',
      bg: '#85AD32'
    }, {
      font: 'fa fa-asterisk',
      bg: '#BDDDCE'
    }, {
      font: 'fa fa-at',
      bg: '#637B7B'
    }, {
      font: 'fa fa-balance-scale',
      bg: '#6A5252'
    }, {
      font: 'fa fa-bank',
      bg: '#4B4221'
    }, {
      font: 'fa fa-bar-chart',
      bg: '#3AA45A'
    }, {
      font: 'fa fa-bars',
      bg: '#102119'
    }, {
      font: 'fa fa-bell',
      bg: '#DEE6CE'
    }, {
      font: 'fa fa-binoculars',
      bg: '#738CC5'
    }, {
      font: 'fa fa-bolt',
      bg: '#31317B'
    }, {
      font: 'fa fa-bomb',
      bg: '#8B9CA4'
    }, {
      font: 'fa fa-bookmark',
      bg: '#732163'
    }, {
      font: 'fa fa-bullhorn',
      bg: '#295AA6'
    }, {
      font: 'fa fa-coffee',
      bg: '#0094AF'
    }
  ]
}

// 登录需要的参数
export const loginParams = {
  UserCode: '',
  UserPass: '',
  Language: 'zh-cn'
}

// 缓存的时候，需要加的缓存头
export const localStorageTag = '_weixin_'

// 指令集
export const EFlowOperate = {
  // 无操作
  None: 'None',
  // 保存操作
  Insert: 'Insert',
  // 修改操作
  Update: 'Update',
  // 删除操作
  Delete: 'Delete',
  // 发送操作
  Send: 'Send',
  // 回退操作
  Return: 'Return',
  // 签批操作
  EndFlow: 'EndFlow',
  // 回收操作
  GetBack: 'GetBack',
  // 撤销办结
  UnEndFlow: 'UnEndFlow',
  // 直接委派操作
  Delegate: 'Delegate',
  // 提取流程列表
  SelectFlow: 'SelectFlow',
  // 终止流程
  Stop: 'Stop',
  // 激活流程
  Active: 'Active',
  // 流程监控
  ShowMonitor: 'ShowMonitor',
  // 流程监控
  ShowHistoryMonitor: 'ShowHistoryMonitor',
  // 挂起
  HangUp: 'HangUp',
  // 撤销挂起
  UnHangUp: 'UnHangUp',
  // 延期
  DelayDate: 'DelayDate',
  // 读取流程信息
  ReadFlow: 'ReadFlow',
  // 读取和处理流程节点信息，比如起草者定义时
  SupplyFlow: 'SupplyFlow',
  // 处理配置级信息
  SupplyDesign: 'SupplyDesign',
  // 处理流转级
  SupplyInstance: 'SupplyInstance',
  // 处理文件箱，不针对某个具体的 workinfoid 实例
  WorkList: 'WorkList',
  // 自定义代码系列
  Events: 'Events',
  // 子流程专用域
  SubFlow: 'SubFlow',
  // 外部扩展，自定义代码
  Customs: 'Customs',
  // 废弃操作
  Scrap: 'Scrap',
  // 批量发送
  BatchSends: 'BatchSends',
  // 报表系列
  Reports: 'Reports',
  // 转发操作
  Forward: 'Forward'
}

// 按钮许可枚举，用与、或算法可以多选 参考PC端
export const ECanFlowOperate = {
  // 无操作
  None: 1,
  // 保存操作
  Insert: 2,
  // 修改操作
  Update: 4,
  // 删除操作
  Delete: 8,
  // 发送操作
  Send: 16,
  // 回退操作
  Return: 32,
  // 签批操作
  EndFlow: 64,
  // 回收操作
  GetBack: 128,
  // 撤销办结
  UnEndFlow: 256,
  // 直接委派操作
  Delegate: 512,
  // 委派中的人的操作
  Delegateing: 1024,
  // 终止流程
  Stop: 2048,
  // 激活流程
  Active: 4096,
  // 流程监控
  ShowMonitor: 8192,
  // 历史流程监控
  ShowHistoryMonitor: 16384,
  // 挂起
  HangUp: 32768,
  // 撤销挂起
  UnHangUp: 65536,
  // 延期
  DelayDate: 131072,
  // 废弃
  Scrap: 67108864,
  // 批量发送
  BatchSends: 134217728,
  // 转发
  Forward: 536870912
}

// 流程图节点
export const EFlowNodeType = {
  // 起草节点
  StartNode: 10,
  // 结束节点
  EndNode: 20,
  // 普通节点
  GeneralNode: 30,
  // 汇合节点
  ConvergeNode: 40,
  // 并发节点
  ConcurrentNode: 50,
  // 分支节点
  BranchNode: 60,
  // 分发节点
  GeneralMultiNode: 70,
  // 子流程
  SubNode: 100
}

export const EFlowLineType = {
  // 普通线路
  MainLine: 10,
  // 排他线路
  ExcludeLine: 20
}

export const EBookMarkType = {
  // 普通标签
  Normal: 10,
  // 节点标签
  Node: 20,
  // 连线标签
  Line: 30
}

export const EEventType = {
  // 引用域
  UsingCode: 'UsingCode',
  // 自定义代码
  CustomCode: 'CustomCode',
  // 其他事件
  Other: 'Other',
  // 流程事件
  WorkFlowEvent: 'WorkFlowEvent',
  // 流程事件
  WorkInstanceEvent: 'WorkInstanceEvent',
  // 节点普通事件
  NodeEvent: 'NodeEvent',
  // 连线普通事件
  LineEvent: 'LineEvent',
  // 子流程事件
  SubNodeEvent: 'SubNodeEvent'
}

export const EFlowRecordStatus = {
  // 完成状态
  Finish: 50,
  // 流转状态
  Flowing: 20,
  // 初始起草状态(此时尚未选择工作流, 没有WorkFlowID/Version)
  Create: 10,
  // 初始起草状态(创建),已经绑定了工作流，但未执行过发送
  Initial: 15,
  // 挂起等候状态
  Waiting: 30,
  // 终止状态
  Stop: 40,
  // 隐藏状态，并发时用到
  Hidden: 60,
  // 废弃状态
  Scrap: 70,
  // 默认空状态
  None: 100
}

export const EFlowInboxStatus = {
  // 空状态，默认
  None: 10,
  // 隐藏状态
  Hidden: 30,
  // 正常状态
  Normal: 20,
  // 等候解锁
  WaitingUnlock: 50,
  // 等候签收
  WaitingSign: 40,
  // 本线支路结束
  WorkEnd: 60,
  // 终止
  WorkStop: 70,
  // 委派
  Delegated: 80
}

// 节点发送模式
export const ESendUserMode = {
  // 正常
  Normal: 10,
  // 起草者定义
  ByDraft: 20,
  // 发送者定义
  BySendUser: 30
}
export const ESourceMode = {
  // 部门用户
  DeptAndUser: 'DeptAndUser',
  // 岗位用户
  PositionAndUser: 'PositionAndUser',
  // 部门
  Dept: 'Dept',
  // 岗位
  Position: 'Position'
}

// 人员定义模式
export const EUserMode = {
  // 空
  None: 'None',
  // 1.指定岗位，动态获取人员
  Position: 'Position',
  // 2.指定部门，动态获取人员
  Dept: 'Dept',
  // 3.指定岗位中人员
  PositionAndUser: 'PositionAndUser',
  // 4.指定部门中人员
  DeptAndUser: 'DeptAndUser',
  // 5. 特殊用户岗位提取模式定义
  SpecialPositionUser: 'SpecialPositionUser',
  // 6. 特殊用户部门提取模式定义
  SpecialDeptUser: 'SpecialDeptUser',
  // 7.1 当前操作者的??
  CurrentOperateOne: 'CurrentOperateOne',
  // 7.2 当前操作者的??
  CurrentOperateTwo: 'CurrentOperateTwo',
  // 7.1 当前操作者的??
  CurrentOperateThree: 'CurrentOperateThree',
  // 7.2 当前操作者的??
  CurrentOperateFour: 'CurrentOperateFour',
  // 8.1 指定节点的??
  AssignNodeOne: 'AssignNodeOne',
  // 8.2 指定节点的??
  AssignNodeTwo: 'AssignNodeTwo',
  // 8.3 指定节点的??
  AssignNodeThree: 'AssignNodeThree',
  // 8.4 指定节点的??
  AssignNodeFour: 'AssignNodeFour',
  // 8.5 指定节点的??
  AssignNodeFive: 'AssignNodeFive'
}

// 人员身份
export const EUserType = {
  // 空，默认
  None: 1,
  // 起草人
  DraftMan: 2,
  // 当前经手人
  HandleMan: 4,
  // 历史经手人
  HaveHandledMan: 8,
  // 办结人
  FinishMan: 16,
  // 游客
  Guest: 32
}

// 子流程节点模式
export const ESubNodeMode = {
  // 线程模式
  ThreadMode: 'ThreadMode',
  // 进程模式
  ProcessMode: 'ProcessMode'
}

// 询问模式定义
export const EEachCommand = {
  // 空，默认,不做任何询问
  None: 1,
  // <summary>
  //  询问序号
  // </summary>
  // 询问序号
  AskSequ: 10,
  // 询问是否强制退回
  AskReturn: 20,
  /// <summary>
  /// 认可
  /// </summary>
  // 认可
  Accept: 30,
  /// <summary>
  /// </summary>
  // 询问模式
  Asking: 40
}

// 表单里面的操作按钮
export const formActionMenuPre = [{
  label: '保存',
  value: 'SaveForm',
  index: 0,
  num: null,
  enable: true
}, {
  label: '监控',
  value: 'ShowMonitor',
  num: 8192,
  index: 1,
  enable: true
}, {
  label: '送审',
  value: 'Active',
  num: 4096,
  index: 2,
  enable: true
}, {
  label: '回收',
  value: 'GetBack',
  num: 128,
  index: 3,
  enable: true
}, {
  label: '同意',
  value: 'Send',
  num: 16,
  index: 4,
  enable: true
}, {
  label: '批量同意',
  value: 'BatchSends',
  num: 134217728,
  index: 5,
  enable: false
}, {
  label: '驳回',
  value: 'Return',
  num: 32,
  index: 6,
  enable: true
}, {
  label: '终止',
  value: 'Stop',
  num: 2048,
  index: 7,
  enable: true
}, {
  label: '作废',
  value: 'Scrap',
  num: 67108864,
  index: 8,
  enable: false
}, {
  label: '委派',
  value: 'Delegate',
  num: 1024,
  index: 9,
  enable: true
}, {
  label: '委派反馈',
  value: 'Delegateing',
  num: 1024,
  enable: true,
  index: 10
}, {
  label: '历史',
  value: 'ShowHistoryMonitor',
  num: 16384,
  index: 11,
  enable: true
}, {
  label: '挂起',
  value: 'HangUp',
  num: 32768,
  index: 12,
  enable: false
}, {
  label: '撤销挂起',
  value: 'UnHangUp',
  num: 65536,
  index: 13,
  enable: false
}, {
  label: '延期',
  value: 'DelayDate',
  num: 131072,
  index: 14,
  enable: false
}, {
  label: '撤销办结',
  value: 'UnEndFlow',
  num: 256,
  index: 15,
  enable: false
}]
