<template>
  <div class="common_top_bar">
    <span class="bar_left" @click="onClickLeft">
      <slot name="left">
        <span class="btn_back"><van-icon name="arrow-left" /></span>{{leftTxt}}
      </slot>
    </span>
    <slot>
      <div class="bar_title">{{title}}</div>
    </slot>
    <slot name="right" />
    <div v-if="border" class="line"></div>
  </div>
</template>
<script>
import Vue from 'vue'
import {Icon} from 'vant'

Vue.use(Icon)
export default {
  name: 'topBar',
  props: ['leftTxt', 'title', 'border'],
  mounted() {
    console.log(this.border)
  },
  methods: {
    onClickLeft(){
      if(this.$listeners['click-left']) {
        this.$emit('click-left')
      }else{
        this.$router.go(-1)
      }
    }
  },
}
</script>
<style lang="less" scoped>
@imgpath: '../images';
@barWid: 240px;
.common_top_bar{
  height:40px;color:#7C5E42;font-size:2rem;line-height: 40px;position: relative;
  .bar_right{
    position: absolute;right:20px;top:0;
    .link_det{color:#7C5E42;text-decoration: underline;}
  }
  .bar_title{
    text-align: center;
  }
  .bar_left{
    position: absolute;left:0;top:0;
    .btn_back{
      position: absolute;left:0;top:0;width:80px;height: 40px;
      background-size: contain;
    }
  }
  .line{
    position: absolute;left:0;bottom:0;width:100%;height: 1px;border-bottom:1px #e0e0e0 solid;
  }
}
</style>