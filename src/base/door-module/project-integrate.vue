<template>
  <div class="project-kpi">
    <h3 class="title font-color-lightGreen">
      <span class="fa fa-bar-chart-o icon"></span>
      项目综合情况
    </h3>
    <div class="chart-wrap">
      <div class="select-wrap">
        <cube-select
          placeholder="请选择项目"
          title="请选择项目"
          :options="options"
          v-model="selectData"
          @change="change"
          ></cube-select>
      </div>
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
import { toThousand } from 'common/js/Util.js'

export default {
  props: {
    chartData: {
      type: Object,
      default () {
        return {
          tb_x: [],
          tb_y1: [],
          tb_y2: [],
          tb_y3: [],
          tb_y4: [],
          tb_y5: [],
          tb_y6: [],
          tb_y7: [],
          tb_y8: []
        }
      }
    }
  },
  data () {
    return {
      options: [],
      selectData: '',
      title: '',
      chartOption: {
        title: {
          text: '',
          show: true,
          left: '7%',
          right: '7%',
          bottom: '0',
          textStyle: {
            fontWeight: '100',
            fontSize: 12,
            align: 'center'
          }
        },
        legend: {
          data: ['主合同金额', '累计已收款金额', '累计已付款金额', '累计采购分包合同金额', '累计计划完成金额', '累计实际完成金额', '预计毛利总和', '累计转结考核收入']
        },
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: function (item) {
            return `${item.seriesName}</br>${toThousand(item.value)}万元`
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
          data: []
        }, {
          name: '累计已收款金额',
          type: 'bar',
          data: []
        }, {
          name: '累计已付款金额',
          type: 'bar',
          data: []
        }, {
          name: '累计采购分包合同金额',
          type: 'bar',
          data: []
        }, {
          name: '累计计划完成金额',
          type: 'bar',
          data: []
        }, {
          name: '累计实际完成金额',
          type: 'bar',
          data: []
        },
        {
          name: '预计毛利总和',
          type: 'bar',
          data: []
        },
        {
          name: '累计转结考核收入',
          type: 'bar',
          data: []
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
    },
    change (value, index, text) {
      this.setChartData(index)
    },
    setChartData (index) {
      let option = Object.assign({}, this.chartOption)
      let series = [...option.series]
      if (!index) {
        index = 0
      }

      let title = this.chartData.tb_x[index].project_name
      this.options = [...this.chartData.tb_x].map((item) => {
        return item.project_name
      })

      this.selectData = title
      series.map((item, num) => {
        item.data[0] = this.chartData['tb_y' + (num + 1)][index].ContractPrice

        return item
      })

      option.title.text = title
      option.series = [...series]

      this.chart.setOption(option, true)
    }
  },
  destroyed () {
    window.removeEventListener('resize', this.resize)
  }
}
</script>
<style lang="less"  rel="stylesheet/less">
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
      .select-wrap {
        margin-top: 10px;
        padding: 0 20px;
        .cube-select::after {
          border: 1PX solid #188AEB;
        }
      }
    }
  }

  .cube-picker-wheel-item {
    font-size: 14px!important;
  }
</style>
