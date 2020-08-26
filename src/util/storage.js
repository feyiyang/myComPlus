/* eslint-disable */
function setStorage({key, mode='local', data}){
  var obj = {}
  // console.log(data)
  if(typeof data == 'string'){
    obj = {
      type: 'string',
      data: data
    }
  }else {
    obj = {
      type: 'obj',
      data: data
    }
  }
  return setAct()
  function setAct() {
    try{
      if(mode=='session'){
        sessionStorage.setItem(key, JSON.stringify(obj))
      }else{
        localStorage.setItem(key, JSON.stringify(obj))
      }
      
      return Promise.resolve(obj)
    }catch(err){
      console.log(err)
      return Promise.reject(err)
    }
  }
}
function getStorage(key, mode='local'){
  let data = mode=='session'?sessionStorage.getItem(key) : localStorage.getItem(key)
  
  try {
    data = JSON.parse( data )
    if(data.type){
      return data.data
    }else{
      return data
    }
  } catch(err) {
    return data
  }
}
function removeStorage(key, mode='local'){
 mode=='session'?sessionStorage.removeItem(key) : localStorage.removeItem(key)
}

export default {
  set: function(opt) {
    return setStorage(opt)
  }, 
  get: function(k, m) {
    return getStorage(k, m)
  }, 
  remove: function(k, m) {
    return removeStorage(k, m)
  }
}