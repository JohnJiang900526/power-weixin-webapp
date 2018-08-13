<template>
  <div class="Report">
    <div class="report-lists-wrap">
      <ul class="report-lists">
        <li v-for="(i, index) in 20" :key="index" class="report-list">
          <div class="report-list-inner">
            <div class="list-massage">发松岛枫松岛枫</div>
            <div class="list-icon">
              <div class="icon-wrap">
                <x-icon type="ios-arrow-right" size="25"></x-icon>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">

export default {
  data () {
    return {
    }
  },
  components: {
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .Report {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    overflow-y: auto;
    .report-lists-wrap {
      .report-lists {
        display: block;
        .report-list {
          margin-top: 10px;
          width: 100%;
          background-color: #ffffff;
          .top-line();
          .bottom-line();
          &:last-child {
            margin-bottom: 20px;
          }
          .report-list-inner {
            width: 100%;
            height: 45px;
            display: flex;
            .list-massage {
              flex: 1;
              position: relative;
              line-height: 45px;
              padding: 0 10px;
              color: rgba(0, 0, 0, 0.8);
              font-size: 16px;
              .css3-ellipsis();
            }
            .list-icon {
              flex: 0 0 30px;
              position: relative;
              .icon-wrap {
                .positionCenter();
                .vux-x-icon {
                  fill: #8f8f94;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
