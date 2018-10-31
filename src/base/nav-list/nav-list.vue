<template>
  <div class="slide" ref="wrapper">
    <div ref="slideGroup" class="slide-group">
      <slot></slot>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import BSroll from 'better-scroll'

const DIRICTION_H = 'horizontal'
const DIRICTION_V = 'vertical'

export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: null
    },
    beforeScroll: {
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 20
    },
    direction: {
      type: String,
      default: DIRICTION_V
    },
    unitWidth: {
      type: Number,
      default: 80
    }
  },
  data () {
    return {
      childrenNum: 2
    }
  },
  mounted () {
    this.timer = setTimeout(() => {
      this._setSliderWidth()
      this._initScroll()
    }, 200)
  },

  methods: {
    _setSliderWidth () {
      this.childrenNum = this.data.length
      let width = this.unitWidth * this.childrenNum

      this.$refs.slideGroup.style.width = width + 'px'
    },
    _initScroll () {
      if (!this.$refs.wrapper) {
        return
      }

      this.scroll = new BSroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click,
        scrollX: this.direction === DIRICTION_H,
        scrollY: this.direction === DIRICTION_V,
        momentum: true
      })

      if (this.beforeScroll) {
        this.scroll.on('beforeScrollStart', () => {
          this.$emit('beforeScroll')
        })
      }

      if (this.listenScroll) {
        this.scroll.on('scroll', (pos) => {
          this.$emit('scroll', pos)
        })
      }
    },
    disable () {
      this.scroll && this.scroll.disable()
    },
    enable () {
      this.scroll && this.scroll.enable()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () {
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  beforeDestroy () {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  },
  watch: {
    data () {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>
<style lang="less" scoped rel="stylesheet/less">

</style>
