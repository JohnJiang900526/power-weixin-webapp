<template>
  <transition name="slide">
    <div class="project-unit" :style="{'position': position}">
      <div class="project-progress">
        <h3 class="title font-color-lightGreen">
          <span class="fa fa-bar-chart-o icon"></span>
          项目形象进度
        </h3>
        <div class="project-img-wrap">
          <cube-slide ref="slide" :data="slides">
            <cube-slide-item v-for="(item, index) in slides" :key="index">
              <img class="project-img" :src="item.url">
            </cube-slide-item>
          </cube-slide>
        </div>
        <ul v-if="projectPortalRight" class="lists">
          <li class="list-unit">
            <div class="list-unit-inner">
              <div class="list-unit-item name">总工期:</div>
              <div class="list-unit-item value">{{xxjd1_zgq.ContractPeriod}}天</div>
            </div>
          </li>
          <li class="list-unit">
            <div class="list-unit-inner">
              <div class="list-unit-item name">距合同工期剩余时间:</div>
              <div class="list-unit-item value">{{xxjd2_htgqts.ContractDate}}天</div>
            </div>
          </li>
          <li class="list-unit">
            <div class="list-unit-inner">
              <div class="list-unit-item name">距目标工期剩余时间:</div>
              <div class="list-unit-item value">{{xxjd3_mbgqts.PlanPeriod}}天</div>
            </div>
          </li>
          <li class="list-unit">
            <div class="list-unit-inner">
              <div class="list-unit-item name">累计项目完成进度:</div>
              <div class="list-unit-item value">{{xxjd4_ljwcjd.complete_pct}}%</div>
            </div>
          </li>
          <li class="list-unit">
            <div class="list-unit-inner">
              <div class="list-unit-item name">累计已完成金额:</div>
              <div class="list-unit-item value">{{xxjd5_ljwcje.CountRMB}}万元</div>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="projectPortalRight" class="project-base">
        <h3 class="title font-color-lightGreen">
          <span class="fa fa-bar-chart-o icon"></span>
          基本信息
        </h3>
        <ul class="lists">
          <li class="list-unit">
            <div class="list-unit-inner">
              <div class="list-unit-item name">项目编号:</div>
              <div class="list-unit-item value">{{Infos.ProjectCode || '暂无'}}</div>
            </div>
          </li>
          <li class="list-unit">
            <div class="list-unit-inner">
              <div class="list-unit-item name">项目名称:</div>
              <div class="list-unit-item value">{{Infos.ProjectName || '暂无'}}</div>
            </div>
          </li>
          <li class="list-unit">
            <div class="list-unit-inner">
              <div class="list-unit-item name">项目经理:</div>
              <div class="list-unit-item value">{{Infos.human || '暂无'}}</div>
            </div>
          </li>
          <li class="list-unit">
            <div class="list-unit-inner">
              <div class="list-unit-item name">业主名称:</div>
              <div class="list-unit-item value">{{Infos.ProjectOwner || '暂无'}}</div>
            </div>
          </li>
          <li class="list-unit">
            <div class="list-unit-inner">
              <div class="list-unit-item name">所在地区:</div>
              <div class="list-unit-item value">{{Infos.ProjectAddress || '暂无'}}</div>
            </div>
          </li>
          <li class="list-unit">
            <div class="list-unit-inner">
              <div class="list-unit-item name">计划开始:</div>
              <div class="list-unit-item value">{{ Infos_date.start_date || '暂无' }}</div>
            </div>
          </li>
          <li class="list-unit">
            <div class="list-unit-inner">
              <div class="list-unit-item name">实际开始:</div>
              <div class="list-unit-item value">{{ Infos_date.act_start_date || '暂无' }}</div>
            </div>
          </li>
          <li class="list-unit">
            <div class="list-unit-inner">
              <div class="list-unit-item name">计划结束:</div>
              <div class="list-unit-item value">{{ Infos_date.end_date || '暂无' }}</div>
            </div>
          </li>
          <li class="list-unit">
            <div class="list-unit-inner">
              <div class="list-unit-item name">实际结束:</div>
              <div class="list-unit-item value">{{ Infos_date.act_end_date || '暂无' }}</div>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="projectPortalRight" class="project-money">
        <h3 class="title font-color-lightGreen">
          <span class="fa fa-bar-chart-o icon"></span>
          项目收付款情况
        </h3>
        <ul class="lists">
          <li class="list-unit">
            <div class="list-unit-inner">
              <div class="list-unit-item name">累计已收款金额(不含退税):</div>
              <div class="list-unit-item value">{{skqk1_ljskje.ContractAmountRMB_S01 || 0}}万元</div>
            </div>
          </li>
          <li class="list-unit">
            <div class="list-unit-inner">
              <div class="list-unit-item name">截止到目前为止累计已付款金额:</div>
              <div class="list-unit-item value">{{skqk2_ljfkje.ContractAmountRMB_S02 || 0}}万元</div>
            </div>
          </li>
          <li class="list-unit">
            <div class="list-unit-inner">
              <div class="list-unit-item name">截止到目前为止累计合同付款金额:</div>
              <div class="list-unit-item value">{{skqk3_ljhtfkje.ContractAmountRMB_S03 || 0}}万元</div>
            </div>
          </li>
          <li class="list-unit">
            <div class="list-unit-inner">
              <div class="list-unit-item name">截止到目前为止分包采购合同累计签约金额:</div>
              <div class="list-unit-item value">{{skqk4_cghtqyje.ContractAmountRMB_S04 || 0}}万元</div>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="projectPortalRight" class="project-compass">
        <h3 class="title font-color-lightGreen">
          <span class="fa fa-bar-chart-o icon"></span>
          项目进度罗盘
        </h3>
        <div class="compass-wrap">
          <div id="chartCompassBlock" :style="{height: '300px'}"></div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { DefaultPageProjectData } from 'api/index.js'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/gauge'
import 'echarts/lib/component/grid'
import 'echarts/lib/component/tooltip'
import { hostAddress } from 'common/js/Util.js'

const debug = process.env.NODE_ENV !== 'production'

export default {
  props: {
    managePortalRight: {
      type: Boolean,
      default: true
    },
    projectPortalRight: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      host: '',
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
            data: [{value: 0, name: '进度差值'}]
          }
        ]
      },
      query: {},
      projectData: {},
      slides: [],
      Imgs: [],
      Infos: {
        ProjectAddress: '',
        ProjectCode: '',
        ProjectName: '',
        ProjectOwner: '',
        STATE: '',
        human: ''
      },
      Infos_date: {
        act_end_date: '',
        act_start_date: '',
        end_date: '',
        start_date: ''
      },
      // 项目首付款情况
      skqk1_ljskje: {
        ContractAmountRMB_S01: ''
      },
      skqk2_ljfkje: {
        ContractAmountRMB_S02: ''
      },
      skqk3_ljhtfkje: {
        ContractAmountRMB_S03: ''
      },
      skqk4_cghtqyje: {
        ContractAmountRMB_S04: ''
      },
      // 形象进度
      xxjd1_zgq: {
        ContractPeriod: ''
      },
      xxjd2_htgqts: {
        ContractDate: ''
      },
      xxjd3_mbgqts: {
        PlanPeriod: ''
      },
      xxjd4_ljwcjd: {
        complete_pct: ''
      },
      xxjd5_ljwcje: {
        CountRMB: ''
      },
      // 仪表
      xmjdlp: {
        ProgressDiff: 0
      }
    }
  },
  created () {
    this.query = Object.assign({}, this.$router.history.current.query)

    let NODE_ENV = process.env.NODE_ENV
    this.host = hostAddress(NODE_ENV)
  },
  computed: {
    position () {
      return "static"
    },
    EpsProjId () {
      return this.projectInfo.project_guid
    },
    ...mapGetters([
      'projectInfo'
    ])
  },
  methods: {
    // 加载数距
    loadData (id) {
      DefaultPageProjectData(id).then((res) => {
        if (this.projectPortalRight) {
          this.drawLine()
        }

        if (res.success) {
          for (let key in res.data) {
            if (key === 'Imgs') {
              this[key] = JSON.parse(res.data[key])
              this.projectData[key] = JSON.parse(res.data[key])
            } else {
              this[key] = Object.assign({}, JSON.parse(res.data[key])[0])
              this.projectData[key] = Object.assign({}, JSON.parse(res.data[key])[0])
            }
          }

          this.slides = this.getProjectBanner(this.Imgs)

          if (this.projectPortalRight) {
            this.reSetChart()
          }
        }
      })
    },
    // 计算项目的banner图片
    getProjectBanner (imgs) {
      let arr = []
      if (!imgs || imgs.length === 0) {
        let devUrl = '/static/project-image.jpg'
        let proUrl = '/weixin3.0/static/project-image.jpg'
        if (debug) {
          let obj = {
            url: devUrl
          }

          arr.push(obj)
        } else {
          let obj = {
            url: proUrl
          }

          arr.push(obj)
        }
      } else if (imgs.length > 0) {
        let imgIds = imgs[0].Remark.split('/')
        arr = imgIds.map((item) => {
          let devUrl = `${this.host}PowerPlat/FormXml/FileViewer.aspx?online=1&fileid=${item}`
          let proUrl = `/PowerPlat/FormXml/FileViewer.aspx?online=1&fileid=${item}`
          return {
            url: debug ? devUrl : proUrl
          }
        })
      }
      return arr
    },
    // 画仪表盘
    drawLine () {
      if (document.getElementById('chartCompassBlock')) {
        this.chart = echarts.init(document.getElementById('chartCompassBlock'))
        this.chart.setOption(this.chartOption)
        window.addEventListener('resize', this.resize)
      }
    },
    // 自适应视窗
    reSetChart () {
      let option = Object.assign({}, this.chartOption)

      option.series[0].data[0].value = this.xmjdlp.ProgressDiff
      this.chart.setOption(option, true)
    },
    // 自适应视窗的resize方法
    resize () {
      this.chart.resize()
    }
  },
  watch: {
    EpsProjId (a, b) {
      this.loadData(a)
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
  @import "./index.less";
</style>
