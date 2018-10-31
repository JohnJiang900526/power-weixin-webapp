<template>
  <div class="file-attach">
    <div class="file-attach-inner">
      <form class="file-attach-content">
        <div v-if="picFileAttach.length > 0" class="file-attach-type">
          <h1 class="type-title">图片</h1>
          <ul class="file-attach-lists">
            <li @click.stop.prevent="previewImage(item)" v-for="item in picFileAttach" :key="item.Id" class="file-attach-list">
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
      <div @click="upLoad" v-show="offset === 100" class="attach-action">
        <x-icon type="ios-plus-empty" size="40"></x-icon>
      </div>
    </div>

    <div class="iframe-wrap" :style="{'transform': 'translate3d(' + this.offset + '%, 0, 0)'}">
      <iframe class="iframe" :src="fileLink" frameborder="0"></iframe>
      <div @click="closeFile" v-show="offset <= 100" class="back-wrap">
        <span class="fa fa-reply"></span>
      </div>
    </div>
    <loading v-model="mx_isLoading"></loading>
    <toast v-model="mx_toastShow" type="text" :time="mx_deleyTime">{{ toastMsg }}</toast>
    <alert v-model="mx_alertShow" @on-hide="MixinAlertHideEvent" :title="mx_alertTitle" :content="mx_message"></alert>
  </div>
</template>
<script type="text/ecmascript-6">
import AttachList from 'base/attach-list/attach-list.vue'
import { commonComponentMixin } from 'common/js/mixin.js'
import { hostAddress } from 'common/js/Util.js'
import { GetDocFiles, GetJsSdk, AddImage } from 'api/index.js'

export default {
  mixins: [commonComponentMixin],
  props: {
    loadStart: {
      type: Boolean,
      default: false
    },
    KeyWord: {
      type: String,
      default: ''
    },
    KeyValue: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      picFileAttach: [],
      officeFileAttach: [],
      mediaFileAttach: [],
      otherFileAttach: [],
      fileLink: '',
      offset: 100,
      configInit: false,
      imgLocalIdArray: [],
      imgServerIdArray: [],
      upStatusWX: false,
      upStatus: false,
      toastMsg: '',
      text: '',
      text1: '',
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

    this.wx = this.$wechat
  },
  mounted () {
  },
  methods: {
    // 预览文件  微信不支持但是开发文档中有
    previewFile (item) {
      let origin = location.origin
      let address = '/PowerPlat/Control/File.ashx?action=browser&_type=ftp&_fileid='
      let url = origin + address + item.Id
      let size = item.FileSize ? parseInt(item.FileSize) : 1048576

      try {
        this.wx.previewFile({
          url: url,
          name: item.Name || '',
          size: size
        })
      } catch (e) {
        window.open(url)
      }
    },
    // 预览图片
    previewImage (item) {
      let origin = location.origin
      let address = '/PowerPlat/Control/File.ashx?action=browser&_type=ftp&_fileid='
      let imgArray = []
      let currentImg = origin + address + item.Id

      this.picFileAttach.map((imgItem) => {
        let url = origin + address + imgItem.Id
        imgArray.push(url)
      })

      this.wx.previewImage({
        current: currentImg,
        urls: imgArray
      })
    },
    // 获取企业微信配置信息
    getConfig () {
      let url = location.href.split('#')[0]
      GetJsSdk(url).then((response) => {
        let data = response.data
        let config = data.data

        if (data.success) {
          config.jsApiList = config.jsApiList.concat(['previewFile'])
          this.wx.config(config)
          this.configInit = true
        } else {
          this.configInit = false
        }
      })
    },
    // 上传
    upLoad () {
      this.addImageFile(() => {
        this.upLoadFileWX()
      })
    },
    // 添加图片
    addImageFile (callback) {
      this.upStatus = false
      this.upStatusWX = false

      if (!this.configInit) {
        this.MixinAlertShowEvent('微信配置初始化失败，请刷新重试')
        return false
      }

      let that = this
      this.wx.chooseImage({
        // 可以指定来源是相册还是相机，默认二者都有
        sourceType: ['album', 'camera'],
        // ['original', 'compressed']可以指定是原图还是压缩图，默认二者都有
        sizeType: ['compressed'],
        success: function (res) {
          that.imgLocalIdArray = res.localIds.concat()
          if (callback) {
            callback()
          }
        }
      })
    },
    // 递归上传到微信服务器
    upLoadFileWX () {
      let that = this
      if (this.imgLocalIdArray.length > 0) {
        let file = this.imgLocalIdArray.shift()
        this.wx.uploadImage({
          localId: file,
          isShowProgressTips: 1,
          success: function (res) {
            that.imgServerIdArray.push(res.serverId)

            if (that.imgLocalIdArray.length === 0) {
              that.upLoadFile()
            } else {
              that.upLoadFileWX()
            }
          }
        })
      }
    },
    // 上传到业务服务器
    upLoadFile () {
      let arr = this.imgServerIdArray.concat()
      let params = {
        imgServerIds: arr.join(','),
        KeyValue: this.KeyValue,
        KeyWord: this.KeyWord
      }

      this.MinXinHttpFetch(AddImage(params), (response) => {
        this.imgServerIdArray = []
        if (response.success) {
          this.toastMsg = '上传成功'
          this.mx_toastShow = true
          this.GetDocFilesLoad(this.KeyWord, this.KeyValue)
        }
      })
    },
    // 关闭文件
    closeFile () {
      this.offset = 100
      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.timer = setTimeout(() => {
        this.fileLink = ''
      }, 400)
    },
    // 打开文件
    showFile (item) {
      this.fileLink = `${this.host}/PowerPlat/FormXml/FileViewer.aspx?online=1&fileid=${item.Id}`
      this.offset = 0
    },
    // 加载数据附件数据
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

        this.checkFileKinds(getData)
      })
    },
    // 给外部调用
    getFileData (KeyWord, KeyValue) {
      this.getConfig()

      this.GetDocFilesLoad(KeyWord, KeyValue)
    },
    // 文件分类
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
    .file-attach-inner {
      width: 100%;
      .file-attach-content {
        width: 100%;
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
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-radius: 50%;
        position: absolute;
        right: 10px;
        bottom: 70px;
        z-index: 200;
        background-color: #dddddd;
        .vux-x-icon {
          .positionCenter();
          fill: #295AA6;
        }
      }
    }
    .iframe-wrap {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 200;
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
