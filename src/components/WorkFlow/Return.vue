<template>
  <transition name="slide">
    <div class="work-flow-return">
      <div class="flow-return-content">
        <div class="return-content">
          <h1 class="title font-color-active">人员选择:</h1>
          <div class="return-user-row"
            v-for="(item, index) in NextNodeList" :key="index"
            >
            <h1 @click="selectedNodeEvent(index)" class="row-title">
              <div class="text font-color-active">{{ item.NodeName }}</div>
              <div class="icon">
                <check-icon :checked="item.checked"></check-icon>
              </div>
            </h1>
            <ul class="row-lists"
              v-for="(itemList, itemIndex) in item.ItemList" :key="itemIndex"
              >
              <li class="row-list"
                v-for="(userItem, userIndex) in itemList.UserList" :key="userIndex"
                @click="selectedUser(index, itemIndex, userIndex)"
                >
                <div class="row-list-inner">
                  <div class="text">{{ userItem.UserName }}</div>
                  <div class="icon">
                    <check-icon :checked="userItem.checked"></check-icon>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="method-content">
          <h1 class="title font-color-active">发送模式:</h1>
          <ul class="method-lists">
            <li class="method-list"
              v-for="(item, index) in method" :key="index"
              @click="switchMethods(index)"
              >
              <div class="list-inner">
                <div class="text">
                  {{ item.text }}
                </div>
                <div class="icon">
                  <check-icon :checked="item.checked"></check-icon>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="mind-info-content">
          <h1 class="title font-color-active">提交意见:</h1>
          <group class="textarea-content">
            <x-textarea
                name="description"
                v-model.trim="MindInfo"
                :max="300"
              placeholder="输入驳回意见"
            ></x-textarea>
          </group>
        </div>
      </div>
      <div class="flow-return-footer">
        <div @click="submitData" class="item">
          提交
        </div>
        <div @click="goBack" class="item">
          返回
        </div>
      </div>
      <loading v-model="mx_isLoading"></loading>
      <toast v-model="mx_toastShow" type="text" :time="mx_deleyTime">{{ afterSaveMsg }}</toast>
      <alert v-model="mx_alertShow" @on-hide="MixinAlertHideEvent" :title="mx_alertTitle" :content="mx_message"></alert>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import LineBreak from 'base/line/line.vue'
import CheckIcon from 'base/check-icon/check-icon.vue'
import { XTextarea, Group } from 'vux'
import { commonComponentMixin } from 'common/js/mixin.js'
import { FlowAction } from 'api/index.js'

export default {
  name: 'workflow',
  mixins: [commonComponentMixin],
  data () {
    return {
      query: {},
      formState: '',
      method: [
        {
          text: '正常驳回',
          Code: 'Normal',
          checked: true
        },
        {
          text: '直接送还本节点(点对点)',
          Code: 'MustSendCurrent',
          checked: false
        },
        {
          text: '正常驳回，且收件人只能常规发送',
          Code: 'MustReturnAndNormal',
          checked: false
        }
      ],
      NextNodeList: [],
      HistoryMind: [],
      MindInfo: '',
      Current: {},
      afterSaveMsg: '',
      mx_isLoading: false,
      mx_message: '',
      mx_alertShow: false,
      mx_alertTitle: '提示',
      mx_toastShow: false,
      mx_deleyTime: 1000
    }
  },
  mounted () {
    this.getReturnData()
  },
  methods: {
    // 提交数据
    submitData () {
      let mindInfo = this.MindInfo
      let selectedNode = this.getSelectedNodeData()
      let valid = this.valiData(mindInfo, selectedNode)

      if (!valid.pass) {
        this.MixinAlertShowEvent(valid.msg)
        return valid.pass
      }

      let params = Object.assign({}, {
        FlowOperate: 'Return',
        Current: this.Current,
        MindInfo: this.MindInfo,
        SelectedNode: selectedNode.concat()
      })

      this.MinXinHttpFetch(FlowAction(JSON.stringify(params)), (response) => {
        if (response.success) {
          this.afterSaveMsg = '驳回成功'
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
        }
      })
    },
    // 验证数据
    valiData (mindInfo, node) {
      let obj = {
        msg: '',
        pass: true
      }
      if (!mindInfo || mindInfo === '') {
        obj.msg = '意见不能为空'
        obj.pass = false

        return obj
      }

      if (!node || node.length === 0) {
        obj.msg = '人员节点不能为空'
        obj.pass = false

        return obj
      }

      node.forEach((nodeItem, nodeIndex) => {
        let itemList = nodeItem.ItemList
        if (!itemList || itemList.length === 0) {
          obj.msg = '人员节点列不能为空'
          obj.pass = false

          return obj
        }

        itemList.forEach((userItem, userIndex) => {
          let userList = userItem.UserList

          if (!userList || userList.length === 0) {
            obj.msg = '选择人员不能为空'
            obj.pass = false

            return obj
          }
        })
      })

      return obj
    },
    // 获取选中的数据
    getSelectedNodeData () {
      let arr = []
      let NextNodeList = this.NextNodeList.concat()

      NextNodeList.forEach((nodeItem, nodeIndex) => {
        let obj = {}

        if (nodeItem.checked) {
          obj.NodeCode = nodeItem.NodeCode
          obj.NodeName = nodeItem.NodeName
          obj.ReturnedSendMode = this.getSelectedMethod()
          obj.ItemList = []

          nodeItem.ItemList.forEach((listItem, listIndex) => {
            let userList = listItem.UserList
            let listItemPre = Object.assign({}, listItem)

            listItemPre.UserList = []
            listItemPre.OtherUserList = []

            userList.forEach((userItem, userIndex) => {
              let userItemPre = Object.assign({}, userItem)

              if (userItem.checked) {
                delete userItemPre.checked
                listItemPre.UserList.push(userItemPre)
              }
            })

            obj.ItemList.push(listItemPre)
          })
          arr.push(obj)
        }
      })
      return arr
    },
    // 获取选中的模式
    getSelectedMethod () {
      let methods = this.method
      let Code = 'Normal'

      for (let i = 0; i < methods; i++) {
        if (methods[i].checked) {
          Code = methods[i].Code
          break
        }
      }

      return Code
    },
    // 获取所需数据
    getReturnData () {
      this.getQuery()

      let params = Object.assign({}, {
        SubOperate: 'ReadReturnNodeList',
        SequeID: this.query.SequeID,
        FlowOperate: 'SupplyInstance',
        Current: this.query
      })

      this.MinXinHttpFetch(FlowAction(JSON.stringify(params)), (response) => {
        if (response.success) {
          let value = response.data.value
          let NextNodeList = value.NextNodeList.concat()

          this.Current = Object.assign({}, value.Current)
          this.NextNodeList = this.formatNextNodeList(NextNodeList)
          this.HistoryMind = value.HistoryMind.concat()
          console.log(this.NextNodeList)
        }
      })
    },
    // 切换发送模式
    switchMethods (selectIndex) {
      this.method.forEach((item, index) => {
        if (index === selectIndex) {
          item.checked = true
        } else {
          item.checked = false
        }
      })
    },
    // 组织数据
    formatNextNodeList (array) {
      array.forEach((rowItem, rowIndex) => {
        if (array.length === 1) {
          rowItem.checked = true
        } else {
          rowItem.checked = false
        }

        let itemList = rowItem.ItemList
        itemList.forEach((listItem, listIndex) => {
          let userList = listItem.UserList
          userList.forEach((userItem, userIndex) => {
            if (rowItem.checked && userList.length === 1) {
              userItem.checked = true
            } else {
              userItem.checked = false
            }
          })
        })
      })

      return array
    },
    // 选择人员
    selectedUser (a, b, c) {
      let NextNodeList = this.NextNodeList.concat()

      NextNodeList[a].ItemList[b].UserList[c].checked =
      !NextNodeList[a].ItemList[b].UserList[c].checked

      this.NextNodeList = NextNodeList.concat()
    },
    // 选择节点
    selectedNodeEvent (index) {
      let NextNodeList = this.NextNodeList.concat()
      NextNodeList[index].checked = !NextNodeList[index].checked

      let checked = NextNodeList[index].checked
      if (checked) {
        NextNodeList[index].ItemList[0].UserList.forEach((item) => {
          let length = NextNodeList[index].ItemList[0].UserList.length
          if (length === 1) {
            item.checked = true
          } else {
            item.checked = false
          }
        })
      } else {
        NextNodeList[index].ItemList[0].UserList.forEach((item) => {
          item.checked = false
        })
      }

      this.NextNodeList = NextNodeList.concat()
    },
    // 返回表单
    goBack () {
      this.$router.back()
    },
    // 获取路由中的参数
    getQuery () {
      let query = this.$router.history.current.query
      if (query) {
        this.query = Object.assign({}, query)
        this.formState = this.query.FormState
      }
    }
  },
  components: {
    LineBreak,
    CheckIcon,
    XTextarea,
    Group
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .work-flow-return {
    position: absolute;
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
    .flow-return-content {
      width: 100%;
      height: calc(100% - 50px);
      .return-content {
        width: 100%;
        height: 35%;
        overflow-y: auto;
        border-bottom: 1px solid #dddddd;
        .title {
          padding: 10px;
          font-size: 14px;
          border-bottom: 1px solid #dddddd;
          background-color: #ffffff;
        }
        .return-user-row {
          width: 100%;
          background-color: #ffffff;
          border-bottom: 4px solid #dddddd;
          &:last-child {
            border-bottom: 4px solid transparent;
          }
          .row-title {
            display: flex;
            padding: 0 10px;
            line-height: 30px;
            border-bottom: 1px solid #dddddd;
            border-left: 2px solid #295AA6;
            .text {
              flex: 1;
              font-size: 14px;
            }
            .icon {
              flex: 0 0 30px;
            }
          }
          .row-lists {
            border-bottom: 1px solid #dddddd;
            &:last-child {
              border-bottom: 1px solid transparent;
            }
            .row-list {
              .row-list-inner {
                display: flex;
                line-height: 30px;
                padding: 0 10px;
                border-bottom: 1px dotted #dddddd;
                &:last-child {
                  border-bottom: 1px dotted transparent;
                }
                .text {
                  flex: 1;
                  font-size: 14px;
                }
                .icon {
                  flex: 0 0 30px;
                }
              }
            }
          }
        }
      }
      .method-content {
        width: 100%;
        max-height: 30%;
        overflow-y: auto;
        background-color: #ffffff;
        .title {
          padding: 10px;
          font-size: 14px;
          border-bottom: 1px solid #dddddd;
        }
        .method-lists {
          .method-list {
            width: 100%;
            padding: 5px 10px;
            border-bottom: 1px dotted #dddddd;
            &:last-child {
              border-bottom: 1px dotted transparent;
            }
            .list-inner {
              display: flex;
              line-height: 20px;
              .text {
                flex: 1;
                font-size: 14px;
                color: rgba(0, 0, 0, 0.6);
              }
              .icon {
                flex: 0 0 30px;
              }
            }
          }
        }
      }
      .mind-info-content {
        .title {
          padding: 10px;
          font-size: 14px;
        }
        .weui-cells {
          margin-top: 0px;
          font-size: 14px;
        }
      }
    }
    .flow-return-footer {
      height: 50px;
      width: 100%;
      background-color: #ffffff;
      display: flex;
      .item {
        min-width: 10px;
        flex: 1;
        text-align: center;
        font-size: 14px;
        line-height: 50px;
        border-right: 1px solid #dddddd;
        &:last-child {
          border-right: 0px solid #dddddd;
        }
      }
    }
  }
</style>
