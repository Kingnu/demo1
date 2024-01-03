import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import VueRouter from 'vue-router';
import router from './router';
import axios from "axios";
import './assets/css/global.css';

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.config.productionTip = false
axios.defaults.baseURL = "http://8.130.116.125:8889/api/private/v1";
//axios添加请求头Authorization,值为token
axios.interceptors.request.use(config=>{
  config.headers.Authorization = window.sessionStorage.getItem("token");
  return config;
})
Vue.prototype.$axios = axios;

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
