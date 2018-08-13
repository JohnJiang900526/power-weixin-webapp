<template>
  <transition name="slide">
    <div class="message-box" ref="messageBox">
      <div class="message-header" ref="messageHeader">
        <cube-tab-bar
          v-model="selectedLabel"
          showSlider
          :useTransition="disabled"
          ref="tabNav"
          :data="tabLabels"
        >
      </cube-tab-bar>
      </div>

      <div class="message-content">
        <cube-slide
          ref="slide"
          :loop="loop"
          :initial-index="initialIndex"
          :auto-play="autoPlay"
          :show-dots="showDots"
          :options="slideOptions"
          @scroll="scroll"
          @change="changePage"
        >
          <cube-slide-item>
            <cube-scroll :data="Infos" :options="scrollOptions">
              <div class="message-item info">
                <div class="search-wrap">
                  <search-box placeholder="搜索待处理的"></search-box>
                </div>
                <ul class="message-lists">
                  <li v-for="(item, index) in Infos" :key="index" class="message-list">
                    <div class="list-inner">
                      <div class="list-header">
                        <span class="fa fa-file-text-o font-color-blue"></span>
                        <span class="title">{{ item.name }}</span>
                        <span class="mark-tag font-color-red">
                          {{ item.status }}
                        </span>
                      </div>
                      <div class="list-body">
                        <p>
                          <span>处理人:</span>
                          <span>{{ item.name }}</span>
                        </p>
                        <p>
                          <span>到达时间:</span>
                          <span>{{ item.time }}</span>
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </cube-scroll>
          </cube-slide-item>
          <cube-slide-item>
            <cube-scroll :data="Actived" :options="scrollOptions">
              <div class="message-item info">
                <div class="search-wrap">
                  <search-box placeholder="搜索我发起的"></search-box>
                </div>
                 <ul class="message-lists">
                  <li v-for="(item, index) in Actived" :key="index" class="message-list">
                    <div class="list-inner">
                      <div class="list-header">
                        <span class="fa fa-file-text-o font-color-blue"></span>
                        <span class="title">{{ item.title }}</span>
                        <span class="mark-tag font-color-purple">
                          {{ item.status }}
                        </span>
                      </div>
                      <div class="list-body">
                        <p>
                          <span>处理人:</span>
                          <span>{{ item.name }}</span>
                        </p>
                        <p>
                          <span>到达时间:</span>
                          <span>{{ item.time }}</span>
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </cube-scroll>
          </cube-slide-item>
          <cube-slide-item>
            <cube-scroll :data="Join" :options="scrollOptions">
              <div class="message-item info">
                <div class="search-wrap">
                  <search-box placeholder="搜索我参与的"></search-box>
                </div>
                <ul class="message-lists">
                  <li v-for="(item, index) in Join" :key="index" class="message-list">
                    <div class="list-inner">
                      <div class="list-header">
                        <span class="fa fa-file-text-o font-color-blue"></span>
                        <span class="title">{{ item.name }}</span>
                        <span class="mark-tag font-color-red">
                          {{ item.status }}
                        </span>
                      </div>
                      <div class="list-body">
                        <p>
                          <span>处理人:</span>
                          <span>{{ item.name }}</span>
                        </p>
                        <p>
                          <span>到达时间:</span>
                          <span>{{ item.time }}</span>
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </cube-scroll>
          </cube-slide-item>
        </cube-slide>
      </div>

      <loading v-model="mx_isLoading"></loading>
      <toast v-model="mx_toastShow" type="text" :time="mx_deleyTime">修改成功</toast>
      <alert v-model="mx_alertShow" @on-hide="MixinAlertHideEvent" :title="mx_alertTitle" :content="mx_message"></alert>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import SwitchesBox from 'base/switches-box/switches-box.vue'
import SearchBox from 'base/search-box/search-box.vue'
import { findIndex } from 'common/js/Util.js'
import { commonComponentMixin } from 'common/js/mixin.js'
import { MyWorkInfos } from 'api/index.js'

export default {
  mixins: [commonComponentMixin],
  data () {
    return {
      mx_isLoading: false,
      mx_message: '',
      mx_alertShow: false,
      mx_alertTitle: '提示',
      mx_toastShow: false,
      mx_deleyTime: 1000,
      selectedLabel: '待处理的',
      disabled: false,
      loop: false,
      autoPlay: false,
      showDots: false,
      tabLabels: [
        {
          label: '待处理的'
        },
        {
          label: '我发起的'
        },
        {
          label: '我参与的'
        }
      ],
      messageHeight: 200,
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      },
      scrollOptions: {
        directionLockThreshold: 0
      },
      Infos: (() => {
        let arr = []
        for (let i = 0; i < 10; i++) {
          arr.push({
            title: '合同登记',
            status: ' ●待处理的',
            name: '刘志',
            time: '2018-08-12 12:30:10'
          })
        }
        return arr
      })(),
      Actived: (() => {
        let arr = []
        for (let i = 0; i < 20; i++) {
          arr.push({
            title: '合同登记',
            status: ' ●我发起的',
            name: '刘志',
            time: '2018-08-12 12:30:10'
          })
        }
        return arr
      })(),
      Join: (() => {
        let arr = []
        for (let i = 0; i < 20; i++) {
          arr.push({
            title: '合同登记',
            status: ' ●我参与的',
            name: '刘志',
            time: '2018-08-12 12:30:10'
          })
        }
        return arr
      })()
    }
  },
  created () {
    this.checkHeight()

    window.addEventListener('resize', () => {
      this.checkHeight()
    })
  },
  computed: {
    initialIndex () {
      let index = 0
      index = findIndex(this.tabLabels, item => item.label === this.selectedLabel)
      return index
    }
  },
  mounted () {
    this._MyWorkInfos()
  },
  methods: {
    // 获取审批（待办）
    _MyWorkInfos () {
      let params = Object.assign({}, {
        types: 'infos,actived,join',
        index: '0',
        size: '0',
        swhere: '',
        humanid: ''
      })
      this.MinXinHttpFetch(MyWorkInfos(params), (response) => {
        // console.log(response)
      })
    },
    changePage (current) {
      this.selectedLabel = this.tabLabels[current].label
    },
    scroll (pos) {
      const x = Math.abs(pos.x)
      const tabItemWidth = this.$refs.tabNav.$el.clientWidth
      const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
      const deltaX = x / slideScrollerWidth * tabItemWidth
      this.$refs.tabNav.setSliderTransform(deltaX)
    },
    checkHeight () {
      this.$nextTick(() => {
        this.messageHeight =
        this.$refs.messageBox.offsetHeight -
        this.$refs.messageHeader.offsetHeight
      })
    },
    isShow (num) {
      return num === this.currentIndex
    },
    switchItem (index) {
      this.currentIndex = index
    }
  },
  components: {
    SwitchesBox,
    SearchBox
  }
}
</script>
<style lang="less"  rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .message-box {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    width: 100%;
    background-color: #F7F7F7;
    &.slide-enter-active, &.slide-leave-active {
      transition: all 0.3s;
    }
    &.slide-enter, &.slide-leave-to {
      transform: translate3d(100%, 0, 0);
    }
    .message-header {
      padding-bottom: 3px;
      height: 44px;
      .cube-tab-bar {
        .cube-tab {
          padding: 13px 0;
          font-size: 14px;
          &.cube-tab_active {
            .active-status();
          }
        }
        .cube-tab-bar-slider {
          background-color: #007ACC;
        }
      }
    }
    .message-content {
      display: block;
      height: calc(100% - 44px);
      width: 100%;
      position: relative;
      .message-item{
        width: 100%;
        height: 100%;
        position: relative;
        .search-wrap {
          background-color: #ffffff;
          padding: 10px;
        }
        .message-lists {
          width: calc(100% - 20px);
          margin: 0 auto;
          .message-list {
            width: 100%;
            margin-top: 15px;
            background-color: #ffffff;
            border-radius: 5px;
            &:last-child {
              margin-bottom: 10px;
            }
            .list-inner {
              padding: 10px;
              .list-header {
                font-size: 15px;
                text-align: left;
                span{
                  display: inline-block;
                  &.fa {
                    vertical-align: top;
                  }
                  &.title {
                    color: rgba(0, 0, 0, 0.7);
                    max-width: 13em;
                    .css3-ellipsis();
                  }
                  &.mark-tag {
                    float: right;
                  }
                }
              }
              .list-body {
                margin-top: 10px;
                p {
                  text-align: left;
                  padding-top: 5px;
                  color: rgba(0, 0, 0, 0.5);
                  font-size: 13px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
