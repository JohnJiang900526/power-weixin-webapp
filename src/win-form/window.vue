<template>
  <transition name="slide">
    <div class="win-form">
      <div ref="formContent" class="form-content">
        <header class="form-header">
          <div ref="searchWrap" class="search-wrap">
            <search-box
              v-model="searchQuery"
              @change="searchChange"
              :placeholder="placeholder"
            ></search-box>
          </div>
        </header>
        <div ref="formListsContent" class="form-lists-content" :style="{'height': listsHeight + 'px','minHeight':minHeight + 'px'}">
          <div class="form-lists-wrap">
            <cube-scroll
              ref="formList"
              :data="formList"
              :options="options"
              @pulling-down="onPullingDown"
              @pulling-up="onPullingUp"
            >
              <ul class="form-lists">
                <li v-if="tableType === 'table'" class="title-lists">
                  <div v-if="option.title.show" class="title-list title">
                    {{ option.title.text }}
                  </div>
                  <div v-if="option.left.show" class="title-list left">
                    {{ option.left.text }}
                  </div>
                  <div v-if="option.center.show" class="title-list center">
                    {{ option.center.text }}
                  </div>
                  <div v-if="option.right.show" class="title-list right">
                    {{ option.right.text }}
                  </div>
                </li>
                <li v-if="formList.length > 0" @click.prevent="openForm(item.Id)" v-for="item in formList" :key="item.Id"
                    class="form-list-unit">
                  <form-list ref="formListUnit"
                    :item="item"
                    :KeyWord="KeyWord"
                    :showCheckBox="showCheckBox"
                    :option="option"
                    :tableType="tableType"
                    :comboboxdata="ExtJson"
                    @selectItem="_selectItem"
                    @unSelectItem="_unSelectItem"
                  ></form-list>
                </li>
              </ul>
            </cube-scroll>
          </div>
        </div>
      </div>
      <nav ref="nav" class="nav-bar-wrap">
        <footer-bar
          @Add="_add"
          @preDelete="_preDelete"
          @Delete="_delete"
          @backPre="_backPre"
          >
        </footer-bar>
      </nav>

      <router-view></router-view>
      <loading v-model="mx_isLoading"></loading>
      <toast v-model="mx_toastShow" type="text" :time="mx_deleyTime">修改成功</toast>
      <alert v-model="mx_alertShow" @on-hide="MixinAlertHideEvent" :title="mx_alertTitle" :content="mx_message"></alert>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import SearchBox from 'base/search-box/search-box.vue'
import FormList from 'base/form-list/form-list.vue'
import FooterBar from 'base/footer-bar/footer-bar.vue'

import { commonComponentMixin } from 'common/js/mixin.js'
import { removeList, searchLists, getTableType } from 'common/js/Util.js'
import { MenuWidget, GridPageLoad, FormSave } from 'api/index.js'
import formDataConfigForUI from 'common/js/formDataConfig.js'

const debug = false

export default {
  name: 'window',
  mixins: [commonComponentMixin],
  data () {
    return {
      KeyWord: '',
      ExtJson: {},
      windowConfig: {},
      minHeight: 100,
      listsHeight: 0,
      MenuId: '',
      showCheckBox: false,
      formList: [],
      selectItems: [],
      actionShow: true,
      pullDownRefreshThreshold: 60,
      searchQuery: '',
      searchField: '',
      placeholder: '',
      config: {},
      tableType: '',
      option: {
        title: {
          show: true
        },
        left: {
          show: true
        },
        center: {
          show: true
        },
        right: {
          show: true
        },
        tag: {
          show: false
        }
      },
      mx_isLoading: false,
      mx_message: '',
      mx_alertShow: false,
      mx_alertTitle: '提示',
      mx_toastShow: false,
      mx_deleyTime: 1000
    }
  },
  computed: {
    options () {
      return {
        pullDownRefresh: {
          threshold: parseInt(this.pullDownRefreshThreshold),
          txt: '刷新成功'
        },
        pullUpLoad: {
          threshold: parseInt(this.pullDownRefreshThreshold),
          txt: '加载成功'
        },
        scrollbar: true
      }
    }
  },
  created () {
    this.MenuId = this.$router.history.current.params.menuId
  },
  mounted () {
    this.computedHeight()
    this.$nextTick(() => {
      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.timer = setTimeout(() => {
        this.windowLoad()
      }, 500)
    })
  },
  methods: {
    getWindowConfigForUI (windowConfig) {
      this.placeholder = windowConfig.placeholder
      this.searchField = windowConfig.searchField
      this.option = Object.assign(this.option, windowConfig.textNameOption)
      this.tableType = getTableType(windowConfig.tableListType)
    },
    windowLoad (callback) {
      let formstate = this.$router.history.current.params.formstate
      if (!formstate) {
        this._MenuWidget(() => {
          this._GridPageLoad(this.config, (data) => {
            this.formList = data
            if (callback) {
              callback()
            }
          })
        })
      }
    },
    // 获取窗体配置信息数据
    _MenuWidget (callback) {
      this.MinXinHttpFetch(MenuWidget(this.MenuId), (response) => {
        let value = response.data.value
        this.ExtJson = JSON.parse(value[0].ExtJson)

        this.config = this.ExtJson.config
        this.KeyWord = this.config.joindata.KeyWord
        this.openformid = this.config.openformid

        if (debug) {
          this.windowConfig = formDataConfigForUI.windowConfig
        } else {
          this.windowConfig = this.ExtJson.appconfig.windowConfig
        }

        this.getWindowConfigForUI(this.windowConfig)
        if (callback) {
          callback()
        }
      })
    },
    // 加载窗体中的数据
    _GridPageLoad (config, callback, searchQuery) {
      let params = {
        KeyWord: config.joindata.KeyWord,
        KeyWordType: 'BO',
        index: '0',
        size: '0',
        swhere: config.joindata.swhere || '',
        select: '',
        sort: config.joindata.sort || '',
        extparams: ''
      }
      this.MinXinHttpFetch(GridPageLoad(params), (response) => {
        let value = response.data.value
        let getData = []
        if (value !== '') {
          getData = JSON.parse(value)
        }

        if (!searchQuery || searchQuery === '') {
          if (callback) {
            callback(getData)
          }
        } else {
          callback(getData)
        }
      })
    },
    // 删除表单数据
    _removeFormList (callback) {
      let params = {
        JsonData: '',
        FormId: ''
      }
      let obj = {}
      let arr = this.selectItems.concat()
      arr.map((item) => {
        item['_state'] = 'removed'
        return item
      })
      obj[this.KeyWord] = {
        KeyWordType: 'BO',
        data: arr
      }
      params.JsonData = JSON.stringify(obj)
      params.FormId = this.config.openformid
      this.MinXinHttpFetch(FormSave(params), (response) => {
        if (callback) {
          callback()
        }
      })
    },
    // search start
    searchChange (query) {
      this.searchQuery = query
      this.doSearchEvent()
    },
    // search action
    doSearchEvent () {
      this._GridPageLoad(this.config, (data) => {
        this.formList = searchLists(this.searchField, this.searchQuery, data)
      }, this.searchQuery)
    },
    // 选中一条数据的事件
    _selectItem (item) {
      this.selectItems.push(item)
    },
    // 取消选中事件
    _unSelectItem (item) {
      removeList(this.selectItems, item)
    },
    // 新增
    _add () {
      this.$router.push(`/weixinform/${this.openformid}/add/0000`)
    },
    // 返回
    _backPre () {
      let formListUnits = this.$refs.formListUnit
      formListUnits.forEach((item) => {
        item.backDefault()
      })
      this.showCheckBox = false
      this.selectItems = []
    },
    // 确定删除
    _delete () {
      this._removeFormList(() => {
        this.showCheckBox = false
        this.selectItems = []
        this._GridPageLoad(this.config, (data) => {
          this.formList = data
        })
      })
    },
    // 删除
    _preDelete () {
      this.showCheckBox = true
    },
    onPullingDown () {
      this.windowLoad(() => {
        this.$refs.formList.forceUpdate()
      })
    },
    onPullingUp () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.$refs.formList.forceUpdate()
      }, 1500)
    },
    openForm (Id) {
      if (this.showCheckBox) {
        return false
      } else {
        this.$router.push(`/weixinform/${this.openformid}/edit/${Id}`)
      }
    },
    // 计算form列表容器的高度
    computedHeight () {
      this.$nextTick(() => {
        this._computedHeight()
        this._resize()
      })
    },
    _computedHeight () {
      this.listsHeight =
      this.$refs.formContent.offsetHeight -
      this.$refs.searchWrap.offsetHeight
    },
    _resize () {
      window.addEventListener('resize', () => {
        this._computedHeight()
      })
    },
    _back () {
      this.$router.back()
    }
  },
  components: {
    SearchBox,
    FormList,
    FooterBar
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .win-form {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 100;
    width: 100%;
    background-color: #f4f4f4;
    &.slide-enter-active, &.slide-leave-active {
      transition: all 0.3s;
    }
    &.slide-enter, &.slide-leave-to {
      transform: translate3d(100%, 0, 0)
    }
    .form-content {
      width: 100%;
      height: calc(100% - 50px);
      position: relative;
      .form-header{
        background-color: #ffffff;
        border-bottom: 1px solid #dddddd;
        .search-wrap{
          padding: 10px;
        }
      }
      .form-lists-content{
        position: relative;
        .form-lists-wrap {
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: relative;
          .form-lists{
            padding: 5px;
            .title-lists {
              display: flex;
              .title-list {
                flex: 1;
                min-width: 10px;
                font-size: 14px;
                .css3-ellipsis();
                text-align: center;
              }
            }
            .form-list-unit{
              margin: 10px 0;
              background-color: #ffffff;
              border-radius: 5px;
            }
          }
          .cube-pulldown-wrapper {
            position: absolute;
            width: 100%;
            left: 0;
            top: 0;
            display: -webkit-box;
            display: flex;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            align-items: center;
            -webkit-transition: all;
            transition: all;
          }
        }
      }
    }
    .nav-bar {
      display: block;
      background-color: #ffffff;
      &.nav-footer {
        height: 50px;
      }
    }
  }
</style>
