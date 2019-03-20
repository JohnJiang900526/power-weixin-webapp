<template>
  <div class="door-content">
    <statistical
      v-if="managePortalRight"
      ref="devSituation"
      :devSituation="devSituation"
      label="项目开发统计"
    ></statistical>

    <project-key
      v-if="managePortalRight"
      :projectPortalRight="projectPortalRight"
      :MajorProjects="MajorProjects"
      label="重点执行项目"
    ></project-key>

    <project-kpi
      v-if="managePortalRight"
      :keyKPI="keyKPI"
      label="关键—KPI"
    ></project-kpi>

    <project-integrate
      v-if="managePortalRight"
      ref="Integrate"
      :chartData="chartData"
      label="项目综合情况"
    ></project-integrate>

    <project-unit-block ref="projectUnit"
      v-if="!managePortalRight"
      :projectPortalRight="projectPortalRight"
      :managePortalRight="managePortalRight"
    ></project-unit-block>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapMutations } from 'vuex'
import { DefaultPageData, DefaultPageProjectRight } from 'api/index.js'
import { getStoreUserSession } from 'api/UserSession.js'
import statistical from 'base/door-module/project-statistical.vue'
import projectKey from 'base/door-module/project-key.vue'
import projectKpi from 'base/door-module/project-kpi.vue'
import projectIntegrate from 'base/door-module/project-integrate.vue'
import projectUnitBlock from 'base/project-unit/project-unit-block.vue'

const MANEGEPORTAL = '管理门户'
const PROJECTPORTAL = '项目门户'

export default {
  data () {
    return {
      Visitset: '',
      // 管理门户权限
      managePortalRight: false,
      // 项目门户权限
      projectPortalRight: false,
      // 重点执行项目
      MajorProjects: [],
      // 关键—KPI
      keyKPI: {
        dnhtsr: {}, // 当年合同收入
        dnhtfk: {}, // 当年合同付款
        dnfk: {}, // 当年付款
        dnfbhte: {}, // 当年分包合同额
        dnjhwce: {}, // 当年计划完成额
        dnsjwce: {} // 当年实际完成额
      },
      // 项目开发统计
      devSituation: {
        xmdj: {}, // 项目登记
        kfsq: {}, // 开发申请
        tbps: {}, // 投标评审
        zhtps: {}, // 主合同评审
        zhttqqd: {}, // 主合同提前启动
        zhtzssx: {} // 主合同正式生效
      },
      // 树状图数据
      chartData: {
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
  },
  mounted () {
    this.getDoorRight()
  },
  methods: {
    // 获取门户的查看权限
    getDoorRight (callback) {
      let UserSession = getStoreUserSession()
      let { EpsProjId, IsAdmin, IsITAdmin } = UserSession

      DefaultPageProjectRight(EpsProjId).then((response) => {
        if (response.success) {
          let value = response.data.value ? JSON.parse(response.data.value)[0] : {}

          if (value) {
            this.Visitset = value.Visitset || ''

            if (this.Visitset.indexOf(MANEGEPORTAL) !== -1) {
              this.managePortalRight = true
            } else {
              this.managePortalRight = false
            }

            if (this.Visitset.indexOf(PROJECTPORTAL) !== -1) {
              this.projectPortalRight = true
            } else {
              this.projectPortalRight = false
            }

            // 如果是管理员，可以例外
          } else if (IsAdmin || IsITAdmin) {
            this.managePortalRight = true
            this.projectPortalRight = true
          }

          this.setManagePortalRight(this.managePortalRight)
          this.setProjectPortalRight(this.projectPortalRight)

          if (this.managePortalRight) {
            this._DefaultPageData()
          }
        }
      })
    },
    // 获取门户的数据
    _DefaultPageData () {
      DefaultPageData().then(response => {
        if (response.success) {
          let obj = Object.assign({})

          for (let key in response.data) {
            obj[key] = response.data[key] !== '' ? JSON.parse(response.data[key]) : []

            // 重点执行项目数据
            if (key === 'MajorProjects') {
              this.MajorProjects = [...obj[key]]
            }

            // KPI的数据
            if (this.keyKPI[key]) {
              this.keyKPI[key] = obj[key][0]
            }

            // 项目开发统计数据
            if (this.devSituation[key]) {
              this.devSituation[key] = Object.assign(this.devSituation[key], obj[key][0])
            }

            // 获取charts数据
            if (this.chartData && this.chartData[key]) {
              this.chartData[key] = [...obj[key]]
            }
          }
          if (this.managePortalRight) {
            this.$refs.devSituation && this.$refs.devSituation.setData()
            this.$refs.Integrate && this.$refs.Integrate.setChartData(0)
          } else {
            this.$refs.projectUnit && this.$refs.projectUnit.loadData(this.MajorProjects[0].project_guid)
          }
        }
      })
    },
    ...mapMutations({
      setManagePortalRight: 'MANAGE_PORTAL_RIGHT',
      setProjectPortalRight: 'PROJECT_PORTAL_RIGHT'
    })
  },
  components: {
    statistical,
    projectKey,
    projectKpi,
    projectIntegrate,
    projectUnitBlock
  }
}
</script>
<style lang="less" scoped  rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .door-content {
    margin-top: 10px;
  }
</style>
