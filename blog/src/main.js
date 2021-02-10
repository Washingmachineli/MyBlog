import Vue from 'vue'
import App from './App'
import store  from "./store"
import router from './router'

import toast from 'components/common/toast'
import FastClick from 'fastclick'

Vue.config.devtools = true

Vue.config.productionTip = false


Vue.use(toast)

//解决移动端300ms延迟
FastClick.attach(document.body)


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
