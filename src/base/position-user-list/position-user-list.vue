<template>
  <div ref="positionUserList" class="position-user-list" :style="{'transform': 'translate3d(' + this.offset + '%, 0, 0)'}">
    <header class="header">
      <div class="search-box-wrap">
        <search-box placeholder="搜索人员姓名/编号/岗位、部门"
          v-model="searchQuery"
          @change="change"
        ></search-box>
      </div>
    </header>
    <line-break></line-break>
    <section class="user-content">
      <div class="user-inner-content">
        <ul class="user-lists">
          <li class="user-list"
            v-for="(item, index) in UserList" :key="index"
            @click="selectItem(index)"
            >
            <div class="user-list-inner">
              <div class="check-box">
                <div class="check-icon-wrap">
                  <check-icon :checked="item.checked"></check-icon>
                </div>
              </div>
              <div class="user-list-content">
                <div class="user-msg">
                  <div class="msg-item">
                    <span>姓名:</span>
                    <span>{{ item.UserName }}</span>
                  </div>
                  <div class="msg-item">
                    <span>编号:</span>
                    <span>{{ item.UserCode }}</span>
                  </div>
                </div>
                <div class="user-msg">
                  <div class="msg-item">
                    <span>岗位/部门:</span>
                    <span>{{ item.DeptPositionName }}</span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="user-action-bar">
        <div @click="getSelectedUsers" class="user-action">确定</div>
        <div @click="hide" class="user-action">取消</div>
      </div>
    </section>

    <loading v-model="mx_isLoading"></loading>
    <toast v-model="mx_toastShow" type="text" :time="mx_deleyTime">{{ afterSaveMsg }}</toast>
    <alert v-model="mx_alertShow" @on-hide="MixinAlertHideEvent" :title="mx_alertTitle" :content="mx_message"></alert>
  </div>
</template>
<script type="text/ecmascript-6">
import LineBreak from 'base/line/line.vue'
import { SearchBox } from 'components/index.js'
import CheckIcon from 'base/check-icon/check-icon.vue'
import { commonComponentMixin } from 'common/js/mixin.js'
import { FlowAction } from 'api/index.js'

export default {
  mixins: [commonComponentMixin],
  props: {
    currentUserList: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      searchQuery: '',
      UserList: [],
      defaultUserList: [],
      offset: 100,
      selectedLists: [],
      afterSaveMsg: '',
      mx_isLoading: false,
      mx_message: '',
      mx_alertShow: false,
      mx_alertTitle: '提示',
      mx_toastShow: false,
      mx_deleyTime: 1000
    }
  },
  methods: {
    change (query) {
      this.searchQuery = query
    },
    // 加载数据入口 加载数据，显示面板
    load () {
      this.show()

      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.timer = setTimeout(() => {
        this.loadPositionUsers()
      }, 300)
    },
    // 选择与取消
    selectItem (index) {
      let UserList = this.UserList.concat()
      UserList[index].checked = !UserList[index].checked

      let checked = UserList[index].checked
      this.toggleSelectItem(UserList, index, checked)
    },
    // 添加选择的数据
    toggleSelectItem (UserList, index, checked) {
      let selectItem = UserList[index]

      UserList.map((listItem, listIndex) => {
        if (selectItem.UserID === listItem.UserID) {
          if (index !== listIndex) {
            listItem.checked = false
          }
        }
        return listItem
      })

      this.UserList = UserList.concat()
      this.selectedLists = this.fliterUser(checked, selectItem)
    },
    // 过滤相同的UserID的人员
    fliterUser (checked, selectItem) {
      let arr = []

      this.selectedLists.forEach((listItem, listIndex) => {
        if (selectItem.UserID !== listItem.UserID) {
          arr.push(listItem)
        }
      })

      if (checked) {
        arr.push(selectItem)
      }

      return arr
    },
    // 加载数据
    loadPositionUsers () {
      let obj = Object.assign({}, {
        Where: '',
        Order: 'x1.Name',
        id: '',
        SubOperate: 'ReadUserList',
        SourceMode: 'PositionAndUser',
        pageIndex: 0,
        pageSize: 0,
        Current: {},
        FlowOperate: 'SupplyFlow'
      })

      this.selectedLists = this.currentUserList.concat()

      this.MinXinHttpFetch(FlowAction(JSON.stringify(obj)), (response) => {
        let UserList = []
        if (response.success) {
          let value = response.data.value
          UserList = value.UserList ? JSON.parse(value.UserList).concat() : []
        }

        this.UserList = UserList.concat()

        this.UserList.map((item, index) => {
          item.checked = false
          return item
        })

        this.defaultUserList = this.UserList.concat()
      })
    },
    // 传回选择的数据
    getSelectedUsers () {
      let selectedLists = JSON.parse(JSON.stringify(this.selectedLists))

      selectedLists.map((item) => {
        delete item.checked
        return item
      })

      this.$emit('complete', selectedLists)

      this.hide()
    },
    // 执行搜索功能
    search (query) {
      let arr = []
      let pattern = new RegExp(query)

      this.defaultUserList.forEach((item) => {
        if (
          pattern.test(item.UserName) ||
          pattern.test(item.UserCode) ||
          pattern.test(item.DeptPositionName)
        ) {
          item.checked = false
          arr.push(item)
        }
      })

      this.UserList = arr.concat()
    },
    // 显示面板
    show () {
      this.offset = 0
    },
    // 隐藏面板
    hide () {
      let UserList = this.UserList.concat()

      UserList.map((item) => {
        item.checked = false
        return item
      })

      this.UserList = UserList
      this.selectedLists = []
      this.offset = 100
    }
  },
  watch: {
    searchQuery (query) {
      if (query !== '') {
        this.search(query)
      } else {
        this.load()
      }
    }
  },
  components: {
    LineBreak,
    SearchBox,
    CheckIcon
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import "~common/styles/mixin.less";
  .position-user-list {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background-color: #EBEBEB;
    transition: all 0.3s;
    .header {
      height: 50px;
      background-color: #ffffff;
      padding: 10px 5px;
    }
    .user-content {
      width: 100%;
      height: calc(100% - 61px);
      .user-inner-content {
        height: calc(100% - 50px);
        overflow-y: auto;
        .user-lists {
          width: 100%;
          .user-list {
            width: 100%;
            .user-list-inner {
              display: flex;
              background-color: #ffffff;
              margin: 5px;
              padding: 3px 0;
              border-radius: 3px;
              .check-box {
                flex: 0 0 50px;
                width: 50px;
                height: 50px;
                position: relative;
                .vux-check-icon {
                  .positionCenter();
                }
              }
              .user-list-content {
                flex: 1;
                .title {
                  padding: 5px 0;
                  font-size: 14px;
                  color: rgba(0, 0, 0, 0.7);
                }
                .user-msg {
                  display: flex;
                  padding: 5px 0;
                  color: rgba(0, 0, 0, 0.7);
                  .msg-item {
                    flex: 1;
                    font-size: 14px;
                  }
                }
              }
            }
          }
        }
      }
      .user-action-bar {
        line-height: 50px;
        display: flex;
        border-top: 1px solid #dddddd;
        background-color: #ffffff;
        .user-action {
          flex: 1;
          text-align: center;
          font-size: 14px;
          &:first-child{
            border-right: 1px solid #dddddd;
          }
        }
      }
    }
  }
</style>
