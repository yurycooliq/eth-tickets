import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import Web3 from 'web3'

Vue.prototype.$web3 = window.ethereum ? new Web3(window.ethereum) : null
Vue.config.productionTip = false

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
