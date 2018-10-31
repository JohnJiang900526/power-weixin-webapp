<template>
  <div class="list-unit">
    <div class="font-wrap" :style="{ backgroundColor: item.bg || bg }">
      <span :class="item.font || font"></span>
    </div>
    <p class="text" v-html="item.Name || Name"></p>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    item: {
      type: Object,
      default () {
        return {
          font: 'fa fa-book',
          Name: '默认',
          bg: '#286A97'
        }
      }
    }
  },
  data () {
    return {
      font: 'fa fa-book',
      Name: '默认',
      bg: '#286A97'
    }
  }
}
</script>
<style lang="less" scoped  rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .list-unit {
    width: 100%;
    .font-wrap {
      width: 50px;
      height: 50px;
      margin: 0 auto;
      position: relative;
      border-radius: 50%;
      background-color: #dddddd;
      color: #ffffff;
      span{
        position: absolute;
        top:50%;
        left: 50%;
        transform: translate(-50%,-50%);
      }
    }
    .text{
      padding: 10px 3px;
      font-size: 10px;
      text-align: center;
      .css3-ellipsis();
    }
  }
</style>
