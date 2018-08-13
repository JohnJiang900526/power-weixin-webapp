<template>
  <div class="attach-list">
    <div class="list-unit avatar-box">
      <img v-lazy="host + getFileIconLink(attachList)" alt="">
    </div>
    <div class="list-unit title-box">
      <p class="list-title list-unit-date"> {{ this._formatDate(attachList.UpdDate) }}</p>
      <p class="list-title list-unit-title">{{ attachList.Name }}{{ attachList.FileExt }}</p>
    </div>
    <div class="list-unit delete-box">
      <div v-show="false" @click.stop.prevent="deleteFile" class="close-icon">
        <x-icon type="ios-close-empty" size="30"></x-icon>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { formatDate, getFileIcon, hostAddress } from 'common/js/Util.js'
import { commonComponentMixin } from 'common/js/mixin.js'
import { deleteFileTatch } from 'api/index.js'

export default {
  mixins: [commonComponentMixin],
  props: {
    attachList: {
      type: Object,
      default () {
        return {
          UpdHumName: '附件测试',
          avatar: './fileVideo.png',
          Name: 'fileVideo.png',
          id: ''
        }
      }
    }
  },
  created () {
    let NODE_ENV = process.env.NODE_ENV
    this.host = hostAddress(NODE_ENV)
  },
  methods: {
    deleteFile () {
      let params = {
        _fileid: this.attachList.Id
      }
      this.MinXinHttpFetch(deleteFileTatch(params), (response) => {
        console.log(response)
      })
    },
    _formatDate (date) {
      return formatDate(date)
    },
    getFileIconLink (item) {
      return getFileIcon(item)
    }
  }
}
</script>
<style lang="less" scoped rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .attach-list {
    width: 100%;
    display: flex;
    .top-line();
    .list-unit{
      display: block;
      min-width: 10px;
      position: relative;
      &.avatar-box {
        flex: 0 0 60px;
        height: 60px;
        width: 60px;
        img {
          width: 70%;
          height: 70%;
          .positionCenter();
        }
      }
      &.title-box {
        flex: 1;
        display: flex;
        flex-direction: column;
        .list-title {
          flex: 1;
          min-width: 10px;
          line-height: 30px;
          &.list-unit-date {
            font-size: 16px;
            .css3-ellipsis();
          }
          &.list-unit-title {
            font-size: 14px;
            color: rgba(0 , 0, 0, 0.6);
            .css3-ellipsis();
          }
        }
      }
      &.delete-box {
        flex: 0 0 30px;
        width: 30px;
        .close-icon {
          .positionCenter();
        }
      }
    }
  }
</style>
