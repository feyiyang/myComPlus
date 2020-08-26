<template>
  <div v-if="propShow" class="dialog">
    <div class="inner">
      <van-icon class="close_x" name="cross" color="#FFAA24" size="18" @click="hideMe" />
      <slot name="top">
        <div :class="`top ${tClass?tClass:''}`">
          <span class="title">{{title}}</span>
        </div>
      </slot>
      <slot>
        <div class="content"></div>
      </slot>
    </div>
    <div class="mask" @click="hideMe"></div>
  </div>
</template>
<script>
export default {
  name: 'simpleDialog',
  model: {
    prop: 'propShow',
    event: 'hide'
  },
  props: {
    title: String,
    tClass: {
      type: String,
      default: ''
    },
    propShow: {
      type: Boolean,
      default: false
    },
    closeX: {
      type: Boolean,
      default: true
    },
    unScroll: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  mounted() {
    this.$watch('propShow', function(val) {
      if(this.unScroll && this.propShow) document.body.style.overflowY = 'hidden'
    })
  },
  methods: {
    hideMe() {
      this.$emit('hide', false)
      if(this.unScroll) document.body.style.overflowY = 'auto'
    }
  }  
}
</script>
<style lang="less" scoped>
@import '../common.less';
.dialog{
  position: fixed;left:0;top:0;z-index:111;width:100%;height: 100%;
  .inner{
    min-width:100Px;position: absolute;left:50%;top:50%;z-index:2; transform:translateX(-50%) translateY(-50%); background-color: #fff;border-radius:6Px;
    .top{
      background-color: #FFEFD8;padding:5Px 0;text-align: center;border-radius: 6Px 6Px 0 0;
      .title{
        height:26Px;background: url(@dialogTit_img) no-repeat center;background-size: auto 100%;line-height: 26Px;display: inline-block;padding:0 18Px;min-width: 110Px;
      }
    }
    .close_x{
      position: absolute;right:5Px;top: 0;
    }
  }

  .mask{
    position: absolute;left: 0;top:0;z-index:1;width: 100%;height: 100%;background-color: rgba(0, 0, 0, .6);
  }
}
</style>