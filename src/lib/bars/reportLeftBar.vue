<template>
  <div class="leftbar">
    <div class="title">{{title}}</div>
    <div class="info_wrap">
      <div class="infos" ref="infos">
        <div class="info_inner" ref="infoinner">
          <span v-for="(item, index) in scores" :key="index" class="iitem">
            <span :class="`asval ${item.color}`">{{item.ival}}</span>
            <span class="askey">{{item.ikey}}</span>
          </span>
        </div>
      </div>
      <span class="ar_more" v-if="havemore" @click="handleShowMore"></span>
    </div>
  </div>
</template>
<script>
import BScroll from '@better-scroll/core'
export default {
  props: {
    title: {
      type: String
    },
    scores: {
      type: Array
    }
  },
  data() {
    return {
      havemore: false
    }
  },
  mounted() {
    // console.log(this.scores)
    this.init()
  },
  methods: {
    init() {
      // this.bs = new BScroll(this.$refs.infos, {
      //   freeScroll: true
      // })
      // if(this.$refs.infos.clientHeight < this.$refs.infoinner.clientHeight){
      //   this.havemore = true
      // }
    },
    handleShowMore() {
      console.log('click')
      this.bs.scrollBy(0, -50, 300)
    }
  },
}
</script>
<style lang="less" scoped>
@imgpath: '../../../assets/images';
.leftbar{
  background: url('@{imgpath}/reports/bg_lbar.png') no-repeat;background-size: 100% 100%;min-height:120px;
  .title{text-align: center;color:#776049;height:2.8rem;line-height: 2.8rem;background: url('@{imgpath}/reports/bg_lbar.png') no-repeat;background-size: cover;}
  .info_wrap{
    height:e('calc(100% - 2.6rem)');margin:0 20px;overflow: hidden;position: relative;
    .infos{height:e('calc(100% - 10px)');overflow: auto;}
    .info_inner{padding-bottom: 15px;}
    .ar_more{
      position: absolute;left:50%;bottom:10px;margin-left: -13px;
      width:26px;height:26px;background: url('@{imgpath}/reports/arrow_scroll.png') no-repeat center;background-size: contain;
    }
  }
  .iitem{
    width:50%;display: inline-block;padding-top:15px;white-space: nowrap;
    // &:nth-of-type(2n+1){text-indent: 8px;}
    span{display: block;color:#7c624a;font-size:1.8rem;text-align: center;}
    .askey{font-size: 1.2rem;color:#b99168;padding-top: 3px;}
    
    .ft_red{color:#dd342d;}
    .ft_blue{color:#3da6dd;}
  }
}
</style>