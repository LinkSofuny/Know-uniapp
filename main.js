import Vue from 'vue'
import App from './App'
import store from './store/globalStatus.js'
import utils from './common/utils.js'

import $H from './common/request.js';
Vue.config.productionTip = false
Vue.prototype.$H = $H
Vue.prototype.$store = store
Vue.prototype.$_ = utils

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
