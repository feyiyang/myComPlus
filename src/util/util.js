var uriQuerys = (function() {
	var href = location.href
	var queryStr = href.indexOf('?')?href.substring(href.indexOf('?')+1):''

	var queryArr = queryStr.split('&')
	var querySubArr = []
	var queryObj = {}

	if(queryArr.length){
		for(var i=0;i<queryArr.length; i++){
			querySubArr = queryArr[i].split('=')
			queryObj[ querySubArr[0] ] = querySubArr[1]
		}
	}

	return queryObj
})()


var createThrottle = (fn, delay = 600) => {		//节流
  let status = 'START'
  return () => {
    if(status == 'WAITING'){
      return
    }
    status = 'WAITING'
    setTimeout(() => {
      fn&&fn()
      status = 'START'
    },delay)
  }
}

var createDebounce = (fn, delay = 600) => {		//防抖
  let timer = null
  return args => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn&&fn(args)
    }, delay)
  }
}

var validatas = {		//验证
	realName: function(val) {
		if(/^[a-zA-Z0-9\u4e00-\u9fa5]+$/.test(val)){
			return true
		}
		return false
  },
  phone: function(phone) {
    if (!/^1[3456789]\d{9}$/.test(phone)) {
      return false
    } else {
      return true
    }
	},
	email: function(val) {
		return /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(val)
	}
}

var transeIns = function (opt={str:'', blur: true, key: ''}) {  //混淆
	let key = opt.key || 'q2mp5zal3wnci7djn0vtug6h1jypzm7qox23wni2crbu8by3alr0ks'
	let blur = opt.blur!=null?opt.blur:true
	let str = opt.str
	//定义混淆字符
	var ins = '' 
	var deins =''
	if(blur){
		for (var i = 0; i <str.length; i ++) {  //遍历字符串
				ins += str[i]+key[i];  //根据余数值映射到密钥中对应下标位置的字符
		}
		ins = 'o3hf5'+ins
		return ins;  //返回这些映射的字符
	}else{
		str = str.substring(5, str.length)
		for(var i = 0; i< str.length;i++){
			if(i%2==0){
				deins += str.charAt(i)
			}
		}
		return deins
	}
}

var copyHandler = function(obj) {		//复制元素内容
  try{
		if(document.createRange){
			const range = document.createRange()
			range.selectNode(obj)
			const selection = window.getSelection()
			if(selection.rangeCount > 0) selection.removeAllRanges()
			selection.addRange(range)
			document.execCommand('copy')
		}else if(obj.select){
			obj.select() // 选择对象;
    	document.execCommand("Copy") // 执行浏览器复制命令
		}
		return Promise.resolve({success: true})
  }catch(err){
		return Promise.reject({success: false, error: err})
	}
}


export const reachBottomNotify = {		//触底de注册
  install:(Vue, options) => {
    Vue.mixin({
      data() {
        const data = {
          scrollQueue: []
        }
        return this.onReachBottom?data: {}
      },
      created() {
        if(typeof this.onReachBottom == 'function'){
          this.scrollQueue.push(() => {
            this.onReachBottom()
          })
        }
      },
      methods: {
        _listenScroll() {
          const THRESHOLD = 50
          const throttle = createThrottle(() => {
            this.scrollQueue.forEach(func => func())
          })

          window.addEventListener('scroll', () => {
            const offsetHeight = document.documentElement.offsetHeight
            const screenHeight = window.screen.height
            const scrollY = window.scrollY
            const gap = offsetHeight - screenHeight - scrollY
            if(gap< THRESHOLD){
              throttle()
            }
          })
        }
      }
    })
  }
}

export default {
  uriQuerys,
	validatas,
	createThrottle,
	createDebounce,
	transeIns,
	copyHandler
}