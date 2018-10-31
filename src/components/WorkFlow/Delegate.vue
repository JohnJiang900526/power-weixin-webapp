<template>
  <transition name="slide">
    <div class="work-flow-delegate">
      <div class="flow-delegate-content">
        <div class="delegate-method">
          <h1 class="title font-color-active">委派模式:</h1>
          <ul class="method-lists">
            <li class="method-list"
              v-for="(item, index) in methods" :key="index"
              @click="switchMethod(item)"
              >
              <div class="methid-list-inner">
                <div class="text">
                  {{ item.text }}
                </div>
                <div class="icon">
                  <check-icon :checked="item.Code === currentMethod"></check-icon>
                </div>
              </div>
            </li>
          </ul>
          <div class="back-to-active">
            <h1 class="title font-color-active">是否返还给发起人:</h1>
            <div @click="backToRootEvent" class="back-to-content">
              <div class="text">
                是否返还给发起人
              </div>
              <div class="icon">
                <check-icon :checked="backToRoot"></check-icon>
              </div>
            </div>
          </div>
        </div>
        <div class="user-content">
          <h1 class="title font-color-active">
            <div class="text">人员列表:</div>
            <div @click="openUsersBlock" class="btn">选择人员</div>
          </h1>
          <ul class="user-lists">
            <li class="user-list"
              v-if="UserList.length > 0"
              v-for="(item, index) in UserList" :key="index"
              >
              <div v-if="index === 0 && !item.isBootLast" class="list-inner">
                <span class="name font-color-active">{{ item.UserName }}</span>
                <span class="text">
                  <i class="fa fa-angle-double-right"></i>
                </span>
              </div>

              <div class="list-inner"
                v-if="index !== 0 && !item.isBootLast">
                <span class="text">
                  <i class="fa fa-angle-double-right"></i>
                </span>
                <span class="name font-color-active">{{ item.UserName }}</span>
                <span v-if="currentMethod === 'Serial' && index !== (UserList.length - 1)" class="text">
                  <i class="fa fa-angle-double-right"></i>
                </span>
              </div>

              <div class="list-inner"
                v-if="index == (UserList.length - 1) && item.isBootLast">
                <span class="text">
                  <i class="fa fa-angle-double-right"></i>
                </span>
                <span class="name font-color-active">{{ item.UserName }}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="mond-info-content">
          <h1 class="title font-color-active">提交意见:</h1>
          <group class="textarea-content">
            <x-textarea
              name="description"
              v-model.trim="MindInfo"
              :max="300"
              placeholder="输入办理意见"
            ></x-textarea>
          </group>
        </div>
      </div>
      <div class="flow-delegate-footer">
        <div @click="submitData" class="item">
          提交
        </div>
        <div @click="goBack" class="item">
          返回
        </div>
      </div>

      <position-user-list
        ref="positionUserList"
        :subParams="positionUserParams"
        :currentUserList="defaultUserList"
        @complete="completeSelectUsers"
      ></position-user-list>
      <loading v-model="mx_isLoading"></loading>
      <toast v-model="mx_toastShow" type="text" :time="mx_deleyTime">{{ afterSaveMsg }}</toast>
      <alert v-model="mx_alertShow" @on-hide="MixinAlertHideEvent" :title="mx_alertTitle" :content="mx_message"></alert>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import CheckIcon from 'base/check-icon/check-icon.vue'
import PositionUserList from 'base/position-user-list/position-user-list.vue'
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
      methods: [
        {
          text: '串行',
          Code: 'Serial',
          checked: false
        },
        {
          text: '并行',
          Code: 'Parallel',
          checked: false
        }
      ],
      currentMethod: '',
      MindInfo: '',
      Current: {},
      delegateItem: {},
      HistoryMind: [],
      UserList: [],
      defaultUserList: [],
      RootUserInfo: {},
      backToRoot: false,
      positionUserParams: {},
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
    this.getDelegateData()
  },
  methods: {
    // 提交数据
    submitData () {
      let valid = this.validSubmitData()

      if (!valid.isPass) {
        this.MixinAlertShowEvent(valid.msg)
        return false
      }

      let params = Object.assign({}, {
        Current: this.Current,
        FlowOperate: 'Delegate',
        MindInfo: this.MindInfo,
        Mode: {
          DelegateMode: this.currentMethod,
          IsReturnRoot: this.backToRoot
        },
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
        }
      })
    },
    // 验证数据
    validSubmitData () {
      let obj = {
        msg: '',
        isPass: true
      }

      if (this.MindInfo === '') {
        obj.msg = '意见不能为空'
        obj.isPass = false
        return obj
      }

      if (this.currentMethod === '') {
        obj.msg = '请选择委派模式'
        obj.isPass = false
        return obj
      }

      if (this.defaultUserList.length === 0) {
        obj.msg = '请选择委派人员'
        obj.isPass = false
        return obj
      }

      return obj
    },
    // 打开选择人的面板
    openUsersBlock () {
      this.$refs.positionUserList.load()
    },
    // 获取委派的信息
    getDelegateData () {
      this.getQuery()
      let params = Object.assign({}, {
        SubOperate: 'ReadDelegateUsers',
        FlowOperate: 'SupplyInstance',
        Current: this.query
      })

      this.MinXinHttpFetch(FlowAction(JSON.stringify(params)), (response) => {
        if (response.success) {
          let value = response.data.value

          this.Current = Object.assign({}, value.Current)
          this.HistoryMind = value.HistoryMind.concat()

          if (value.DelegateItem) {
            this.delegateItem = Object.assign({}, value.DelegateItem)
            this.delegateItem = Object.assign({}, value.DelegateItem)
            this.RootUserInfo = this.delegateItem.RootUserInfo
            this.defaultUserList = this.delegateItem.UserList.concat()
            this.UserList = [this.RootUserInfo].concat(this.delegateItem.UserList)
            this.organizeData()
          }
        }
      })
    },
    // 人员选择完成后的的事件
    completeSelectUsers (UserLists) {
      let users = UserLists.map((item, index) => {
        delete item.isBootLast
        return item
      })

      let params = Object.assign({}, {
        SubOperate: 'SaveUserToDelegate',
        FlowOperate: 'SupplyInstance',
        DelegateItem: {
          RootSequeID: this.Current.SequeID,
          UserList: users
        },
        Current: Object.assign({}, this.Current)
      })

      this.MinXinHttpFetch(FlowAction(JSON.stringify(params)), (response) => {
        if (response.success) {
          this.getDelegateData()
        }
      })
    },
    // 点击事件backToRoot
    backToRootEvent () {
      if (this.currentMethod === 'Parallel') {
        this.MixinAlertShowEvent('并行必须选择返回发起人')
        return false
      } else {
        this.backToRoot = !this.backToRoot
        if (this.defaultUserList.length > 0) {
          this.formatUserList()
        }
      }
    },
    // 人员列表组织数据
    formatUserList (arr) {
      let root = Object.assign({}, this.RootUserInfo)
      let last = Object.assign({}, this.RootUserInfo)
      let UserList = this.delegateItem.UserList || []

      if (arr) {
        UserList = UserList.concat(arr)
      }

      if (this.backToRoot) {
        this.UserList = [root].concat(UserList, [last])
        this.UserList.forEach((item, index) => {
          if (index === (this.UserList.length - 1)) {
            item['isBootLast'] = true
          } else {
            item['isBootLast'] = false
          }
        })
      } else {
        this.UserList = [root].concat(UserList)
        this.UserList.forEach((item, index) => {
          item['isBootLast'] = false
        })
      }
    },
    // 选择委派模式
    switchMethod (item) {
      this.currentMethod = item.Code

      this.methodAndbackRoot()
    },
    // 并行与返回发起的数据关联
    methodAndbackRoot () {
      if (this.currentMethod === 'Parallel') {
        this.backToRoot = true
      }
    },
    // 获取完数据之后 组织数据
    organizeData () {
      let delegateItem = this.delegateItem
      this.currentMethod = delegateItem.DelegateMode

      this.methodAndbackRoot()
      this.formatUserList()
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
    CheckIcon,
    XTextarea,
    Group,
    PositionUserList
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .work-flow-delegate {
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
    .flow-delegate-content {
      width: 100%;
      height: calc(100% - 50px);
      .delegate-method {
        height: 160px;
        .title {
          font-size: 14px;
          padding: 10px;
        }
        .method-lists {
          border-bottom: 1px solid #dddddd;
          .method-list {
            padding: 0 10px;
            background-color: #ffffff;
            border-bottom: 1px dotted #dddddd;
            &:last-child {
              border-bottom: 0px dotted #dddddd;
            }
            .methid-list-inner {
              display: flex;
              line-height: 30px;
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
        .back-to-active {
          .title {
            font-size: 14px;
            padding: 10px;
          }
          .back-to-content {
            background-color: #ffffff;
            line-height: 30px;
            padding: 0 10px;
            display: flex;
            .text {
              font-size: 14px;
              flex: 1;
            }
            .icon {
              flex: 0 0 30px;
            }
          }
        }
      }
      .user-content {
        width: 100%;
        height: 35%;
        overflow-y: auto;
        .title {
          font-size: 14px;
          width: 100%;
          padding: 10px;
          display: flex;
          .text {
            flex: 1;
          }
          .btn {
            flex: 1;
            text-align: right
          }
        }
        .user-lists {
          width: 100%;
          height: calc(100% - 34px);
          overflow-y: auto;
          background-color: #ffffff;
          .user-list {
            border-bottom: 1px dotted #dddddd;
            &:last-child {
              border-bottom: 1px dotted transparent;
            }
            .list-inner{
              padding: 5px 10px;
              span {
                display: inline-block;
                width: 50px;
                text-align: center;
              }
              .text {
                color:rgba(0, 0, 0, 0.7);
              }
              .name {
                font-size: 14px;
              }
            }
          }
        }
      }
      .mond-info-content {
        width: 100%;
        .title {
          padding: 10px;
          font-size: 14px;
        }
        .weui-cells {
          margin-top: 0;
          font-size: 14px;
        }
      }
    }
    .flow-delegate-footer {
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
