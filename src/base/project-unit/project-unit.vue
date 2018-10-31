<template>
  <transition name="slide">
    <div class="project-unit">
      <div class="project-progress">
        <h3 class="title font-color-lightGreen">
          <span class="fa fa-bar-chart-o icon"></span>
          项目形象进度
        </h3>
        <div class="project-img-wrap">
          <img class="project-img" src="./project-image.jpg" alt="">
        </div>
        <ul class="lists">
          <li class="list-unit"
            v-for="item in progress" :key="item.name"
            >
            <div class="list-unit-inner">
              <div class="list-unit-item name">{{item.name}}:</div>
              <div class="list-unit-item value">{{item.value}}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="project-base">
        <h3 class="title font-color-lightGreen">
          <span class="fa fa-bar-chart-o icon"></span>
          基本信息
        </h3>
        <ul class="lists">
          <li class="list-unit">
            <div class="list-unit-inner">
              <div class="list-unit-item name">项目编号:</div>
              <div class="list-unit-item value">CHMC-2018-10-25</div>
            </div>
          </li>
          <li class="list-unit">
            <div class="list-unit-inner">
              <div class="list-unit-item name">项目名称:</div>
              <div class="list-unit-item value">柬埔寨电力工程</div>
            </div>
          </li>
          <li class="list-unit">
            <div class="list-unit-inner">
              <div class="list-unit-item name">项目经理:</div>
              <div class="list-unit-item value">郑汉松</div>
            </div>
          </li>
          <li class="list-unit">
            <div class="list-unit-inner">
              <div class="list-unit-item name">业主名称:</div>
              <div class="list-unit-item value">柬埔寨电力工程有限公司</div>
            </div>
          </li>
          <li class="list-unit">
            <div class="list-unit-inner">
              <div class="list-unit-item name">所在地区:</div>
              <div class="list-unit-item value">柬埔寨的一个省</div>
            </div>
          </li>
          <li class="list-unit">
            <div class="list-unit-inner">
              <div class="list-unit-item name">计划开始:</div>
              <div class="list-unit-item value">2014-11-26</div>
            </div>
          </li>
          <li class="list-unit">
            <div class="list-unit-inner">
              <div class="list-unit-item name">实际开始:</div>
              <div class="list-unit-item value">2014-11-26</div>
            </div>
          </li>
          <li class="list-unit">
            <div class="list-unit-inner">
              <div class="list-unit-item name">计划结束:</div>
              <div class="list-unit-item value">2018-07-26</div>
            </div>
          </li>
          <li class="list-unit">
            <div class="list-unit-inner">
              <div class="list-unit-item name">实际结束:</div>
              <div class="list-unit-item value">2024-10-26</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="project-money">
        <h3 class="title font-color-lightGreen">
          <span class="fa fa-bar-chart-o icon"></span>
          项目首付款情况
        </h3>
        <ul class="lists">
          <li class="list-unit">
            <div class="list-unit-inner">
              <div class="list-unit-item name">累计收款金额:</div>
              <div class="list-unit-item value">66.541.75万元</div>
            </div>
          </li>
          <li class="list-unit">
            <div class="list-unit-inner">
              <div class="list-unit-item name">实时累计已付款金额:</div>
              <div class="list-unit-item value">66.541.75万元</div>
            </div>
          </li>
          <li class="list-unit">
            <div class="list-unit-inner">
              <div class="list-unit-item name">实时累计合同付款金额:</div>
              <div class="list-unit-item value">66.541.75万元</div>
            </div>
          </li>
          <li class="list-unit">
            <div class="list-unit-inner">
              <div class="list-unit-item name">实时累计分包采购合同付款金额:</div>
              <div class="list-unit-item value">66.541.75万元</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="project-compass">
        <h3 class="title font-color-lightGreen">
          <span class="fa fa-bar-chart-o icon"></span>
          项目进度罗盘
        </h3>
        <div class="compass-wrap">
          <div id="chartCompass" :style="{height: '300px'}"></div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/gauge'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/tooltip'

export default {
  data () {
    return {
      progress: [
        {
          name: '总工期',
          value: '1029天'
        },
        {
          name: '据合同工期剩余时间',
          value: '420天'
        },
        {
          name: '据目标工期剩余时间',
          value: '139天'
        },
        {
          name: '累计项目完成进度',
          value: '100%'
        }
      ],
      chartOption: {
        tooltip: {
          formatter: '{b} : {c}%'
        },
        grid: {
          left: 0,
          top: 0,
          right: 0,
          bottom: 0
        },
        series: [
          {
            name: '进度差值',
            type: 'gauge',
            radius: '85%',
            splitNumber: 10,
            min: -100,
            max: 100,
            axisLine: {
              lineStyle: {
                color: [[0.2, '#ff4500'], [0.8, '#48b'], [1, '#228b22']],
                width: 10
              }
            },
            title: {
              textStyle: {
                fontWeight: 'normal',
                fontSize: 14,
                color: '#228B22'
              }
            },
            pointer: {
              width: 10
            },
            detail: {formatter: '{value}%'},
            data: [{value: 50, name: '进度差值'}]
          }
        ]
      }
    }
  },
  mounted () {
    this.drawLine()

    this.reSetChart()
  },
  methods: {
    drawLine () {
      document.title = '巴基斯坦500KV输电线路项目'
      this.chart = echarts.init(document.getElementById('chartCompass'))
      this.chart.setOption(this.chartOption)

      window.addEventListener('resize', this.resize)
    },
    reSetChart () {
      this.timer = setInterval(() => {
        let option = Object.assign({}, this.chartOption)

        option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0
        this.chart.setOption(option, true)
      }, 2000)
    },
    resize () {
      this.chart.resize()
    }
  },
  destroyed () {
    window.removeEventListener('resize', this.resize)

    clearInterval(this.timer)
  }
}
</script>
<style lang="less" scoped  rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .project-unit {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background-color: #fff;
    &.slide-enter-active, &.slide-leave-active {
      transition: all 0.3s;
    }
    &.slide-enter, &.slide-leave-to {
      transform: translate3d(100%, 0, 0)
    }
    .project-base, .project-progress, .project-money, .project-compass {
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
                flex: 1;
                color: rgba(0, 0, 0, 0.6);
              }
              &.value {
                flex: 1;
                color: rgba(0, 0, 0, 0.8);
              }
            }
          }
        }
      }
    }
    .project-progress {
      .project-img-wrap {
        width: 100%;
        .project-img {
          display: block;
          width: 100%;
        }
      }
    }
    .project-money {
      .lists {
        .list-unit {
          .list-unit-inner {
            .list-unit-item {
              &.name {
                flex: 3
              }
              &.value {
                flex: 2
              }
            }
          }
        }
      }
    }
    .project-compass {

    }
  }
</style>
