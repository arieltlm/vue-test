import Vue from 'vue'

import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from '@/store/index_named.js'


import './assets/main.css'
Vue.use(ElementUI);



const vm = new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')


console.log(vm)