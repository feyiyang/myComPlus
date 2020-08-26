import reportChart from './charts/index'
import simpleForm from './forms/index'
import simpleDialog from './dialogs/index'
import singlePicItem from './items/index'
import {topBar} from './bars/index'

import plugins from '../util/util'
import storage from '../util/storage'
import http from '../util/http'

/*
影响范围   自信度   难易度
首页浏览随机(50个后90个内)奖励商品红包
343
收藏并加购助力他人打折购得品类优惠券
454
浏览连续签到得优惠券
232
*/

const components = [reportChart, simpleForm, simpleDialog, singlePicItem, topBar]
const install = function(vue) {
  /* istanbul ignore if */
  if(install.installed) return

  /*eslint-disable*/
  components.map((component) => {
    vue.component(component.name, component)
  })
}
/* istanbul ignore if */
if(typeof window !=='undefined' && window.Vue) {
  install(window.Vue)
}
/*
积极 转移 否定 脑洞 拆解
给用户好处 给用户方便 让体验有趣
首页浏览随机(50个后90个内)奖励商品红包
让系统推动用户 让第三方推动用户 让第三方解决问题
收藏并加购助力他人打折购得品类优惠券
让用户不得不 不做这个也可以完成
浏览连续签到得优惠券
没问题的用户都做了什么/没做什么  有问题的用户都做了什么/没有做什么
没有浏览首页商品
*/
export {
  plugins,
  storage,
  http,

  reportChart,
  simpleForm,
  simpleDialog,
  singlePicItem,
  topBar
}

export default {
  install,
//   reportChart,
//   simpleForm,
//   simpleDialog,
//   singlePicItem,
//   topBar
}