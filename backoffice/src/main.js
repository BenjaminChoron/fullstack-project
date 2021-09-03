import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Routes from './routes'
import CKEditor from '@ckeditor/ckeditor5-vue2'
import dayjs from 'dayjs'
require('dayjs/locale/fr');
dayjs.locale('fr');
let advancedFormat = require('dayjs/plugin/advancedFormat');
dayjs.extend(advancedFormat);
import VueDayjs from 'vue-dayjs-plugin'

Vue.config.productionTip = false

Vue.use(CKEditor)

Vue.use(VueRouter)

Vue.use(VueDayjs)

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
