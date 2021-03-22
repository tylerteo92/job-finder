import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/bootstrap/bootstrap.scss'
import '@/assets/bootstrap/custom.scss'
import App from './App.vue'

Vue.use(ElementUI, { size: 'medium', locale });
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
