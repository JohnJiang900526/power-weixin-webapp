<template>
  <transition name="slide">
    <div class="work-node-select">
      <div v-show="isShow('selectFlow')" class="before-select-content">
        <div class="workflow-select">
          <header class="header">
            <div class="title">
              流程选择
            </div>
          </header>
          <line-break></line-break>
          <ul class="select-lists">
            <li class="select-list"
                v-if="WorkFlowList.length > 0"
                v-for="(item, index) in WorkFlowList"
                @click="selectItem(index)"
                :key="index">
                <person-select-list
                  ref="personSelectList"
                  :index="index"
                  :selectType="selectType"
                  :item="item"
                  :isChecked="item.checked"
                  @selectFlowItem="selectFlowItem"
                ></person-select-list>
            </li>
          </ul>
        </div>
        <div class="person-select-bar">
          <div @click="toNextStep('nodeSelect')" class="select-bar">
            <span>下一步</span>
          </div>
          <div @click="cancel" class="select-bar">
            <span>返回</span>
          </div>
        </div>
      </div>
      <div v-show="isShow('nodeSelect')" class="node-select-content">
        <div class="node-select">
          <header class="header">
            <div class="title">
              节点选择
            </div>
            <div class="toggle-bar">
             <cube-switch class="toggle-switch" v-model="filterNormalNode"></cube-switch>
            </div>
          </header>
          <line-break></line-break>
          <ul class="node-select-lists">
            <li class="node-select-list"
                :class="{'selected': index === currentNodeList }"
                v-for="(item, index) in NodeList"
                :key="index"
                v-show="normalNodeIsShow(item)"
                @click.prevent.stop="selectNodeList(index)"
              >
              <div class="list-inner">
                <div class="list-inner-header">
                  <div class="node-name">
                    <span class="name">节点名称:</span>
                    <span class="text">{{ item.NodeName }}</span>
                  </div>
                  <div class="node-status">
                    <span class="name">节点状态:</span>
                    <span class="text">{{ tranformStatus(item.Status) }}</span>
                  </div>
                </div>
                <div class="list-inner-body">
                  <div class="node-info">
                    <span class="name">节点描述:</span>
                    <span class="text">{{ item.ShowUserInfo }}</span>
                  </div>
                  <div class="node-action">
                    <span class="name">操作:</span>
                    <span @click.prevent.stop="draftUser(index)" class="text action">{{ transformNodeListAction(item) }}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="person-select-bar">
          <div @click="toNextStep('peopleSelect')" class="select-bar">
            <span>下一步</span>
          </div>
          <div v-if="formState!== 'view'" @click="toUpStep('selectFlow')" class="select-bar">
            <span>上一步</span>
          </div>
        </div>
      </div>
      <div v-show="isShow('peopleSelect')" class="after-select-content">
        <div class="people-select">
          <header class="header">
            <div class="title">
              人员选择
            </div>
            <div class="toggle-bar">
             <cube-switch class="toggle-switch" v-model="showPeopleContent"></cube-switch>
            </div>
          </header>
          <section class="people-content" :style="{height: PeopleContentHeight}">
            <div class="next-node-list"
              v-for="(NextNodeListItem, NextNodeListIndex) in NextNodeList" :key="NextNodeListIndex"
              >
              <h1 class="node-list-title"
                @click="nodeListTitleSelect(NextNodeListIndex)"
              >
                <div class="name">{{ NextNodeListItem.NodeName }}</div>
                <div class="check-box">
                  <check-icon :checked="NextNodeListItem.checked"></check-icon>
                </div>
              </h1>
              <div v-if="NextNodeListItem.CanSelectUsers.length > 0" class="next-node-list-unit can-select-users">
                <h1 class="title">可送审人员</h1>
                <ul class="people-lists">
                  <li class="people-list"
                      v-for="(CanSelectUsersItem, CanSelectUsersIndex) in NextNodeListItem.CanSelectUsers"
                      :key="CanSelectUsersIndex"
                      @click="selectUsersEvent(NextNodeListIndex, CanSelectUsersIndex)"
                    >
                    <div class="user-name">{{ CanSelectUsersItem.UserName }}</div>
                    <div class="check-box">
                      <check-icon :checked="CanSelectUsersItem.checked"></check-icon>
                    </div>
                  </li>
                </ul>
              </div>
              <div v-if="NextNodeListItem.CanSelectCopyUsers.length > 0" class="next-node-list-unit can-select-copy-users">
                <h1 class="title">可抄送人员</h1>
                <ul class="people-lists">
                  <li class="people-list"
                       v-for="(CanSelectCopyUsersItem, CanSelectCopyUsersIndex) in NextNodeListItem.CanSelectCopyUsers"
                      :key="CanSelectCopyUsersIndex"
                      @click="selectCopyUsersEvent(NextNodeListIndex, CanSelectCopyUsersIndex)"
                    >
                    <div class="user-name">{{ CanSelectCopyUsersItem.UserName }}</div>
                    <div class="check-box">
                      <check-icon :checked="CanSelectCopyUsersItem.checked"></check-icon>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <section class="approve-text-content">
            <h1 class="text-title">审批意见</h1>
            <group class="textarea-content">
              <x-textarea
                name="description"
                v-model.trim="MindInfo"
                :max="300"
                placeholder="输入审批意见"
              ></x-textarea>
            </group>
          </section>
        </div>
        <div class="person-select-bar">
          <div @click="submitFlow" class="select-bar">
            <span>提交</span>
          </div>
          <div v-if="formState!== 'view'" @click="toUpStep('nodeSelect')" class="select-bar">
            <span>上一步</span>
          </div>
        </div>
      </div>

      <position-user-list
        ref="positionUserList"
        :subParams="positionUserParams"
        @complete="completeByDraft"
      ></position-user-list>

      <loading v-model="mx_isLoading"></loading>
      <toast v-model="mx_toastShow" type="text" :time="mx_deleyTime">{{ afterSaveMsg }}</toast>
      <alert v-model="mx_alertShow" @on-hide="MixinAlertHideEvent" :title="mx_alertTitle" :content="mx_message"></alert>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import LineBreak from 'base/line/line.vue'
import PositionUserList from 'base/position-user-list/position-user-list.vue'
import PersonSelectList from 'base/person-select-list/person-select-list.vue'
import { EFlowOperate, EFlowLineType } from 'common/js/config.js'
import { commonComponentMixin } from 'common/js/mixin.js'
import { FlowAction } from 'api/index.js'
import { XTextarea, Group, InlineXSwitch } from 'vux'
import CheckIcon from 'base/check-icon/check-icon.vue'
import { createGuid } from 'common/js/Util.js'

export default {
  name: 'workflow',
  mixins: [commonComponentMixin],
  data () {
    return {
      selectType: 'single',
      formState: '',
      query: {},
      afterSaveMsg: '',
      WorkFlowList: [],
      WorkFlow: {},
      currentWorkFlow: null,
      currentNodeList: null,
      showPeopleContent: true,
      filterNormalNode: true,
      currentStop: '',
      MindInfo: '',
      IsMindMustInput: true,
      NodeList: [],
      NextNodeList: [],
      current: {},
      positionUserParams: {},
      byDraft: {
        users: [],
        NodeCode: ''
      },
      SelectPeople: {},
      mx_isLoading: false,
      mx_message: '',
      mx_alertShow: false,
      mx_alertTitle: '提示',
      mx_toastShow: false,
      mx_deleyTime: 1000
    }
  },
  mounted () {
    this.workNodeLoad()
  },
  computed: {
    PeopleContentHeight () {
      return this.showPeopleContent ? 'calc(60% - 50px)' : '0px'
    }
  },
  methods: {
    // 执行数据加载
    workNodeLoad () {
      this.getQuery()
      if (this.query.flowOperate) {
        this.getWorkFlowData()
      }
    },
    // 获取选择的节点和人员(送审和抄送)
    getSelectedNode () {
      let array = []
      let msg = ''

      this.NextNodeList.forEach((item, index) => {
        let obj = {}
        obj.NodeCode = item.NodeCode
        obj.SendUserList = []
        obj.CopyUserList = []

        if (item.checked) {
          item.CanSelectUsers.forEach((userItem, userIndex) => {
            if (userItem.checked && userItem.checked === true) {
              let userObj = Object.assign({}, userItem)
              delete userObj.checked
              obj.SendUserList.push(userObj)
            }
          })

          item.CanSelectCopyUsers.forEach((copyUserItem, copyUserIndex) => {
            if (copyUserItem.checked && copyUserItem.checked === true) {
              let copyUserObj = Object.assign({}, copyUserItem)
              delete copyUserObj.checked
              obj.CopyUserList.push(copyUserObj)
            }
          })

          if (obj.SendUserList.length === 0 && item.IsMustNotUsers === false) {
            msg = `${item.NodeName}节点没有选择送审人员`
          }

          if (item.checked) {
            array.push(obj)
          }
        }
      })

      if (array.length === 0) {
        msg = `节点数据为空,请选择一个节点`
      }

      return {
        data: array,
        error: msg
      }
    },
    // 提交意见
    submitFlow () {
      let selectedNode = this.getSelectedNode()

      if (selectedNode.error !== '') {
        this.MixinAlertShowEvent(selectedNode.error)
        return false
      }

      if (this.IsMindMustInput && this.MindInfo === '') {
        this.MixinAlertShowEvent('审批意见不许为空')
        return false
      }

      let current = Object.assign(this.current, {
        KeyWord: this.query.KeyWord,
        KeyValue: this.query.KeyValue,
        FormId: this.query.FormId
      })

      let params = Object.assign({
        Current: current,
        FlowOperate: 'Send',
        MindInfo: this.MindInfo,
        SelectedNode: selectedNode.data,
        VoteText: '',
        VoteValue: ''
      })

      this.MinXinHttpFetch(FlowAction(JSON.stringify(params)), (response) => {
        if (response.success) {
          this.afterSaveMsg = '完成提交'
          this.mx_toastShow = true

          if (this.timer) {
            clearTimeout(this.timer)
          }

          this.timer = setTimeout(() => {
            if (this.formState === 'view') {
              this.$router.push('/workinfos')
            } else {
              this.$router.back()
            }
          }, 1000)
        } else {
          this.MixinAlertShowEvent(response.message)
        }
      })
    },
    // 抄送人员的点击事件
    selectCopyUsersEvent (a, b) {
      let NextNodeList = [...this.NextNodeList]
      let lineChecked = NextNodeList[a].checked

      if (lineChecked) {
        NextNodeList[a].CanSelectCopyUsers[b].checked =
        !NextNodeList[a].CanSelectCopyUsers[b].checked
      } else {
        this.MixinAlertShowEvent(`请先选择${this.NextNodeList[a].NodeName}节点`)
      }

      this.NextNodeList = [...NextNodeList]
    },
    // 可送审人员的点击事件
    selectUsersEvent (a, b) {
      let NextNodeList = [...this.NextNodeList]
      let lineChecked = NextNodeList[a].checked
      let allowMulitUser = NextNodeList[a].AllowMulitUser
      let SelectUserMode = NextNodeList[a].SelectUserMode

      if (lineChecked) {
        if (SelectUserMode === 'SelectAllAndDisabled') {
          this.MixinAlertShowEvent('你没有修改权限')
          return false
        }

        if (allowMulitUser) {
          NextNodeList[a].CanSelectUsers[b].checked =
          !NextNodeList[a].CanSelectUsers[b].checked
        } else {
          NextNodeList[a].CanSelectUsers.forEach((item, index) => {
            if (index === b) {
              item.checked = !item.checked
            } else {
              item.checked = false
            }
          })
        }
      } else {
        this.MixinAlertShowEvent(`请先选择${NextNodeList[a].NodeName}节点`)
      }

      this.NextNodeList = [...NextNodeList]
    },
    // 节点选择事件
    nodeListTitleSelect (index) {
      let NextNodeList = this.NextNodeList
      let checked = NextNodeList[index].checked
      let selectNodeMode = NextNodeList[index].SelectNodeMode
      let selectUserMode = NextNodeList[index].SelectUserMode

      if (selectNodeMode === 'SelectedAndDisabled') {
        this.MixinAlertShowEvent('禁止取消')
        return false
      }

      NextNodeList[index].checked = !checked

      if (!NextNodeList[index].checked) {
        NextNodeList[index].CanSelectUsers.forEach((item, index) => {
          item.checked = false
        })

        NextNodeList[index].CanSelectCopyUsers.forEach((item, index) => {
          item.checked = false
        })
      } else {
        // 判断是不是排他线
        if (NextNodeList[index].LineType === EFlowLineType.ExcludeLine) {
          NextNodeList.forEach((item, itemIndex) => {
            if (itemIndex !== index) {
              NextNodeList[itemIndex].checked = false
              NextNodeList[itemIndex].CanSelectUsers.forEach((userItem) => {
                userItem.checked = false
              })
              NextNodeList[itemIndex].CanSelectCopyUsers.forEach((copyUserItem) => {
                copyUserItem.checked = false
              })
            }
          })
        }

        if (NextNodeList[index].AllowMulitUser) {
          NextNodeList[index].CanSelectUsers.forEach((item, index) => {
            if (selectUserMode === 'SelectAllAndDisabled') {
              item.checked = true
            } else {
              item.checked = false
            }
          })
        }

        if (NextNodeList[index].CanSelectUsers.length === 1) {
          NextNodeList[index].CanSelectUsers[0].checked = true
        }

        NextNodeList[index].CanSelectCopyUsers.forEach((item, index) => {
          item.checked = false
        })
      }

      this.NextNodeList = NextNodeList.concat()
    },
    // 同意
    getSelectPeople (flow) {
      let obj = Object.assign({}, {
        WorkInfoID: this.query.WorkInfoID,
        FormId: this.query.FormId,
        KeyWord: this.query.KeyWord,
        KeyValue: this.query.KeyValue,
        SequeID: this.query.SequeID
      })

      if (this.query.WorkInfoID) {
        obj = Object.assign(obj, {
          WorkInfoID: this.query.WorkInfoID
        })
      }

      if (this.query.GroupID) {
        obj = Object.assign(obj, {
          GroupID: this.query.GroupID
        })
      }

      let params = {
        Current: obj,
        FlowOperate: EFlowOperate.SupplyInstance,
        SubOperate: 'ReadSendNodeList'
      }

      this.MinXinHttpFetch(FlowAction(JSON.stringify(params)), (response) => {
        let value = response.data.value
        let NextNodeList = []
        let NodeList = []

        if (value) {
          this.SelectPeople = Object.assign({}, value)

          NextNodeList = value.NextNodeList.concat()
          NodeList = value.NodeList ? value.NodeList.concat() : []
        }

        this.current = Object.assign({}, value.Current)
        this.NextNodeList = this.formatNextNodeList(NextNodeList)
        this.NodeList = NodeList
      })
    },
    // 组织数据，添加权限
    formatNextNodeList (array) {
      let arr = []

      array.forEach((item, index) => {
        this.IsMindMustInput = item.IsMindMustInput
        // if SelectNodeMode === 'SelectedNode | 'SelectedAndDisabled'
        // 必选 checked = true
        if (
          item.SelectNodeMode === 'SelectedNode' ||
          item.SelectNodeMode === 'SelectedAndDisabled'
        ) {
          item.checked = true
        } else {
          item.checked = false
        }

        // if 节点长度等于1 默认选中
        if (array.length === 1) {
          array[0].checked = true
        }

        // 在允许多选的情况下， 可送审人员默认不选中
        if (item.SelectUserMode === 'DeselectAll') {
          item.CanSelectUsers.forEach((userItem, userIndex) => {
            userItem.checked = false
          })
        } else if (
          item.SelectUserMode === 'SelectAll' ||
          item.SelectUserMode === 'SelectAllAndDisabled') {
          item.CanSelectUsers.forEach((userItem, userIndex) => {
            userItem.checked = true
          })
        } else {
          item.CanSelectUsers.forEach((userItem, userIndex) => {
            if (item.DefaultUserID === userItem.UserID) {
              userItem.checked = true
            } else {
              userItem.checked = false
            }
          })
        }

        // 如果可抄送人员，默认不选中 个人感觉默认不选中才合理 PC端是默认全部选中
        item.CanSelectCopyUsers.forEach((copyUsersItem, copyUsersIndex) => {
          copyUsersItem.checked = false
        })

        if (!item.IsCancel) {
          arr.push(item)
        }
      })

      return arr
    },
    // 下一步的操作
    toNextStep (step) {
      let flow = this.getCurrentFlowItem()

      if (step === 'selectFlow') {
        this.currentStop = step
      } else {
        this.currentStop = step
      }

      if (step === 'peopleSelect') {
        this.getSelectPeople(flow)
      }
    },
    // 上一步的操作
    toUpStep (step) {
      let selectPeople = this.SelectPeople
      if (!selectPeople.IsByDraft) {
        this.currentStop = 'peopleSelect'
        this.MixinAlertShowEvent('不需要返回上一步')
      } else {
        this.currentStop = step
      }
    },
    // 获取选择的流程数据
    getCurrentFlowItem () {
      let obj = null
      for (let i = 0; i < this.WorkFlowList.length; i++) {
        if (this.WorkFlowList[i].checked) {
          obj = Object.assign({}, this.WorkFlowList[i])
          break
        }
      }
      return obj
    },
    // 获取流程数据
    getWorkFlowData () {
      let params = {
        KeyWord: this.query.KeyWord,
        KeyValue: this.query.KeyValue,
        FormId: this.query.FormId,
        FlowOperate: EFlowOperate.SelectFlow,
        SequeID: this.query.SequeID
      }

      this.MinXinHttpFetch(FlowAction(JSON.stringify(params)), (response) => {
        let value = response.data.value
        let WorkFlowList = []

        this.WorkFlow = value
        if (value && value.WorkFlowList) {
          WorkFlowList = value.WorkFlowList.concat()
        } else {
          WorkFlowList = []
        }

        WorkFlowList.map((item, index) => {
          if (value.WorkFlowID === item.WorkFlowID) {
            item.checked = true
          } else {
            item.checked = false
          }
        })

        this.WorkFlowList = WorkFlowList

        if (WorkFlowList.length === 1 && WorkFlowList[0].IsAutoSelect) {
          this.$nextTick(() => {
            this.$refs.personSelectList[0].setChecked()
          })
        }

        if (this.timer) {
          clearTimeout(this.timer)
        }

        this.timer = setTimeout(() => {
          this.toNextStep('peopleSelect')
        }, 300)
      })
    },
    // 选择一条流程 当前组件调用
    selectItem (index) {
      this.$refs.personSelectList.forEach((item, ItemIndex) => {
        if (index === ItemIndex) {
          this.$refs.personSelectList[ItemIndex].setChecked()
        } else {
          this.$refs.personSelectList[ItemIndex].setCheckedDefault()
        }
      })
    },
    // 选择一条流程 给子组件调用
    selectFlowItem (selectItem, checked, selectIndex) {
      if (checked) {
        this.WorkFlowList[selectIndex].checked = true
      } else {
        this.WorkFlowList[selectIndex].checked = false
      }
    },
    // 获取岗位人员
    getPositionAndUserList (row) {
      let flow = this.getCurrentFlowItem()
      let current = Object.assign({}, {
        WorkFlowID: flow.WorkFlowID,
        Version: flow.Version,
        FormId: this.query.FormId,
        KeyWord: this.query.KeyWord,
        KeyValue: this.query.KeyValue,
        WorkInfoID: flow.WorkInfoID ? flow.WorkInfoID : createGuid()
      })

      this.positionUserParams = Object.assign({}, {
        SubOperate: 'SaveUserToInstanNode',
        FlowOperate: 'SupplyFlow',
        Current: current,
        ConfigUserList: [],
        NodeCode: row.NodeCode
      })

      this.$refs.positionUserList.load()
    },
    // 节点选择的时候选择节点
    selectNodeList (index) {
      this.currentNodeList = index
    },
    // 选择当前列表
    draftUser (index) {
      this.currentNodeList = index

      let row = this.NodeList[index]
      let UserList = row.UserList
      let SendUserMode = row.SendUserMode
      if (SendUserMode === 'ByDraft') {
        if (UserList) {
          if (UserList.length === 0) {
            this.getPositionAndUserList(row)
          }
        } else {
          this.getPositionAndUserList(row)
        }
      }
    },
    // 完成起草
    completeByDraft (obj) {
      this.byDraft = Object.assign({}, obj)
    },
    // 是否显示正常节点
    normalNodeIsShow (row) {
      if (row.SendUserMode === 'Normal' && this.filterNormalNode) {
        return false
      } else {
        return true
      }
    },
    // 转变NodeList的action操作
    transformNodeListAction (row) {
      let userList = row.UserList
      let sendUserMode = row.SendUserMode

      if (userList) {
        let UserList = JSON.parse(userList)
        if (sendUserMode === 'ByDraft') {
          if (UserList.length === 0) {
            return '选择人员'
          } else if (UserList.length > 0) {
            return '二次筛选'
          }
        } else if (sendUserMode === 'ByMainNode') {
          if (UserList.length === 0) {
            return '选择人员'
          } else if (UserList.length > 0) {
            return '二次筛选'
          }
        } else if (sendUserMode === 'BySendUser') {
          return '发送时定义'
        }
      } else if (!userList) {
        if (sendUserMode === 'ByDraft') {
          return '选择人员'
        } else if (sendUserMode === 'ByMainNode') {
          return '选择人员'
        } else if (sendUserMode === 'BySendUser') {
          return '发送时定义'
        }
      }
    },
    // 转变状态的显示
    tranformStatus (status) {
      return status === true ? '正常' : '异常'
    },
    // 获取路由中的参数
    getQuery () {
      let query = this.$router.history.current.query
      if (query) {
        this.query = Object.assign({}, query)

        this.formState = this.query.FormState
      }
    },
    // 控制步奏的显示
    isShow (stop) {
      return this.currentStop === stop
    },
    cancel () {
      // 清空选择的数据
      this.$refs.personSelectList.forEach((item, ItemIndex) => {
        this.$refs.personSelectList[ItemIndex].setCheckedDefault()
        this.WorkFlowList[ItemIndex].checked = false
      })
      // 返回路由
      this.$router.back()
    }
  },
  components: {
    PersonSelectList,
    XTextarea,
    Group,
    InlineXSwitch,
    CheckIcon,
    LineBreak,
    PositionUserList
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .work-node-select {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    width: 100%;
    background-color: #EBEBEB;
    &.slide-enter-active, &.slide-leave-active{
      transition: all 0.3s
    }
    &.slide-enter, &.slide-leave-to{
      transform: translate3d(100%, 0, 0)
    }
    .before-select-content, .node-select-content, .after-select-content {
      width: 100%;
      height: 100%;
    }
    .before-select-content, .node-select-content, .after-select-content {
      .workflow-select, .people-select, .node-select{
        width: 100%;
        height: calc(100% - 45px);
        overflow-y: auto;
        .select-lists {
          .select-list {
            margin-bottom: 10px;
          }
        }
      }
      .workflow-select, .node-select,.people-select {
        .header {
          display: flex;
          width: 100%;
          background-color: #ffffff;
          line-height: 40px;
          .title {
            min-width: 0px;
            flex: 1;
            padding: 0 10px;
            font-size: 16px;
            color: rgba(0, 0, 0, 0.8);
          }
          .toggle-bar {
            min-width: 0px;
            flex: 0 0 60px;
            width: 60px;
            height: 40px;
            text-align: center;
            position: relative;
            .toggle-switch {
              .positionCenter();
              .cube-switch-ui {
                background-color: #09BB07;
                border-color: #09BB07;
              }
            }
          }
        }
        .people-content {
          margin-top: 10px;
          height: calc(60% - 50px);
          background-color: #ffffff;
          overflow-y: auto;
          transition: all 0.3s;
          .next-node-list {
            border-bottom: 20px solid #EBEBEB;
            .node-list-title {
              padding: 10px;
              font-size: 14px;
              display: flex;
              border-left: 3px solid #09BB07;
              .name {
                flex: 1;
                min-width: 0px;
              }
              .check-box {
                flex: 0 0 30px;
                position: relative;
                .vux-check-icon {
                  .positionCenter();
                }
              }
            }
            .next-node-list-unit {
              .title {
                padding: 10px;
                font-size: 14px;
                background-color: #f1f1f1;
              }
              .people-lists {
                padding: 0 10px;
                .people-list {
                  padding: 12px 0;
                  font-size: 14px;
                  display: flex;
                  .bottom-line();
                  &:last-child {
                    .no-bottom-line();
                  }
                  .user-name {
                    flex: 1;
                    min-width: 0px;
                  }
                  .check-box {
                    flex: 0 0 30px;
                    position: relative;
                    .vux-check-icon {
                      .positionCenter();
                    }
                  }
                }
              }
            }
          }
        }
        .approve-text-content {
          .text-title {
            padding: 10px;
            font-size: 16px;
          }
          .textarea-content .weui-cells {
            margin-top: 0;
          }
        }
      }
      .node-select, .node-select-lists, .node-select-list, .list-inner{
        width: 100%;
      }
      .node-select .node-select-lists .node-select-list {
        margin-bottom: 10px;
        background-color: #ffffff;
        &.selected {
          background-color: #dddddd;
        }
      }
      .node-select-list .list-inner {
        .name {
          color:#007ACC;
          opacity: 0.7;
        }
        .text {
          color: rgba(0, 0, 0, 0.6);
          &.action {
            color: #295AA6;
          }
        }
        .list-inner-header {
          display: flex;
          width: 100%;
          padding: 5px;
          font-size: 14px;
          .node-name {
            flex: 1;
            min-width: 10px;
            .css3-ellipsis();
          }
          .node-status {
            flex: 0 0 100px;
            min-width: 10px;
            text-align: center;
          }
        }
        .list-inner-body {
          width: 100%;
          font-size: 14px;
          .node-info {
            padding: 5px;
          }
          .node-action {
            padding: 10px 5px;
          }
        }
      }
      .person-select-bar {
        display: flex;
        .top-line();
        background-color: #ffffff;
        font-size: 16px;
        .select-bar {
          flex: 1;
          line-height: 45px;
          text-align: center;
          &:first-child {
            border-right: 1px solid #dddddd;
          }
        }
      }
    }
  }
</style>
