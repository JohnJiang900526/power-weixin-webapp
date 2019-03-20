<template>
  <div class="project-kpi">
    <h3 class="title font-color-lightGreen">
      <span class="fa fa-bar-chart-o icon"></span>
      关键—KPI
    </h3>
    <ul class="lists">
      <li class="list-unit">
        <div class="list-unit-inner">
          <div class="list-unit-item">
            <div class="item-block power-project-menu-bg1">
              <p class="label">当年合同收入</p>
              <p class="value">￥{{ keyKPI.dnhtsr.ContractAmountRMB_S01 }}万元</p>
            </div>
          </div>
          <div class="list-unit-item">
            <div class="item-block power-project-menu-bg2">
              <p class="label">当年付款</p>
              <p class="value">￥{{ keyKPI.dnfk.ContractAmountRMB_S02 }}万元</p>
            </div>
          </div>
          <div class="list-unit-item">
            <div class="item-block power-project-menu-bg3">
              <p class="label">当年合同付款</p>
              <p class="value">￥{{ keyKPI.dnhtfk.ContractAmountRMB_S03 }}万元</p>
            </div>
          </div>
        </div>
      </li>
      <li class="list-unit">
        <div class="list-unit-inner">
          <div class="list-unit-item">
            <div class="item-block power-project-menu-bg4">
              <p class="label">当年分包合同额</p>
              <p class="value">￥{{ keyKPI.dnfbhte.ContractAmountRMB_S04 }}万元</p>
            </div>
          </div>
          <div class="list-unit-item">
            <div class="item-block power-project-menu-bg5">
              <p class="label">当年计划完成额</p>
              <p class="value">￥{{ keyKPI.dnjhwce.ContractAmountRMB_S05 }}万元</p>
            </div>
          </div>
          <div class="list-unit-item">
            <div class="item-block power-project-menu-bg6">
              <p class="label">当年实际完成额</p>
              <p class="value">￥{{ keyKPI.dnsjwce.ContractAmountRMB_S06 }}万元</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    keyKPI: {
      type: Object,
      default () {
        return {
          dnhtsr: {}, // 当年合同收入
          dnhtfk: {}, // 当年合同付款
          dnfk: {}, // 当年付款
          dnfbhte: {}, // 当年分包合同额
          dnjhwce: {}, // 当年计划完成额
          dnsjwce: {} // 当年实际完成额
        }
      }
    }
  }
}
</script>
<style lang="less" scoped  rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .project-kpi {
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
        .list-unit-inner {
          display: flex;
          .list-unit-item {
            font-size: 12px;
            min-width: 0px;
            flex: 1;
            .item-block {
              width: 90%;
              margin: 0 auto;
              border-radius: 3px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
              .label {
                padding: 7px 0;
                text-align: center;
                color: #ffffff;
              }
              .value {
                padding: 7px 0;
                text-align: center;
                color: #ffffff;
              }
            }
          }
        }
      }
    }
  }
</style>
