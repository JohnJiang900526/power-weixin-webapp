<template>
  <div class="banners">
    <div v-if="type==='project'" class="banner-list type-1">
      <img class="banner-bg" src="./banner.png">
      <div class="human-message">
        <div class="avatar">
          <img class="header-logo" src="./default-sir.jpg" alt="头像">
        </div>
        <div class="project-msg-wrap">
          <div @click="changeShow" class="project-name">
            <p>{{ projectInfoMsg.project_name || '----' }}</p>
            <span class="fa fa-angle-right"></span>
          </div>
          <div class="project-time">
            <div class="time-list">
              <span>计划开工：</span>
              <span>{{ _formatDate(projectInfo.target_start_date) || '----' }}</span>
            </div>
            <div class="time-list">
              <span>计划竣工：</span>
              <span>{{ _formatDate(projectInfo.target_end_date) || '----' }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="type==='base'" class="banner-list type-2">
      <img class="banner-bg" src="./banner.png">
      <div class="human-message">
        <div class="avatar">
          <img class="header-logo" src="./default-sir.jpg" alt="头像">
        </div>
        <div class="message">
          <p>
            <span>你好</span>
            <span class=""></span>
            <span>{{ UserSession.UserName || "" }}</span>
          </p>
          <p>
            <span>{{ UserSession.UserCode || "" }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters, mapMutations } from 'vuex'
import { ProjectInfo } from 'api/index.js'
import { getStoreUserSession } from 'api/UserSession.js'
import { formatDate } from 'common/js/Util.js'

export default {
  props: {
    type: {
      type: String,
      default: 'project'
    }
  },
  data () {
    return {
      projectInfoMsg: {},
      UserSession: {}
    }
  },
  computed: {
    ...mapGetters([
      'projectInfo'
    ])
  },
  created () {
    this.UserSession = getStoreUserSession()
  },
  mounted () {
    if (this.type === 'project') {
      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.timer = setTimeout(() => {
        this.getProjectInfo()
      }, 500)
    }
  },
  methods: {
    getProjectInfo () {
      let { EpsProjId } = this.UserSession
      ProjectInfo(EpsProjId).then((response) => {
        this.setProjectInfo(response.data)
        this.projectInfoMsg = Object.assign({}, response.data)
      }).catch((e) => {
        console.log(e)
      })
    },
    _formatDate (time) {
      return formatDate(time)
    },
    // 打开切换项目面板
    changeShow () {
      this.$router.push('/changeproject')
    },
    ...mapMutations({
      setProjectInfo: 'SET_PROJECTINFO'
    })
  }
}
</script>
<style lang="less" scoped  rel="stylesheet/less">
@import "~common/styles/mixin.less";

.banners {
  .banner-list {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 40%;
    overflow: hidden;
    &.type-1 {
      .banner-bg {
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
          width: 40px;
          height: 40px;
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
            font-size: 13px;
            padding: 5px 0;
            p {
              display: inline-block;
            }
            .fa{
              width: 10%;
              font-size: 18px;
              padding-left: 10px;
              font-size: 20px;
            }
          }
          .project-time{
            display: flex;
            width: 100%;
            font-size: 12px;
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
    &.type-2 {
      .banner-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .human-message {
        width: 80%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        .avatar {
          width: 60px;
          height: 60px;
          flex: 0 0 60px;
          .header-logo{
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .message{
          flex: 1;
          font-size: 14px;
          padding-left: 20%;
          color: #ffffff;
          text-align: left;
          p {
            line-height: 30px;
          }
        }
      }
    }
  }
}
</style>
