<template>
  <div class="statistics_item">
    <div class="info_time">
      <!-- 学习时间: {{idatas.studyDate}} -->
      {{config.top.Label}}{{idatas[config.top.Val]}}
    </div>
    <div class="pannel">
      <span class="ipic" :style="`background-image:url(${idatas.iconPath || idatas.imagePath})`">
        <img v-if="circleImg" :src="circleImg" alt="">
      </span>
      <span class="title">
        <strong class="main">{{idatas.title}}</strong>
        <span class="sub">{{idatas.subTitle}}</span>
      </span>
      <span v-for="(item, index) in config.scores" :key="index" class="info_score">
        <span class="main">{{idatas[item.score]}}</span>
        <span class="sub">{{item.desc}}</span>
      </span>
      <router-link class="btn_det" :to="to">
        去查看&nbsp;<van-icon name="arrow" />
      </router-link>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { Icon } from 'vant'
Vue.use(Icon)
export default {
  name: 'SinglePicItem',
  props: {
    config: Object,
    idatas: {
      type: Object,
      default: () => {
        return {
          studyDate: '2020.02.15',
          iconPath: '',
          title: '小儿垂钓',
          subTitle: '【唐】胡令能',
          score: '96分',
          studyRecordId: '023120200215'
        }
      }
    },
    to: String,
    circleImg: String
  },
  mounted() {
    // console.log(this.idatas)
  },
  data(){
    return{}
  }
}
</script>
<style lang="less" scoped>
.statistics_item{
  border:1px #F1C98C solid;border-radius: 6px;margin-top: 10px;padding:0 10px;box-shadow: 1px 1px 2px rgba(106, 58, 32, .3);color:#7C5E42;
  .info_time{
    border-bottom: 1px #D8C6AA solid;line-height: 22px;
  }
  .pannel{
    padding:8px 0 5px;overflow: hidden;display: flex;align-items:center;
    .ipic{
      @wid:6rem;
      width:@wid;height:@wid*3/4;overflow: hidden;background-size: contain;flex-shrink:0;background-repeat:no-repeat;background-position:center;
      img{width:100%;height:100%;}
    }
    .main{font-size:1.6rem;font-weight:normal;display: block;overflow: hidden;text-overflow: ellipsis;color:#7C5E42;}
    .sub{font-size:1.2rem;color:#B58150;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
    .title{
      width:30%;padding:0 .6rem 0 1rem;flex-grow:1;white-space: nowrap;display:inline-flex;
      .sub{margin-left: -5px;}
    }
    .info_score{
      width:7.6rem;
      .main{color:#DE574D;text-indent: 5px;}
    }
    .btn_det{
      color:#B09C82;white-space: nowrap;
    }
  }
}
</style>