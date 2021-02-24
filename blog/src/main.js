import Vue from 'vue'
import App from './App'
import store  from "./store"
import router from './router'

import toast from 'components/common/toast'
import FastClick from 'fastclick'
import LazyLoad from 'vue-lazyload'

Vue.config.devtools = true

Vue.config.productionTip = false

//图片懒加载
Vue.use(LazyLoad, {
  loading: require('./assets/img/common/loadingWhite.gif')
})

//bus总线
Vue.prototype.$bus = new Vue()

Vue.use(toast)

//解决移动端300ms延迟
FastClick.attach(document.body)


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
