import Vue from 'vue'
import Md5 from "md5";
import App from './App'
import Router from 'vue-router'
import axios from 'axios'
import {getUrlArgs} from "../../../common/utils";
import qs from 'qs'
import { MessageBox, Toast } from 'mint-ui'
Vue.use(Router)
__webpack_public_path__ = window.resourceBaseUrl;
const debug = process.env.NODE_ENV == 'development'
// 全局toast提示
const toast = function (txt) {
  Toast({
    message: txt,
    position: 'bottom',
    duration: 2000
  })
}
// 路由配置
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      meta: {
        title: '消息记录'
      },
      component: resolve => require(['./index.vue'], resolve)
    }
  ]
})
// 路由钩子
router.beforeEach((to, from, next) => {
  next()
})
router.afterEach((to, from) => {
  let _title = to.meta.title
  if (_title) {
    document.title = _title
  }
})
window.sessionId = getUrlArgs().sessionId||""
window.type = getUrlArgs().type||""
let objData = {uid: getUrlArgs().u_id||"", password: getUrlArgs().password||""};
if (typeof(CustomJS) != "undefined" && CustomJS.getUser) {
  try {
    let userinfo = JSON.parse(CustomJS.getUser() || "{}")
    window.idname = userinfo.u_id || ""
  } catch (err) {
    console.log(err)
  }
}
// 全局axios设置
axios.interceptors.request.use(
  config => {
    //参数
    let u_id = '', password = '';
    const _params1 = {
      u_id: objData.uid,
      password: objData.password,
      ver: '100.0.0'
    }
    const _params2 = {
      u_id: '100903',
      password: '43f08c563489a565c341b66ec1c95770',
      ver: '1.0'
    }
    if (typeof(CustomJS) != "undefined" && CustomJS.getUser) {
      try {
        let userinfo = JSON.parse(CustomJS.getUser() || "{}")
        _params1.u_id = userinfo.u_id || ""
        _params1.password = userinfo.u_password
      } catch (err) {
        console.log(err)
      }
    }
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    const _params = debug ? _params2 : _params1
    // const _params = _params1.u_id
    sessionStorage.setItem('userId', _params.u_id);
    if (config.method === 'post') {
      let data = qs.parse(config.data);
      const __final = {
        ..._params,
        ...data
      }
      config.data = qs.stringify({
        ...encodeParams(config.url, __final)
      })
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
);
axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  toast('抱歉，网络链接异常，请稍后重试');
  return Promise.reject(error)
});

// 挂载方法
Vue.prototype.$axios = axios
Vue.prototype.$toast = toast
Vue.prototype.$messageBox = MessageBox
Vue.config.productionTip = false
Vue.prototype.$isZhongchuang = (navigator.userAgent.toLowerCase().match("zhongchuang")) ? true : false;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


