<template>
  <div class="file-attach">
    <div class="file-attach-inner">
      <form class="file-attach-content">
        <div v-if="picFileAttach.length > 0" class="file-attach-type">
          <h1 class="type-title">图片</h1>
          <ul class="file-attach-lists">
            <li @click.stop.prevent="showFile(item)" v-for="item in picFileAttach" :key="item.Id" class="file-attach-list">
              <attach-list :attachList="item"></attach-list>
            </li>
          </ul>
        </div>
        <div v-if="mediaFileAttach.length > 0" class="file-attach-type">
          <h1 class="type-title">视频</h1>
          <ul class="file-attach-lists">
            <li @click.stop.prevent="showFile(item)" v-for="item in mediaFileAttach" :key="item.Id" class="file-attach-list">
              <attach-list :attachList="item"></attach-list>
            </li>
          </ul>
        </div>
        <div  v-if="officeFileAttach.length > 0" class="file-attach-type">
          <h1 class="type-title">文档</h1>
          <ul class="file-attach-lists">
            <li @click.stop.prevent="showFile(item)" v-for="item in officeFileAttach" :key="item.Id"  class="file-attach-list">
              <attach-list :attachList="item"></attach-list>
            </li>
          </ul>
        </div>
        <div  v-if="otherFileAttach.length > 0" class="file-attach-type">
          <h1 class="type-title">其他</h1>
          <ul class="file-attach-lists">
            <li @click.stop.prevent="showFile(item)" v-for="item in otherFileAttach" :key="item.Id" class="file-attach-list">
              <attach-list :attachList="item"></attach-list>
            </li>
          </ul>
        </div>
      </form>
      <div class="attach-action">
        <div class="attach-action-list">
          <span class="text">上传图片</span>
        </div>
        <div class="attach-action-list">
          <span class="text">上传文档</span>
        </div>
        <div class="attach-action-list">
          <span class="text">上传视频</span>
        </div>
      </div>
    </div>

    <div class="iframe-wrap" :style="{'transform': 'translate3d(' + this.offset + '%, 0, 0)'}">
      <iframe class="iframe" :src="fileLink" frameborder="0"></iframe>
      <div @click="closeFile" v-show="offset <= 100" class="back-wrap">
        <span class="fa fa-reply"></span>
      </div>
    </div>
    <loading v-model="mx_isLoading"></loading>
    <toast v-model="mx_toastShow" type="text" :time="mx_deleyTime">保存成功</toast>
    <alert v-model="mx_alertShow" @on-hide="MixinAlertHideEvent" :title="mx_alertTitle" :content="mx_message"></alert>
  </div>
</template>
<script type="text/ecmascript-6">
import AttachList from 'base/attach-list/attach-list.vue'
import { commonComponentMixin } from 'common/js/mixin.js'
import { hostAddress } from 'common/js/Util.js'
import { GetDocFiles } from 'api/index.js'

export default {
  mixins: [commonComponentMixin],
  data () {
    return {
      picFileAttach: [],
      officeFileAttach: [],
      mediaFileAttach: [],
      otherFileAttach: [],
      fileLink: '',
      offset: 100,
      mx_isLoading: false,
      mx_message: '',
      mx_alertShow: false,
      mx_alertTitle: '提示',
      mx_toastShow: false,
      mx_deleyTime: 1000
    }
  },
  created () {
    let NODE_ENV = process.env.NODE_ENV
    this.host = hostAddress(NODE_ENV)
  },
  methods: {
    closeFile () {
      this.offset = 100
      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.timer = setTimeout(() => {
        this.fileLink = ''
      }, 400)
    },
    showFile (item) {
      this.fileLink = `${this.host}/PowerPlat/FormXml/FileViewer.aspx?online=1&fileid=${item.Id}`
      this.offset = 0
    },
    GetDocFilesLoad (KeyWord, KeyValue) {
      let params = {
        KeyWord: KeyWord,
        KeyValue: KeyValue,
        index: '0',
        size: '0',
        sort: '',
        select: '',
        swhere: ''
      }
      this.MinXinHttpFetch(GetDocFiles(params), (response) => {
        let value = response.data.value
        let getData = []
        if (value !== '') {
          getData = JSON.parse(value)
        }

        console.log(getData)

        this.checkFileKinds(getData)
      })
    },
    checkFileKinds (data) {
      let picPatt = /\.(png|jpe?g|gif|svg)(\?.*)?$/
      let mediaPatt = /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/
      let officePatt = /\.(doc|docx|docm|dot|dotx|dotm|pdf|xls|xlsx|xlsm|xlt|xltx|xltm|csv|ppt|pptx|pptm|pot|potx|potm|pps|ppsx|ppsm)(\?.*)?$/

      let picFileAttach = []
      let mediaFileAttach = []
      let officeFileAttach = []
      let otherFileAttach = []

      for (let i = 0; i < data.length; i++) {
        let item = data[i]
        if (picPatt.test(item.FileExt)) {
          picFileAttach.push(item)
        } else if (mediaPatt.test(item.FileExt)) {
          mediaFileAttach.push(item)
        } else if (officePatt.test(item.FileExt)) {
          officeFileAttach.push(item)
        } else {
          otherFileAttach.push(item)
        }
      }

      this.picFileAttach = picFileAttach
      this.mediaFileAttach = mediaFileAttach
      this.officeFileAttach = officeFileAttach
      this.otherFileAttach = otherFileAttach
    }
  },
  components: {
    AttachList
  }
}
</script>
<style lang="less" scoped rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .file-attach {
    width: 100%;
    height: 100%;
    .file-attach-inner {
      width: 100%;
      height: 100%;
      .file-attach-content {
        width: 100%;
        height: calc(100% - 50px);
        overflow-y: auto;
        .file-attach-type {
          .type-title {
            font-size: 14px;
            padding: 5px 10px;
          }
          .file-attach-lists {
            margin-bottom: 10px;
            .file-attach-list {
              background-color: #ffffff;
            }
          }
        }
      }
      .attach-action {
        width: 100%;
        height: 50px;
        position: relative;
        height: auto;
        display: flex;
        .top-line();
        .attach-action-list {
          flex: 1;
          min-width: 10px;
          line-height: 50px;
          text-align: center;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.8);
        }
      }
    }
    .iframe-wrap {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: all 0.3s;
      background-color: #ffffff;
      overflow: hidden;
      .iframe {
        width: 100%;
        height: 100%;
        border: 0;
        padding: 0;
        margin: 0;
      }
      .back-wrap {
        position: absolute;
        right: 15px;
        bottom: 40px;
        width: 40px;
        height: 40px;
        background-color: #D6D6D6;
        color: #ffffff;
        border-radius: 50%;
        line-height: 40px;
        text-align: center;
      }
    }
  }
</style>
