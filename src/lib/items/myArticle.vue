<template>
  <div class="list_li">
    <div class="li_top">
      <div>{{title}}</div>
      <div v-if="isvip">
        得分：
        <span>{{ article.score }}</span>
      </div>
      <div>提交时间：{{ article.createTime }}</div>
    </div>
    <div class="li_cen">
      <template v-if="isvip">
        <template v-if="article.analysis.length">
          <p v-for="(paragraph, index) in article.analysis" :key="index">
            <span  v-for="(cont, idx) in paragraph" :key="idx" :class="{ unperfect: cont[2] == 0.5, unmatch: cont[2] == 0 }">{{ cont[0] }}</span>
          </p>
        </template>
        <template v-else-if="article.content">
          <p class="art_read">{{article.content}}</p>
        </template>
      </template>
      <div v-else class="getvip">
        <p class="tip">
          <van-icon name="info" size="18px" color="#C9C9C9" />&ensp;您目前是非会员，点击“查看评分”按钮成为VIP会员即有权限查看评分
        </p>
        <span class="btn_get" @click="handleBuyVip"><img class="ico_vip" :src="img_vip" alt=""> 查看评分</span>
      </div>
      <slot name="btnPlay">
      </slot>
    </div>
    <div v-if="isvip" class="li_bot">
      <slot name="bottom">
        <div v-for="(item, index) in bottom.text" :key="index">{{item}}<span :style="`background-color:${bottom.bgColor[index]}`">&emsp;&emsp;&emsp;</span></div>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'myArticle',
  props: {
    isvip: {
      type: Boolean,
      default: false
    },
    article: {
      type: Object
    },
    title: {
      type: String,
      default: '类型：跟读'
    },
    bottom: {
      type: Object,
      default: () => {
        return {
          text: ['错误', '合格', '完美'],
          bgColor: ['#f16c6c', '#ff9600', '#7c5e42']
        }
      }
    }
  },
  data() {
    return {
      img_vip: require('@/assets/images/vipIcon.png')
    }
  },
  methods: {
    handleBuyVip() {
      this.$emit('buy')
    }
  }
};
</script>
<style lang="less" scoped>
@imgPath: '~@/assets/images';
.list_li {
  border:1px solid rgba(228, 206, 165, 1);
  border-radius: 10px;
  background: #fff;
  margin: 15px 20px;
  color: #7c5e42;
  min-height: 205px;
  box-shadow:0px 1px 3px 0px rgba(106,58,32,0.3);
  .li_top {
    display: flex;
    justify-content: space-between;
    margin: 0 10px;
    align-items: center;
    border-bottom: #deb17b 1px dashed;
    padding: 0 20px;
    font-size: 15px;
    div {
      span {
        color: #ff3636;
        font-size: 18px;
        vertical-align: middle;
      }
    }
  }
  .li_cen {
    text-align: center;
    color: #7c5e42;
    background: url("@{imgPath}/recordShare/liBg.png") no-repeat center;
    background-size: 100% 100%;
    padding: 15px 0;
    position: relative;
    font-size: 20px;
    min-height: 12rem;
    .cen_tit {
      font-size: 20px;
    }
    .cen_aut {
      font-size: 15px;
    }
    .cen_poem {
      font-size: 18px;
    }
    .unperfect {
      color: #ff9600;
    }
    .unmatch {
      color: #f16c6c;
    }
    .btn_play {
      width: 42px;
      height: 42px;
      position: absolute;
      right: 10px;
      top: 4%;
      .ico {
        width: 100%;
        height: 100%;
      }
    }
    .li_cen-kt {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .li_cen-left {
        width: 30%;
        img {
          width: 160px;
          height: 121px;
        }
      }
      .li_cen-rig {
        width: 65%;
        color: #000000;
        font-size: 18px;
        .rig_tit {
          font-size: 20px;
          margin: 0 0 10px;
        }
        .rig_cen {
          text-align: left;
          text-indent: 2em;
          height: 120px;
          overflow-y: auto;
          white-space: pre-wrap;
        }
      }
    }
    .art_read{
      font-size:1.6rem;text-align: left;padding:5px 38px;
    }
    .getvip{
      font-size:16px;padding-top: 3.6rem;
      /deep/ .van-icon{vertical-align: middle;}
      .btn_get{
        font-size:20px;display:inline-block;line-height:28px;color: #DD8634;padding-top:1.8rem;
      }
      .ico_vip{width:30px;vertical-align: top;}
    }
  }
  .li_bot {
    display: flex;
    justify-content: space-around;
    margin: 0 10px;
    padding: 5px 0;
    border-top: #deb17b 1px dashed;
    font-size: 15px;
    div i {
      color: #000;
      font-style: normal;
      font-size: 18px;
    }

    span {
      width: 3rem;
      height: 1rem;
      margin: 0 5px;
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>