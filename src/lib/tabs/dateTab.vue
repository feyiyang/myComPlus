<template>
  <div class="tab_wrap">
    <div class="tab_menu">
      <span v-for="(item, index) in menus" :key="index" :class="`menu ${tab_active == index?'menu_active':''}`" @click="handleMenu(index)">{{item}}</span>
    </div>
    <div class="tab_content">
      <div class="content_wrap">
        <div class="content">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    menus: {
      type: Array
    },
    active: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      tab_active: this.active
    }
  },
  methods: {
    handleMenu(idx) {
      if(this.tab_active != idx){
        // console.log(this.tab_active, idx)
        this.tab_active = idx
        this.$emit('menu-click', idx)
      }
    }
  },
}
</script>
<style lang="less" scoped>
@imgpath: '../../../../assets/images/reports';
.tab_wrap{height:100%;}
.tab_menu{
  position: relative;z-index:3;padding-left:15px;white-space: nowrap;
  .menu{
    display: inline-block;width:112px;height:36px;line-height:52px;color:#CE922A;background: url('@{imgpath}/tab_def.png') no-repeat center top;background-size: cover;padding: 0 10px;text-align: center;margin-right: 10px;
  }
  .menu_active{
    color:#EE8702;background: url('@{imgpath}/tab_act.png') no-repeat center top;background-size: cover;height:43px;
  }
}
.tab_content{
  position: relative;z-index:2;top:-9px;height:e('calc(100% - 50px)');padding:10px 0;overflow: hidden;background: url('@{imgpath}/bg_rbar.png') repeat-y;background-size: 100% 100%;
  .content_t{
    background: url('@{imgpath}/bg_rbar.png');background-size: cover;width: 100%;height:15px;
  }
  .content_wrap{
    height: 100%;overflow: auto;
  }
  .content{
    padding:0 1.2rem 1rem;
  }
}
</style>