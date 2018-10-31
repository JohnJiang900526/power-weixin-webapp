<template>
  <div class="search-box">
    <div class="search-box-inner">
      <span class="search-icon">
        <span class="fa fa-search"></span>
      </span>
      <input
        ref="query"
        class="search-input"
        type="text"
        v-model="query"
        :placeholder="placeholder"
        @focus="focusSearch"
        @blur="blurSearch"
      >
      <span class="clear-icon-wrap">
        <span class="clear-icon" v-show="query" @click="clearQuery">
          <x-icon type="ios-close-empty" size="25"></x-icon>
        </span>
      </span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    value: null,
    target: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      query: ''
    }
  },
  methods: {
    focusSearch () {
      this.$emit('focus')
    },
    blurSearch () {
      this.$emit('blur')
    },
    clearQuery () {
      this.query = ''
    },
    setQuery (query) {
      this.query = query
    },
    blur () {
      this.$refs.query.blur()
    }
  },
  watch: {
    query (newQuery) {
      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.timer = setTimeout(() => {
        if (this.target !== '') {
          this.$emit('change', newQuery, this.target)
        } else {
          this.$emit('change', newQuery)
        }
      }, 400)
    }
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  @import "~common/styles/mixin.less";

  .search-box {
    border: 1px solid #dddddd;
    border-radius: 5px;
    .search-box-inner {
      display: flex;
      line-height: 28px;
      padding: 0 0 0 10px;
      color: rgba(0, 0, 0, 0.6);
      .search-icon {
        flex: 0 0 20px;
        width: 20px;
      }
      .search-input {
        display: block;
        flex: 1;
        font-size: 14px;
        padding-left: 3px;
      }
      .clear-icon-wrap {
        display: block;
        flex: 0 0 30px;
        width: 30px;
        .clear-icon {
          display: block;
          position: relative;
          width: 100%;
          height: 100%;
          .vux-x-icon {
            .positionCenter();
          }
        }
      }
    }
  }
</style>
