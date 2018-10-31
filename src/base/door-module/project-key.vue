<template>
  <div class="project-key">
    <h3 class="title font-color-lightGreen">
      <span class="fa fa-bar-chart-o icon"></span>
      重点在执行项目
    </h3>
    <ul class="lists">
      <li class="list-unit"
          @click="openProject(item)"
          v-for="item in projectKeys" :key="item.id"
        >
        <div class="list-unit-inner">
          <div class="list-unit-item name">{{ item.name }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  data () {
    return {
      projectKeys: [
        {
          id: '0',
          name: '巴基斯坦500KV输电线路项目1'
        },
        {
          id: '1',
          name: '柬埔寨国家电网230KV西南环网输工程电项目'
        },
        {
          id: '2',
          name: '老挝230KV那帮输变电项目'
        },
        {
          id: '3',
          name: '巴基斯坦500KV输电线路项目1'
        },
        {
          id: '4',
          name: '巴基斯坦500KV输电线路项目2'
        },
        {
          id: '5',
          name: '巴基斯坦500KV输电线路项目3'
        }
      ]
    }
  },
  methods: {
    openProject (item) {
      this.$router.push('/business/projectunit')
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
