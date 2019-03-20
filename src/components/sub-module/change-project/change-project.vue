<template>
  <transition name="slide">
    <div class="change-project" ref="changeProject">
      <div ref="headerChange" class="header-change">
        <span @click="hide" class="back-icon" :style="{'width': angleWidth + 'px'}">
          <span v-show="!focused" class="fa fa-angle-left"></span>
        </span>
        <div class="searchWrap">
          <search-box placeholder="搜索项目名称"
            v-model="searchQuery"
            @change="searchChange"
            @focus="focusSearch"
            @blur="blurSearch"
          ></search-box>
        </div>
      </div>
      <div ref="switchesWrap" class="switches-wrap">
        <switches-box :switches="switches" @switch="switchItem" :currentIndex="currentIndex"></switches-box>
      </div>
      <div ref="projectListsWrap" class="project-lists-wrap" :style="{'height':ListsHeight + 'px'}">
        <div class="project-lists-change-wrap">
          <div class="project-full-msg project" v-show="isShow(0)">
            <ul class="project-lists">
              <li @click="_switchEpsProject(item)" v-for="item in projects" :key="item.project_guid" class="project-list">
                <div class="list-wrap">
                  <div class="icon-box">
                    <img src="./default.png" alt="">
                  </div>
                  <div class="text-box">
                    <p class="v-text-inner title">
                      {{ item.project_name }}
                    </p>
                    <div class="v-text-inner">
                      <span>开工时间:</span>
                      <span> {{ _formatDate(item.target_start_date, dateType) }} </span>
                    </div>
                    <div class="v-text-inner">
                      <span>开工时间:</span>
                      <span>{{ _formatDate(item.target_end_date, dateType) }}</span>
                    </div>
                    <div class="v-text-inner">
                      <span>项目经理:</span>
                      <span>{{item.Pro_manager_name}}</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="project-shot-msg eps" v-show="isShow(1)">
            <ul class="project-lists">
              <li @click="_switchEpsProject(item)" v-for="item in EPS" :key="item.project_guid" class="project-list">
                <div class="shot-list-wrap">
                  <span class="project-eps">{{ item.project_name }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <loading v-model="mx_isLoading"></loading>
      <toast v-model="mx_toastShow" type="text" :time="mx_deleyTime">切换成功</toast>
      <alert v-model="mx_alertShow" @on-hide="MixinAlertHideEvent" :title="mx_alertTitle" :content="mx_message"></alert>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import { mapMutations, mapGetters } from 'vuex'
import SearchBox from 'base/search-box/search-box.vue'
import LineBreak from 'base/line/line.vue'
import SwitchesBox from 'base/switches-box/switches-box.vue'

import { formatDate, searchLists } from 'common/js/Util.js'
import { commonComponentMixin } from 'common/js/mixin.js'
import { SwitchEpsProject, getEpsProjects } from 'api/index.js'

const isProject = '1'
const isESP = '0'

export default {
  name: 'changeproject',
  mixins: [commonComponentMixin],
  data () {
    return {
      dateType: 'yyyy-MM-dd HH:mm:ss',
      ListsHeight: 100,
      currentIndex: 0,
      switches: [],
      projects: [],
      EPS: [],
      focused: false,
      angleWidth: 30,
      searchQuery: '',
      searchField: 'project_name',
      mx_isLoading: false,
      mx_message: '',
      mx_alertShow: false,
      mx_alertTitle: '提示',
      mx_toastShow: false,
      mx_deleyTime: 1000
    }
  },
  computed: {
    ...mapGetters([
      'projectInfo'
    ])
  },
  mounted () {
    this.getListsHeight()

    this.resize()

    this._getEpsProjects()
  },
  methods: {
    // 获取项目数据 进行项目和EPS分类
    _getEpsProjects (query) {
      this.MinXinHttpFetch(getEpsProjects(), (response) => {
        let data = response.data.value
        let projects = []
        let EPS = []

        let arr = [...data].filter((item) => {
          if (item.STATE === 0 && item.EpsProjType !== 0) {
            return item
          }
        })

        arr.forEach((item, index) => {
          if ((item.project_type + '') === isProject) {
            projects.push(item)
          } else if ((item.project_type + '') === isESP) {
            EPS.push(item)
          }
        })

        if (!query || query === '') {
          this.projects = projects
          this.EPS = EPS
        } else {
          if (this.currentIndex === 0) {
            this.projects = searchLists(this.searchField, query, projects)
            this.EPS = EPS
          } else {
            this.projects = projects
            this.EPS = searchLists(this.searchField, query, EPS)
          }
        }
      })
    },
    // 选择项目
    _switchEpsProject (item) {
      let ProjectGuid = item.project_guid
      this.MinXinHttpFetch(SwitchEpsProject(ProjectGuid), (response) => {
        if (response.success) {
          this.mx_toastShow = true
          this.setProjectInfo(item)

          this._UserSession(() => {
            this.timer = setTimeout(() => {
              this.hide()
            }, 1000)
          })
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
      this._getEpsProjects(this.searchQuery)
    },
    focusSearch () {
      this.focused = true
      this.angleWidth = 0
      this.angleFontSize = 0
    },
    blurSearch () {
      this.focused = false
      this.angleWidth = 30
      this.angleFontSize = 30
    },
    hide () {
      this.$router.back()
    },
    getListsHeight () {
      this.ListsHeight =
      this.$refs.changeProject.offsetHeight -
      this.$refs.headerChange.offsetHeight -
      this.$refs.switchesWrap.offsetHeight
    },
    resize () {
      window.addEventListener('resize', () => {
        this.getListsHeight()
      })
    },
    switchItem (index) {
      this.currentIndex = index
    },
    isShow (num) {
      return this.currentIndex === num
    },
    _formatDate (time, format) {
      return formatDate(time, format)
    },
    ...mapMutations({
      setProjectInfo: 'SET_PROJECTINFO'
    })
  },
  components: {
    SearchBox,
    SwitchesBox,
    LineBreak
  }
}
</script>
<style lang="less" scoped rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .change-project {
    position: fixed;
    top: 0;
    bottom: 0;
    z-index: 100;
    width: 100%;
    background-color: #ffffff;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    &.slide-enter-active, &.slide-leave-active{
      transition: all 0.3s
    }
    &.slide-enter, &.slide-leave-to{
      transform: translate3d(100%, 0, 0)
    }
    .header-change {
      width: 100%;
      display: flex;
      border-bottom: 1px solid #dddddd;
      line-height: 25px;
      .searchWrap {
        flex: 1;
        padding: 5px;
      }
      .back-icon {
        font-size: 30px;
        width: 30px;
        position: relative;
        color: rgba(0, 0, 0, 0.6);
        transition: all 0.3s;
        .fa {
          position: absolute;
          top:50%;
          left: 50%;
          transform: translate(-50%,-50%);
        }
      }
    }
    .search-wrap {
      width: 100%;
      margin-top: 5px;
    }
    .switches-wrap {
      border-bottom: 1px solid transparent;
    }
    .project-lists-wrap {
      width: 100%;
      overflow-y: auto;
      .project-lists-change-wrap {
        width: 100%;
        display: block;
        .project-full-msg {
          width: 100%;
          display: block;
          .project-lists {
            .project-list {
              border-bottom: 5px solid #EBEEEE;
              &:last-child {
                border-bottom: 0px solid #EBEEEE;
              }
              .list-wrap{
                padding: 10px;
                display: flex;
                .icon-box{
                  width: 70px;
                  height: 70px;
                  flex: 0 0 70px;
                  img{
                    display: block;
                    width: 100%;
                    height: 100%;
                    border-radius: 5px;
                  }
                }
                .text-box {
                  flex: 1;
                  padding-left: 10px;
                  display: flex;
                  min-width: 10px;
                  flex-direction: column;
                  .v-text-inner{
                    flex: 1;
                    font-size: 12px;
                    color: rgba(0, 0, 0, 0.6);
                    padding: 3px 0;
                    &.title {
                      color: rgba(0, 0, 0, 0.9);
                      width: 100%;
                      // .css3-ellipsis();
                    }
                  }
                }
              }
            }
          }
        }
        .project-shot-msg {
          width: 100%;
          display: block;
          .shot-list-wrap {
            padding: 15px 10px;
            font-size: 13px;
            .bottom-line();
          }
        }
      }
    }
  }
</style>
