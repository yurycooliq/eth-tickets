import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Web3 from 'web3'

Vue.config.productionTip = false

Vue.prototype.$web3 = window.ethereum ? new Web3(window.ethereum) : null

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
