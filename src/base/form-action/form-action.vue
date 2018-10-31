<template>
  <div class="form-action">
    <div class="actions">
      <div class="action-item"
        v-for="item in lists"
        :key="item.label"
        @click="select(item)"
        >
        <span>{{ item.label }}</span>
      </div>
      <div class="action-item more-action"
          v-if="actions.length > 2"
          @click="toggle"
        >
        <span>更多</span>
      </div>
    </div>
    <div class="pupo-block" v-if="pupoList.length > 0"
      :style="{'transform': 'translate3d(' + this.offset + 'px, 0, 0)'}"
      >
      <div class="action-item"
          v-for="item in pupoList"
          :key="item.label"
          @click="select(item)"
        >
        <span>{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    actions: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      offset: 105,
      lists: [],
      pupoList: []
    }
  },
  mounted () {
    this.SplitAction()
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  },
  methods: {
    // 点击选中
    select (item) {
      this.offset = 105
      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.timer = setTimeout(() => {
        this.$emit('selectActionMenu', item)
      }, 400)
    },
    // 分类 哪里在底部显示，哪里在pupo中显示
    SplitAction () {
      let lists = []
      let pupoList = []

      if (this.actions.length > 2) {
        this.actions.forEach((item, index) => {
          if (index < 2) {
            lists.push(item)
          } else {
            pupoList.push(item)
          }
        })
      } else {
        lists = [...this.actions]
      }

      this.lists = [...lists]
      this.pupoList = [...pupoList]
    },
    // 控制显示和隐藏
    toggle () {
      this.offset = this.offset === 105 ? 0 : 105
    }
  },
  watch: {
    actions (newActions) {
      this.SplitAction()
    }
  }
}
</script>
<style lang="less"  rel="stylesheet/less">
  .form-action {
    line-height: 50px;
    height: 50px;
    color: #295AA6;
    .actions {
      display: flex;
      .action-item {
        flex: 1;
        border-right: 1px solid #dddddd;
        font-size: 14px;
        text-align: center;
        &:last-child {
          border-right: 0px solid transparent;
        }
      }
    }
    .pupo-block {
      position: absolute;
      right: 5px;
      bottom: 53px;
      width: 100px;
      max-height: 200px;
      overflow-y: auto;
      background-color: #f4f4f4;
      box-shadow: 5px 5px 3px #dddddd;
      border: 1px solid #dddddd;
      border-radius: 5px;
      transition: all 0.3s;
      .action-item {
        font-size: 14px;
        padding: 0px 10px;
        line-height: 40px;
        text-align: center;
        border-bottom: 1px solid #dddddd;
        &:last-child {
          border-bottom: 1px solid transparent;
        }
      }
    }
  }
</style>
