<template>
  <div class="content-box project-center" ref="projectContent">
    <div class="scroll-wrap">
        <div ref="contentLogo">
          <Bananer type="base" ref="Banner"></Bananer>
        </div>
        <div class="menu-lists-content" :style="{ minHeight: menuListsHeight + 'px' }">
          <div class="menu-lists">
            <div ref="menuList" class="menu-list">
              <cube-scroll
              ref="formList"
              :data="menuList"
              :options="options"
              @pulling-down="onPullingDown"
              >
                <h1 class="menu-title">
                  <span class="title-text">{{ menuTitle }}</span>
                </h1>
                <ul class="lists">
                  <li @click="openMenu(item)" v-for="(item, index) in menuList" :key="index" class="item-list">
                    <list-unit :item="item"></list-unit>
                  </li>
                  <li @click="backNextHigherLevel" v-if="!isTopMenu" class="item-list">
                    <list-unit :item="returnBtn"></list-unit>
                  </li>
                </ul>
              </cube-scroll>
            </div>
          </div>
        </div>
    </div>

    <router-view></router-view>
    <toast v-model="mx_toastShow" type="text" :time="mx_deleyTime">修改成功</toast>
    <alert v-model="mx_alertShow" @on-hide="MixinAlertHideEvent" :title="mx_alertTitle" :content="mx_message"></alert>
  </div>
</template>

<script type="text/ecmascript-6">
import ListUnit from 'base/list-unit/list-unit.vue'
import { getMenu } from 'api/index.js'
import { Bananer } from 'components/index.js'
import { commonComponentMixin } from 'common/js/mixin.js'
import { setFontColor, getChildrenMenu, getNextHigherLevel } from 'common/js/Util.js'

export default {
  name: 'Project',
  mixins: [commonComponentMixin],
  data () {
    return {
      menuListsHeight: 250,
      menuListdefault: [],
      menuList: [],
      menuTitle: '菜单',
      parentIds: [],
      returnBtn: {
        font: 'fa fa-reply',
        Name: '返回',
        bg: '#CCCCCC'
      },
      isTopMenu: true,
      UserSession: {},
      pullDownRefreshThreshold: 60,
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
        scrollbar: false
      }
    }
  },
  mounted () {
    this.resizeHeight()

    this._getMenu()

    this.isTopMenu = true
  },
  methods: {
    onPullingDown () {
      this._getMenu(() => {
        this.$refs.formList.forceUpdate()
      })
      this.isTopMenu = true
    },
    // 获取菜单信息
    _getMenu (callback) {
      this.MinXinHttpFetch(getMenu(), (response) => {
        let arr = []
        if (response.data.value) {
          arr = response.data.value
        }
        let menu = arr.concat()
        this.menuListdefault = arr.concat()

        if (menu.length > 0) {
          this.menuList = setFontColor(menu[0].children)
          this.menuTitle = menu[0].Name
          if (callback) {
            callback()
          }
        }
      })
    },
    // 打开表单或者打开菜单
    openMenu (item) {
      if (item.LinkWidget === '0') {
        this.menuTitle = item.Name
        if (!item.ParentId) {
          this.parentIds.push('')
        } else {
          this.parentIds.push(item.ParentId)
        }
        this.menuList = getChildrenMenu(item)
        this.menuList = setFontColor(this.menuList)
        this.isTopMenu = false
        this.$refs.formList.forceUpdate()
      } else if (item.LinkWidget === '1') {
        this.$router.push({
          path: '/weixinform/' + item.Id
        })
      }
    },
    // 返回上一级菜单
    backNextHigherLevel () {
      let parentId = this.parentIds.pop()
      let HigherLevel = getNextHigherLevel(parentId, this.menuListdefault)

      if (this.parentIds.length > 0) {
        this.isTopMenu = false
      } else {
        this.isTopMenu = true
      }
      this.menuTitle = HigherLevel.title
      this.menuList = setFontColor(HigherLevel.menu)
      this.$refs.formList.forceUpdate()
    },
    // 计算projectContent的高度
    resizeHeight () {
      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.timer = setTimeout(() => {
        this.$nextTick(() => {
          this.menuListsHeight =
          this.$refs.projectContent.offsetHeight -
          this.$refs.contentLogo.offsetHeight
        })
      }, 500)

      window.addEventListener('resize', () => {
        this.resizeHeight()
      })
    }
  },
  components: {
    ListUnit,
    Bananer
  }
}
</script>

<style lang="less" scoped  rel="stylesheet/less">
  @import "~common/styles/mixin.less";
  .content-box{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 56px;
    z-index: 100;
    background-color: #f4f4f4;
    .scroll-wrap {
      width: 100%;
      height: 100%;
      position: relative;
      .menu-lists-content{
        height: auto;
        position: relative;
        .menu-lists {
          width: 100%;
          height: 100%;
          overflow: hidden;
          .menu-list {
            position: absolute;
            top: 0;
            bottom: 0;
            width: 100%;
            padding: 10px;
            .menu-title{
              padding: 5px;
              .title-text {
                padding-left: 10px;
                line-height: 30px;
                border-left: 2px solid #0AB9F5;
              }
            }
            .lists{
              .clearfloat();
              .item-list{
                margin-top: 15px;
                width: 33%;
                float: left;
              }
            }
          }
        }
      }
    }
  }
</style>
