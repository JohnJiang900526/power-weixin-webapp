<template>
  <div class="comments-list">
    <div class="comments-main-content" v-if="list.self">
      <div class="send-time" :style="{'text-align': list.self ? 'right': 'left'}">
        {{ list.time }} {{list.name}}
      </div>
      <div class="list-main">
        <div class="list-text-content right">
          <span class="at-warp">
            <span class="at-group" v-if="list.atList.length">
              <span class="at-list" v-for="atItem in list.atList" :key="atItem.id" >@{{ atItem.name }}</span>
            </span>
            <span class="list-text">{{ list.text }}</span>
          </span>
        </div>
        <div class="list-avatar">
          <img src="./small.png" alt="">
        </div>
      </div>
    </div>
    <div class="comments-main-content" v-else>
      <div class="send-time" :style="{'text-align': list.self ? 'right': 'left'}">
        {{list.name}} {{ list.time }}
      </div>
      <div class="list-main">
        <div class="list-avatar">
          <img src="./small.png" alt="">
        </div>
        <div class="list-text-content left">
          <span class="at-warp">
            <span class="at-group" v-if="list.atList.length">
              <span class="at-list" v-for="atItem in list.atList" :key="atItem.id" >@{{ atItem.name }}</span>
            </span>
            <span class="list-text">{{ list.text }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    list: {
      type: Object,
      default () {
        return {
          atList: [{
            name: '小李',
            id: '12345678909765432'
          }, {
            name: '小华',
            id: '12345678432124876'
          }],
          time: '2018-07-26',
          name: '蒋昂',
          text: '评论测试',
          self: false
        }
      }
    }
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .comments-list {
    width: 100%;
    padding: 10px 10px 0px 10px;
    .comments-main-content {
      .send-time {
        font-size: 13px;
        color: rgba(0, 0, 0, 0.6);
        padding: 5px 0px;
        &.left {
          text-align: left;
        }
        &.right {
          text-align: right;
        }
      }
      .list-main {
        display: flex;
        width: 100%;
        .list-text-content {
          flex: 1;
          min-width: 10px;
          position: relative;
          padding: 0 10px;
          line-height: 40px;
          .at-warp {
            padding: 0 10px;
            display: inline-block;
            line-height: 30px;
            border-radius: 5px;
            font-size: 14px;
            max-width: 90%;
            word-break: break-all;
            .at-group {
              .at-list {
                color: #0AB9F5;
                padding-right: 10px;
              }
            }
          }
          &.right {
            text-align: right;
            .at-warp {
              background-color: #98E165;
              .right-arrow();
            }
          }
          &.left {
            text-align: left;
            .at-warp {
              background-color: #ffffff;
              .left-arrow();
            }
          }
        }
        .list-avatar {
          flex: 0 0 40px;
          width: 40px;
          height: 40px;
          position: relative;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            .positionCenter();
          }
        }
      }
    }
  }
</style>
