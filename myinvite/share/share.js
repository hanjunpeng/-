
import Vue from 'vue'
import App from './share.vue'
import axios from "axios";
import qs from "qs";
import { Toast } from 'mint-ui';
// 全局toast提示
const toast = function (txt) {
    Toast({
        message: txt,
        position: 'bottom',
        duration: 2000
    });
}
// 动态设置publicPath,模板中 window.resourceBaseUrl为最终结果
__webpack_public_path__ = window.resourceBaseUrl;

//全局axios设置
axios.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        if (config.method === 'post') {
            let data = qs.parse(config.data);
            const __final = {
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
    alert('抱歉，网络连接异常，请稍候重试~');
    return Promise.reject(error)
});

//挂载vue
Vue.prototype.$axios = axios;
Vue.prototype.$toast = toast;
Vue.config.productionTip = false

new Vue({
    render: h => h(App)
}).$mount('#app')
