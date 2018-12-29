
import Vue from 'vue'
import App from './App';
import Router from "vue-router";
import axios from "axios";
import qs from "qs";
import { MessageBox, Toast } from 'mint-ui';
import { getUrlArgs } from "../../../common/utils";
Vue.use(Router);
// 动态设置publicPath,模板中 window.resourceBaseUrl为最终结果
__webpack_public_path__ = window.resourceBaseUrl;

const debug = process.env.NODE_ENV == 'development';
// 全局toast提示
const toast = function (txt) {
    Toast({
        message: txt,
        position: 'bottom',
        duration: 2000
    });
}
//路由配置
const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            meta: {
                title: "我的邀请"
            },
            component: resolve => require(['./index.vue'], resolve)
        },
        {
            path: '/couponsInfo',
            meta: {
                title: "抵用券使用规则"
            },
            component: resolve => require(['./couponsInfo.vue'], resolve)
        },
        {
            path: '/guid',
            meta: {
                title: "注册指南"
            },
            component: resolve => require(['./guid.vue'], resolve)
        },
        {
            path: '/listrecord',
            meta: {
                title: "邀请记录"
            },
            component: resolve => require(['./listrecord.vue'], resolve)
        },
        {
            path: '/lottery',
            meta: {
                title: "我的抵用券"
            },
            component: resolve => require(['./lottery.vue'], resolve)
        },
        {
            path: '/rulesInfo',
            meta: {
                title: "邀请规则"
            },
            component: resolve => require(['./rulesInfo.vue'], resolve)
        },
        {
            path: '/teamInfo',
            meta: {
                title: "有效团队"
            },
            component: resolve => require(['./teamInfo.vue'], resolve)
        }
    ]
})

//路由钩子
router.beforeEach((to, from, next) => {
    next();
})
router.afterEach((to, from) => {
    let _title = to.meta.title
    if (_title) {
        document.title = _title
    }
})

//全局axios设置
axios.interceptors.request.use(
    config => {
        //参数
        let u_id = '', password = '';
        const _params1 = {
            u_id: u_id,
            uid: u_id,
            password: password,
            ver: "100.0.0"
        }
        const _params2 = {
            u_id: "209",
            uid: 209,
            password: "319d18b0c08ed8e87ff968bebd994b92",
            ver: "100.0.0"
        };
        if (typeof(CustomJS) != "undefined" && CustomJS.getUser) {
            try {
                let userinfo = JSON.parse(CustomJS.getUser() || "{}");
                _params1.u_id = userinfo.u_id || "";
                _params1.uid = userinfo.u_id || "";
                _params1.password = userinfo.u_password;
            } catch (err) {
                console.log(err)
            }
        }
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        const _params = debug ? _params2 : _params1;
        if (config.method === 'post') {
            let data = qs.parse(config.data);
            const __final = {
                ..._params,
                ...data
            };
            config.data = qs.stringify({
                ...encodeParams(config.url, __final),
            })
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });
axios.interceptors.response.use(function (response) {
    return response
}, function (error) {
    toast('抱歉，网络连接异常，请稍候重试~');
    return Promise.reject(error)
});

//挂载方法
Vue.prototype.$axios = axios;
Vue.prototype.$toast = toast;
Vue.prototype.$messageBox = MessageBox;
Vue.config.productionTip = false
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
