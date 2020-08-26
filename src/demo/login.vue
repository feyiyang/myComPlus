<template>
  <div class="login">
    <simple-form v-model="formdata" :show-tip="showtip" @tel-change="telChange" @get-code-click="getCodeFn">
      
    </simple-form>
  </div>
</template>
<script>
import Vue from 'vue'
import simpleForm from 'swd-report'

Vue.use(simpleForm)
export default {
  data() {
    return {
      formdata: {},
      showtip: false
    }
  },
  methods: {
    telChange(val) {
      console.log(val)
    },
    getCodeFn() {
      let params = {phone: this.formdata.tel}
      this.$store.dispatch('getSmsCode', {params, tip: '请输入验证码' }).then(res => {

      }).catch(err => {
        console.log(err)
        this.showtip = true
      })
    },
    handleSubmit() {
      console.log(this.formdata)
    }
  }
}
</script>
<style lang="less" scoped>
  
</style>