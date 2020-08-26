<template>
  <div class="geer_wrap">
    <span v-for="(item, index) in geers" :key="index" class="gitem" @click="changeDate(index, item)">
      <span class="txt">{{item.text}}</span>
      <span :class="`bar ${tab_active == index?'active': ''}`"></span>
    </span>
  </div>
</template>
<script>
export default {
  props: {
    geers:{
      type: Array
    },
    active: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      tab_active: 0
    }
  },
  watch: {
    geers: function(newVal, oldVal){
      // console.log(newVal == oldVal)
      this.tab_active = newVal.length-1
    },
    active: function(val){
      // console.log(val)
      this.tab_active = val
    }
  },
  mounted() {
    this.tab_active = this.active>0? this.active: this.geers.length-1
    // console.log(this.geers, this.tab_active)
  },
  methods: {
    changeDate(index, data) {
      if(this.tab_active == index)return
      this.tab_active = index
      this.$emit('change', {index, range: data.range})
    }
  },
}
</script>
<style lang="less" scoped>
.geer_wrap{
  min-height:30px;border-bottom:2px #C4D2D3 solid;display: flex;
}
.gitem{
  display:flex;flex-flow: column;align-items: center;
  padding:0 10px;
  .txt{
    color:#7C5E42;padding:10px 0 5px;font-size:12px;
  }
  .bar{
    display: inline-block;width:18px;height:30px;background-color: #D5D5D5;border-radius: 4px 4px 0 0;
  }
  .active{
    background-color: #69CB3D;
  }
}
</style>