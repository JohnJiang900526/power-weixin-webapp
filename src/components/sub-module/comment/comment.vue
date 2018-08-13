<template>
  <div ref="comments" class="comments">
    <div ref="commentsListsContent" class="comments-lists-content">
      <ul class="comments-lists">
        <li v-for="item in comments" :key="item.id" class="list-unit">
          <comments-list :list="item"></comments-list>
        </li>
      </ul>
    </div>
    <div class="send-action-content">
      <div class="send-action">
        <div v-show="false" class="action-list list-subscribe">
          <check-icon :value.sync="subscribeChecked"></check-icon>
        </div>
        <div class="action-list list-at">
          <span class="at-text">@</span>
        </div>
        <div class="action-list show-box">
          <div class="select-lists">
            <span v-for="(i, index) in 4" :key="index" class="select-list">
              <span>李华</span>
              <x-icon type="ios-close-empty" size="25"></x-icon>
            </span>
          </div>
        </div>
        <div class="action-list send-btn-box">
          <span class="send-btn">发送</span>
        </div>
      </div>
      <group class="text-wrap">
        <x-textarea @on-focus="_scrollBottom" :max="200" placeholder="输入评论" v-model="commentValue"></x-textarea>
      </group>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import CommentsList from 'base/comments-list/comments-list.vue'
import { XTextarea, Group, CheckIcon } from 'vux'

export default {
  data () {
    return {
      commentValue: '',
      subscribeChecked: false,
      comments: [{
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
      }, {
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
      }, {
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
        self: true
      }, {
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
        self: true
      }, {
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
        self: true
      }, {
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
        self: true
      }, {
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
        self: true
      }, {
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
        self: true
      }, {
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
        self: true
      }]
    }
  },
  mounted () {
  },
  methods: {
    // 评论列表滚动到底部
    _scrollBottom () {
      this.$nextTick(() => {
        this.commentsListsContent = this.$refs.commentsListsContent
        this.commentsListsContent.scrollTop = this.commentsListsContent.scrollHeight
      })
    }
  },
  components: {
    CommentsList,
    XTextarea,
    Group,
    CheckIcon
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .comments {
    display: block;
    width: 100%;
    height: 100%;
    .comments-lists-content {
      min-height: 400px;
      height: 70%;
      overflow-y: auto;
    }
    .send-action-content {
      min-height: 100px;
      height: 30%;
      .send-action {
        height: 40px;
        .top-line();
        .bottom-line();
        display: flex;
        width: 100%;
        .action-list {
          display: block;
          position: relative;
          min-width: 10px;
          line-height: 40px;
          font-size: 14px;
          &.list-subscribe {
           flex: 0 0 30px;
           width: 30px;
           .vux-check-icon {
              .weui-icon {
                font-size: 18px;
              }
              span {
                font-size: 14px;
              }
           }
          }
          &.list-at {
            flex: 0 0 30px;
            width: 30px;
            text-align: center;
            .at-text {
              padding: 2px 5px;
            }
          }
          &.show-box {
            flex: 1;
            padding: 5px 0;
            .select-lists {
              width: 100%;
              height: 100%;
              border-radius: 3px;
              border: 1px solid #dddddd;
              line-height: 23px;
              .select-list {
                display: inline-block;
                position: relative;
                padding: 0px 24px 0px 4px;
                margin-left: 3px;
                margin-top: 2px;
                background-color: #09BB07;
                border-radius: 3px;
                color: #ffffff;
                .vux-x-icon {
                  fill: #ffffff;
                  position: absolute;
                  top:50%;
                  right: 3px;
                  transform: translateY(-50%);
                }
              }
            }
          }
          &.send-btn-box {
            flex: 0 0 50px;
            text-align: center;
            .send-btn {
              background-color: #09BB07;
              color: #ffffff;
              padding: 4px 6px;
              border-radius: 2px;
            }
          }
        }
      }
      .text-wrap {
        height: calc(100% - 35px);
        .weui-cells {
          height: 100%;
          margin-top: 0px;
          .weui-cell {
            height: 100%;
            padding: 0 10px;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.6);
            .weui-cell__bd {
              height: 100%;
              .weui-textarea {
                height: calc(100% - 55px);
              }
            }
          }
        }
      }
    }
  }
</style>
