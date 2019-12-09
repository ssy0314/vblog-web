import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);

import {getRequest,postRequest,postKeyValueRequest,putRequest,delRequest,delManyRequest} from "./utils/api";
Vue.prototype.getRequest=getRequest
Vue.prototype.postRequest=postRequest
Vue.prototype.postKeyValueRequest=postKeyValueRequest
Vue.prototype.putRequest=putRequest
Vue.prototype.delRequest=delRequest
Vue.prototype.delManyRequest=delManyRequest


import {Message} from "element-ui";
import {allUrl,operatUrl} from "./utils/menus";

router.beforeEach((to, from, next) => {
  if(to.path=='/'){
    next();
  }else{
    if(window.sessionStorage.getItem('user')){
      if(operatUrl(to, router)){
        next();
      }else{
        if(allUrl(to, router)){
          Message.error({message: '您无权访问该页面'});
          next('/Home');
        }else{
          Message.error({message: '页面不存在'});
          next('/Home');
        }
      }
      // next();
    }else{
      Message.warning({message:'用户未登录，请先登录'})
      next('/');
    }
  }
})

import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
