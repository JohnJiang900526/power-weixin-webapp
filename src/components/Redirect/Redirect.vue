<template>
  <div class="redirect">
    <div class="main-wrap">
      <div class="main-content">
        <cube-loading class="loading" :size="40"></cube-loading>
        <p class="loading-text">正在定向...</p>
      </div>
    </div>
    <alert v-model="alertShow" @on-hide="AlertHideEvent" :title="alertTitle" :content="message"></alert>
  </div>
</template>
<script type="text/ecmascript-6">
import { Alert } from 'vux'

const ERROR = '链接参数错误'

export default {
  data () {
    return {
      alertShow: false,
      alertTitle: '提示',
      message: ''
    }
  },
  created () {
    this.goToPage()
  },
  methods: {
    // 跳转页面
    goToPage () {
      let { query } = this.$router.history.current
      let { url } = query

      if (url) {
        this.$router.push(url)
      } else {
        this.ShowHideEvent(ERROR)
      }
    },
    // alert组件隐藏的时候需要做的事
    AlertHideEvent () {
      this.alertShow = false
    },
    // alert组件的显示
    ShowHideEvent (msg) {
      this.message = msg
      this.alertShow = true
    }
  },
  components: {
    Alert
  }
}
</script>
<style lang="less"  rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .redirect {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background-color: #eeeeee;
    .main-wrap {
      width: 100%;
      height: 100%;
      position: relative;
      .main-content {
        .positionCenter();
        top: 40%;
        .loading {
          margin: 0 auto;
          .cube-loading-spinners {
            margin: 0 auto;
          }
        }
        .loading-text {
          padding: 15px 0;
          font-size: 16px;
        }
      }
    }
  }
</style>
