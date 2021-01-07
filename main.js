import Vue from 'vue'
import App from './App'
import store from './store/globalStatus.js'

import $H from './common/request.js';
Vue.config.productionTip = false
Vue.prototype.$H = $H

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
