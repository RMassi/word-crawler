// POLYFILL
import 'babel-polyfill'

// STYLES
import 'normalize.css'
import '@/styles/general.scss'

// LIBS
import Vue from 'vue'
import vuetify from './plugins/vuetify'
import VueCytoscape from "vue-cytoscape"

// FILTERS

// MAIN COMPONENT
import App from './main/App.vue'

// ROUTER
import router from './main/router'

// STORE
import store from './main/store'

// i18n
import i18n from './main/i18n'

// MODULES
import './main/modules'

// INTERCEPTOR
import './main/interceptor'

// CONFIG
Vue.config.productionTip = false

Vue.use(VueCytoscape)

// VUE INSTANCE

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app')
