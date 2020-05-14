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




Vue.config.productionTip = false
Vue.prototype.$http = axios
// Vue.use(VueAxios,axios);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
