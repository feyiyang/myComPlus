<template>
  <div class="login">
    <slot name="top"></slot>
    <slot name="forms">
    <template v-for="(item, index) in formConfig">
      <component v-model="models[item.model]" :key="index" :class="item.class" :ref="item.ref" :is="item.ele" v-bind={...item.attrs} @input='inputCall(item.events.input, item)' @click="clickCall(item.events.click, index)">
        <div v-for="(itm, idx) in item.slots" v-html="itm.htm" :class="itm.class" :ref="itm.ref" :slot="itm.name" :key="idx" @click="slotClickCall(itm.click, itm)">
        </div>
      </component>
    </template>
    </slot>
    <slot name="default"></slot>
    <slot name="tips">
      <div class="agreements">
        <div class="agrees"></div>
        <div v-if="showTip" class="tips">{{tipTxt}}</div>
      </div>
    </slot>
    <slot name="bottom">
      <div class="bottom">
        <button class="btn_login" @click="handleSubmit">登录</button>
        <p class="tip_btm">未注册过的手机号将自动创建新账号</p>
      </div>
    </slot>
  </div>
</template>
<script>
/**
 * 默认为登录表单 ， 可通过config配置表单  引用了vant
 config 配置
 ele - 引用的vant组件,需在引用该组件的页面同时引用相关的vant组件；    model - 双向绑定formdatas的key； class - 样式类名； attrs - 动态设置 attribute  参vant中的attr设置；   events - 事件名数组 用于事件回调和emit；   slots - vant中的slot数组, --htm: slot的html内容 
 */
import Vue from 'vue'
var timer = null
export default {
  name: 'simpleForm',
  model: {
    prop: 'formdatas'   //双向绑定formdata
  },
  props: {
    wxLogin: {
      type: Boolean,
      default: false
    },
    loginTo: {
      type: Object,
      default: () => {
        return {
          valideCodePath: '',   //验证码发送接口地址
          loginPath: ''   //登录接口地址
        }
      }
    },
    showTip: {
      type: Boolean,
      default: false
    },
    tipTxt: {
      type: String,
      default: '手机号或验证码不正确'
    },
    formConfig: {   
      type: Array,
      default: () => {
        return [
          {ele: 'van-field', model:'tel', class: 'common_inpt tel', attrs: {type:'tel', maxlength: 11, placeholder:'请输入你的手机号'}, events: {input: 'tel-change'} },
          {ele: 'van-field', model:'valideCode', class: 'common_inpt code', attrs: {type:'digit', maxlength: 6, placeholder:'请输入验证码'}, events: {input: 'code-change'}, slots:[{name: 'button', class:'valid_button', htm: '', click: 'get-code-click'}] }
        ]
      }
    },
    formdatas: {
      type: Object
    }
  },
  data() {
    return {
      mattr: [],
      models: this.formdatas,
      isCount: false
    }
  },
  mounted() {
    this.formConfig.forEach(v=> {
      this.mattr.push({...v.attrs})
      this.models[v.model] = ''
    })
    if(this.formConfig[1].model == 'valideCode'){
      this.formConfig[1].slots[0].htm = `<span class="btn_getcode">获取验证码</span>`
    }
  },
  watch: {
    formdatas:  function(val) {
      // console.log(val)
      this.models = val   //this.models 绑定了 this.formdatas
    }
  },
  methods: {
    inputCall(event, item) {  //输入框输入时的回调
      event && this.$emit(event, this.models[item.model])
    },
    clickCall(event, idx) {   //表单项被点击时回调
      event && this.$emit(event, idx)
    },
    slotClickCall(fn, itm){
      let event = {
        data: itm,
        isCount: this.isCount
      }
      
      fn && this.$emit(fn, event)
    },
    codeCountDown(clearFn) {
      clearInterval(timer)
      if(clearFn){
        clearFn()
        return
      }
      if(this.isCount) return
      var num = 60
      this.isCount = true
      this.formConfig[1].slots[0].htm = `<span class="btn_getcode getting">等待60S</span>`
      timer = setInterval(() => {
        num --
        this.formConfig[1].slots[0].htm = `<span class="btn_getcode getting">等待${num}S</span>`
        if(num<1){
          this.countOverFn()
          clearInterval(timer)
        }
      }, 1000)
    },
    countOverFn() {
      this.formConfig[1].slots[0].htm = `<span class="btn_getcode">获取验证码</span>`
      this.isCount = false
      clearInterval(timer)
    },
    handleSubmit() {
      this.$emit('submit')
    },
  }
}
</script>
<style lang="less" scoped>
.common_inpt{
  padding:0;border: 1px #c7c7c9 solid;border-radius: 4px;margin-bottom: 15px;line-height: 36px;color:#333;
  /deep/ input.van-field__control{text-indent: 10px;}
  /deep/ .btn_getcode{color:#C8C8C8;display: inline-block;padding:0 10px;border-left: 1px #C8C8C8 solid;height: 26px;line-height: 26px;
    &.getting{color: #FF900E;}
  }
}
.agreements{
  display: flex;justify-content: space-between;margin-top: -15px;height:25px;
  .tips{color: #F23737; transition: .5s color;}
}
.btn_login{
  font-size:16px;background-color: #FFBF74;color:#fff;border:none;width:100%;height:36px;border-radius: 4px;
  &:active{
    background-color: #FF900E;
  }
}
.tip_btm{
  color:#999;font-size:14px;line-height: 30px;
}
</style>