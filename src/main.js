import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// import { Button, Select } from 'element-ui';
// Vue.component(Button.name, Button);
// Vue.component(Select.name, Select);
// import 'element-ui/lib/theme-chalk/index.css';

import common from "./common/common.js";


Vue.config.productionTip = false
Vue.prototype.$http = axios
// Vue.use(VueAxios,axios);

new Vue({
  router,
  render: h => h(App),
  created() {
    router.beforeEach((to, from, next) => {
      console.log(to)
      console.log(from)
      // console.log(next)
      if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!common.util.getCookie("name")) {
          // console.error("NOT LOGIN")
          next({
            path: '/login',
            query: { redirect: to.fullPath }
          })
        } else {
          // console.error("LOGIN")
          next()
        }
      } else {
        // console.error("NOT AUTH")
        next() // 确保一定要调用 next()
      }
    })

  }
}).$mount('#app')
