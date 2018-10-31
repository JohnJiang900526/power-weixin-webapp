<template>
  <div class="project-kpi">
    <h3 class="title font-color-lightGreen">
      <span class="fa fa-bar-chart-o icon"></span>
      项目综合情况
    </h3>
    <div class="chart-wrap">
      <div id="chart" :style="{height: '350px'}"></div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/tooltip'

export default {
  data () {
    return {
      chartOption: {
        title: {
          text: '柬埔寨国家电网230KV西南环网输工程电项目',
          show: true,
          left: '7%',
          right: '7%',
          bottom: '0',
          textStyle: {
            fontWeight: '100',
            fontSize: 12
          }
        },
        legend: {
          data: ['主合同金额', '累计已收款金额', '累计已付款金额', '累计采购分包合同金额', '累计计划完成金额', '累计实际完成金额', '预计毛利总和', '累计转结考核收入']
        },
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: function (item) {
            return `${item.seriesName}</br>${item.value}万元`
          },
          textStyle: {
            fontSize: 12
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          name: '单位: 万元',
          axisLabel: {
            rotate: 45
          },
          textStyle: {
            fontSize: 12
          }
        },
        grid: {
          left: '15%',
          top: 130,
          right: 10,
          bottom: 30
        },
        series: [{
          name: '主合同金额',
          type: 'bar',
          data: [1600]
        }, {
          name: '累计已收款金额',
          type: 'bar',
          data: [10000]
        }, {
          name: '累计已付款金额',
          type: 'bar',
          data: [9000]
        }, {
          name: '累计采购分包合同金额',
          type: 'bar',
          data: [700]
        }, {
          name: '累计计划完成金额',
          type: 'bar',
          data: [2000]
        }, {
          name: '累计实际完成金额',
          type: 'bar',
          data: [200]
        },
        {
          name: '预计毛利总和',
          type: 'bar',
          data: [3200]
        },
        {
          name: '累计转结考核收入',
          type: 'bar',
          data: [5000]
        }]
      }
    }
  },
  mounted () {
    this.drawLine()

    window.addEventListener('resize', this.resize)
  },
  methods: {
    drawLine () {
      this.chart = echarts.init(document.getElementById('chart'))
      this.chart.setOption(this.chartOption)
    },
    resize () {
      this.chart.resize()
    }
  },
  destroyed () {
    window.removeEventListener('resize', this.resize)
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
    .chart-wrap {
      padding-bottom: 20px;
    }
  }
</style>
