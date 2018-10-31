<template>
  <div class="door-content">
    <project-key label="重点执行项目"></project-key>

    <project-kpi label="关键—KPI"></project-kpi>

    <statistical label="项目开发统计"></statistical>

    <project-integrate label="项目综合情况"></project-integrate>
  </div>
</template>
<script type="text/ecmascript-6">
import statistical from 'base/door-module/project-statistical.vue'
import projectKey from 'base/door-module/project-key.vue'
import projectKpi from 'base/door-module/project-kpi.vue'
import projectIntegrate from 'base/door-module/project-integrate.vue'

export default {
  data () {
    return {
    }
  },
  components: {
    statistical,
    projectKey,
    projectKpi,
    projectIntegrate
  }
}
</script>
<style lang="less" scoped  rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .door-content {
    margin-top: 10px;
  }
</style>
