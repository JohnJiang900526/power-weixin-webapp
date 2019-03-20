<template>
  <div class="project-statistical">
    <h3 class="title font-color-lightGreen">
      <span class="fa fa-bar-chart-o icon"></span>
      项目开发情况统计
    </h3>
    <ul class="lists">
      <li class="list-unit">
        <div class="list-unit-inner">
          <div class="list-unit-item name">项目登记</div>
          <div class="list-unit-item num">{{ xmdj.Num1 }}个</div>
          <div class="list-unit-item money">金额：{{ xmdj.ContractAmountRMB_S1 }}元</div>
        </div>
      </li>

      <li class="list-unit">
        <div class="list-unit-inner">
          <div class="list-unit-item name">开发申请</div>
          <div class="list-unit-item num">{{ kfsq.Num2 }}个</div>
          <div class="list-unit-item money">金额：{{ kfsq.ContractAmountRMB_S2 }}元</div>
        </div>
      </li>

      <li class="list-unit">
        <div class="list-unit-inner">
          <div class="list-unit-item name">投标评审</div>
          <div class="list-unit-item num">{{ tbps.Num3 }}个</div>
          <div class="list-unit-item money">金额：{{ tbps.ContractAmountRMB_S3 }}元</div>
        </div>
      </li>

      <li class="list-unit">
        <div class="list-unit-inner">
          <div class="list-unit-item name">主合同评审</div>
          <div class="list-unit-item num">{{ zhtps.Num4 }}个</div>
          <div class="list-unit-item money">金额：{{ zhtps.ContractAmountRMB_S4 }}元</div>
        </div>
      </li>

      <li class="list-unit">
        <div class="list-unit-inner">
          <div class="list-unit-item name">主合同提前启动</div>
          <div class="list-unit-item num">{{ zhttqqd.Num5 }}个</div>
          <div class="list-unit-item money">金额：{{ zhttqqd.ContractAmountRMB_S5 }}元</div>
        </div>
      </li>

      <li class="list-unit">
        <div class="list-unit-inner">
          <div class="list-unit-item name">主合同正式生效</div>
          <div class="list-unit-item num">{{ zhtzssx.Num6 }}个</div>
          <div class="list-unit-item money">金额：{{ zhtzssx.ContractAmountRMB_S6 }}元</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    devSituation: {
      type: Object,
      default () {
        return {
          xmdj: {}, // 项目登记
          kfsq: {}, // 开发申请
          tbps: {}, // 投标评审
          zhtps: {}, // 主合同评审
          zhttqqd: {}, // 主合同提前启动
          zhtzssx: {} // 主合同正式生效
        }
      }
    }
  },
  data () {
    return {
      xmdj: {}, // 项目登记
      kfsq: {}, // 开发申请
      tbps: {}, // 投标评审
      zhtps: {}, // 主合同评审
      zhttqqd: {}, // 主合同提前启动
      zhtzssx: {} // 主合同正式生效
    }
  },
  methods: {
    setData () {
      for (let key in this.devSituation) {
        this[key] = this.devSituation[key]
      }
    }
  }
}
</script>
<style lang="less" scoped  rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .project-statistical {
    box-sizing: border-box;
    padding: 0 3px;
    width: 100%;
    .title {
      font-size: 14px;
      padding: 10px;
      .bottom-line();
      .icon {
        color: rgba(0, 0, 0, 0.7);
      }
    }
    .lists {
      padding: 10px 0;
      .bottom-line();
      .list-unit {
        box-sizing: border-box;
        padding: 7px 10px;
        border-bottom: 1px dotted #c8c7cc;
        &:last-child{
          border-bottom: 1px dotted transparent;
        }
        .list-unit-inner {
          display: flex;
          .list-unit-item {
            font-size: 12px;
            padding: 6px 0;
            min-width: 0px;
            &.name {
              flex: 6;
            }
            &.num {
              flex: 2;
            }
            &.money {
              flex: 12;
            }
          }
        }
      }
    }
  }
</style>
