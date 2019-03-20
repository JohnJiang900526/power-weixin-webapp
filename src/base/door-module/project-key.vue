<template>
  <div class="project-key">
    <h3 class="title font-color-lightGreen">
      <span class="fa fa-bar-chart-o icon"></span>
      重点在执行项目
    </h3>
    <ul class="lists">
      <li class="list-unit"
          @click="openProject(item)"
          v-for="item in MajorProjects" :key="item.project_guid"
        >
        <div class="list-unit-inner">
          <div class="list-unit-item name">{{ item.project_name }}</div>
        </div>
      </li>

      <li v-if="MajorProjects.length === 0" class="list-unit">
        <div class="list-unit-inner">
          <div class="list-unit-item name">暂无数据</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  props: {
    MajorProjects: {
      type: Array,
      default () {
        return []
      }
    },
    projectPortalRight: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    EpsProjId () {
      return this.projectInfo.project_guid
    },
    ...mapGetters([
      'projectInfo'
    ])
  },
  methods: {
    openProject (item) {
      if (this.projectPortalRight) {
        let id = item.project_guid || this.EpsProjId
        this.$router.push({
          path: '/business/projectunit',
          query: {
            ProjectId: id
          }
        })
      }
    }
  }
}
</script>
<style lang="less" scoped  rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .project-key {
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
            line-height: 1.5;
            min-width: 0px;
            &.name {
              flex: 3;
            }
          }
        }
      }
    }
  }
</style>
