<template>
  <div class="project-statistical">
    <h3 class="title font-color-lightGreen">
      <span class="fa fa-bar-chart-o icon"></span>
      项目开发情况统计
    </h3>
    <ul class="lists">
      <li class="list-unit"
          v-for="item in statistical" :key="item.id"
        >
        <div class="list-unit-inner">
          <div class="list-unit-item name">{{ item.name }}</div>
          <div class="list-unit-item num">{{ item.num }}个</div>
          <div class="list-unit-item money">金额：{{ item.money }}元</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      statistical: [
        {
          name: '项目登记',
          id: '0',
          num: 55,
          money: '10000.00'
        },
        {
          name: '开发申请',
          id: '1',
          num: 55,
          money: '10000.00'
        },
        {
          name: '投标评审',
          id: '2',
          num: 55,
          money: '10000.00'
        },
        {
          name: '主合同评审',
          id: '3',
          num: 55,
          money: '10000.00'
        },
        {
          name: '主合同提前启动',
          id: '4',
          num: 55,
          money: '10000.00'
        },
        {
          name: '主合同正式生效',
          id: '5',
          num: 55,
          money: '10000.00'
        }
      ]
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
            min-width: 0px;
            &.name {
              flex: 3;
            }
            &.num {
              flex: 2;
              text-align: center;
            }
            &.money {
              flex: 5;
            }
          }
        }
      }
    }
  }
</style>
