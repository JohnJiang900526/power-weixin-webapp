<template>
  <div ref="businessCenter" class="content-box business-center">
    <cube-sticky
      :pos="scrollY"
      :check-top="checkTop"
      fixed-show-ani="sticky-fixed-show"
      @diff-change="diffChange"
      >
      <cube-scroll
        ref="BusinessScroll"
        :scroll-events="scrollEvents"
        @scroll="scrollHandler"
        :options="options"
        @pulling-down="onPullingDown"
        >
        <div class="business-content">
          <div ref="BananerWrap" class="banner-wrap">
            <Bananer ref="Bananer"></Bananer>
          </div>
          <cube-sticky-ele>
            <div class="sticky-header">
              <SwitchBtn
                :Message="Message"
                :Notify="Notify"
                :Work="Work"
              ></SwitchBtn>
              <line-break></line-break>
            </div>
          </cube-sticky-ele>

          <div class="doors-content">
            <door></door>
          </div>
        </div>
      </cube-scroll>

      <div class="sticky-header sticky" slot="fixed" ref="stickyHeader">
        <SwitchBtn
          ref="SwitchBtn"
          :Message="Message"
          :Notify="Notify"
          :Work="Work"
        ></SwitchBtn>
        <line-break></line-break>
      </div>
    </cube-sticky>
    <div :style="{position: 'static'}">
      <router-view></router-view>
    </div>
    <toast v-model="mx_toastShow" type="text" :time="mx_deleyTime">修改成功</toast>
    <alert v-model="mx_alertShow" @on-hide="MixinAlertHideEvent" :title="mx_alertTitle" :content="mx_message"></alert>
  </div>
</template>
<script type="text/ecmascript-6">
import { getStoreUserSession } from 'api/UserSession.js'
import { commonComponentMixin } from 'common/js/mixin.js'
import { MyInformCount } from 'api/index.js'
import { LineBreak } from 'components/index.js'
import SwitchBtn from 'base/switch-btn/switch-btn.vue'
import Bananer from 'base/bananer/banner.vue'
import Door from '../Doors/Door.vue'

export default {
  name: 'bussiness',
  mixins: [commonComponentMixin],
  data () {
    return {
      Message: 0,
      Notify: 0,
      Work: 0,
      scrollY: 0,
      checkTop: true,
      scrollEvents: ['scroll'],
      pullDownRefreshThreshold: 60,
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
        scrollbar: false
      }
    }
  },
  mounted () {
    this._MyInformCount()
  },
  methods: {
    onPullingDown () {
      this._MyInformCount(() => {
        this.$refs.BusinessScroll.forceUpdate()
      })
      this.$refs.Bananer.getProjectInfo()
    },
    scrollHandler ({ y }) {
      this.scrollY = -y
    },
    diffChange (diff, height) {
      let opacity = 0
      if (height) {
        opacity = diff / height
      }
      this.$refs.stickyHeader.style.opacity = opacity
    },
    _MyInformCount (callback) {
      let { HumanId } = getStoreUserSession()
      this.MinXinHttpFetch(MyInformCount(HumanId), (response) => {
        let data = response.data
        this.Message = data.Message
        this.Notify = data.Notify
        this.Work = data.Work
        if (callback) {
          callback()
        }
      })
    }
  },
  components: {
    LineBreak,
    Bananer,
    SwitchBtn,
    Door
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
    .business-content, .sticky-header{
      width: 100%;
      .switch-btn{
        display: flex;
        width: 100%;
        background-color: #ffffff;
        .switch-list {
          flex: 1;
          border-right: 1px solid #dddddd;
          padding: 5px 0;
          .text{
            display: block;
            width: 50%;
            height: 30px;
            text-align: center;
            margin: 0 auto;
            line-height: 30px;
            position: relative;
            font-size: 14px;
            .badge{
              display: inline-block;
              position: absolute;
              min-width: 15px;
              height: 15px;
              line-height: 15px;
              border-radius: 9px;
              top: 0px;
              right: -10px;
              background-color: red;
              color: #ffffff;
              font-size: 10px;
            }
          }
          &:last-child{
            border-right: 1px solid transparent;
          }
        }
      }
    }
    .sticky-header {
      &.sticky {
         opacity: 0;
      }
    }
  }
</style>
