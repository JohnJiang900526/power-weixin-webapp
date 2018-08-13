<template>
  <div class="content-box project-center" ref="projectContent">
    <div class="content-logo" ref="contentLogo">
      <img class="content-bg" src="./banner.png">
      <div class="human-message">
        <div class="avatar">
          <img class="header-logo" src="./default-sir.jpg" alt="头像">
        </div>
        <div class="project-msg-wrap">
          <div @click="changeShow" class="project-name">
            <span class="name">{{ ProjectInfo.project_name || '----' }}</span>
            <span class="fa fa-angle-right"></span>
          </div>
          <div class="project-time">
            <div class="time-list">
              <p>计划开工时间</p>
              <p>{{ _formatDate(ProjectInfo.target_start_date) || '----' }}</p>
            </div>
            <div class="time-list">
              <p>计划竣工时间</p>
              <p>{{ _formatDate(ProjectInfo.target_end_date) || '----' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="menu-lists-content" :style="{ height: menuListsHeight + 'px' }">
      <div class="menu-lists">
        <cube-scroll ref="menuList" class="menu-list"
        :data="menuList"
        :options="options"
        >
          <div>
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
          </div>
        </cube-scroll>
      </div>
    </div>
    <change-project ref="changeProject" @switchSuccess="getProjectMsg"></change-project>
    <router-view></router-view>

    <loading v-model="mx_isLoading"></loading>
    <toast v-model="mx_toastShow" type="text" :time="mx_deleyTime">修改成功</toast>
    <alert v-model="mx_alertShow" @on-hide="MixinAlertHideEvent" :title="mx_alertTitle" :content="mx_message"></alert>
  </div>
</template>

<script type="text/ecmascript-6">
import ListUnit from 'base/list-unit/list-unit.vue'
import ChangeProject from 'components/sub-module/change-project/change-project.vue'
import { ProjectInfo, getMenu } from 'api/index.js'
import { getStoreUserSession } from 'api/UserSession.js'

import { commonComponentMixin } from 'common/js/mixin.js'
import { setFontColor, getChildrenMenu, getNextHigherLevel, formatDate } from 'common/js/Util.js'

export default {
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
      ProjectInfo: {},
      UserSession: {},
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
        scrollbar: true
      }
    }
  },
  mounted () {
    this.resizeHeight()

    this._getMenu()

    this.getProjectMsg()
  },
  methods: {
    // 获取项目详情信息
    getProjectMsg () {
      this.UserSession = getStoreUserSession()
      this.MinXinHttpFetch(ProjectInfo(this.UserSession.EpsProjId), (response) => {
        this.ProjectInfo = response.data
      })
    },
    // 获取菜单信息
    _getMenu () {
      this.MinXinHttpFetch(getMenu(), (response) => {
        let menu = response.data.value.concat()
        this.menuListdefault = response.data.value.concat()
        this.menuList = setFontColor(menu[0].children)
        this.menuTitle = menu[0].Name
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
      } else if (item.LinkWidget === '1') {
        this.$router.push('/weixin/form/' + item.Id)
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
    },
    // 计算projectContent的高度
    resizeHeight () {
      this.$nextTick(() => {
        this.menuListsHeight =
        this.$refs.projectContent.offsetHeight -
        this.$refs.contentLogo.offsetHeight
      })

      window.addEventListener('resize', () => {
        this.resizeHeight()
      })
    },
    // 打开切换项目面板
    changeShow () {
      this.$refs.changeProject.show()
    },
    _formatDate (time) {
      return formatDate(time)
    }
  },
  components: {
    ListUnit,
    ChangeProject
  }
}
</script>

<style lang="less" scoped  rel="stylesheet/less">
  @import "~common/styles/mixin.less";
  .content-box{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 56px;
    z-index: 100;
    .content-logo {
      position: relative;
      width: 100%;
      height: 0;
      padding-top: 50%;
      overflow: hidden;
      .content-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .human-message {
        width: 80%;
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translate(-50%, -5%);
        .avatar {
          width: 60px;
          height: 60px;
          margin: 0 auto;
          .header-logo{
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .project-msg-wrap {
          width: 100%;
          .project-name {
            text-align: center;
            color: #ffffff;
            padding: 5px 0;
            .fa{
              font-size: 18px;
              padding-left: 10px;
            }
          }
          .project-time{
            display: flex;
            width: 100%;
            font-size: 14px;
            .time-list{
              flex: 1;
              text-align: center;
              color: #ffffff;
              p{
                padding: 5px 0;
              }
            }
          }
        }
      }
    }
    .menu-lists-content{
      padding: 10px;
      .menu-lists {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .menu-list {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100%;
          .menu-title{
            padding: 5px;
            .title-text {
              padding-left: 10px;
              line-height: 30px;
              border-left: 2px solid #0AB9F5;
            }
          }
          .lists{
            width: 100%;
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
</style>
