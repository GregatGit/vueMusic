import Vue from 'vue'
import App from './App.vue'

import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay, faPause, faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faPause, faPlay, faTrash)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
