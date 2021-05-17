import Vue from 'vue'
import App from './App'
import store from './store/globalStatus.js'
import utils from './common/utils.js'

import $H from './common/request.js';
Vue.config.productionTip = false
Vue.prototype.$H = $H
Vue.prototype.$store = store
Vue.prototype.$_ = utils
Vue.prototype.authJump = (options) => {
	if (!store.state.token) {
		uni.showToast({
			title:'登录',
			icon: 'none'
		})
		return uni.navigateTo({
			url: '/pages/login/login'
		})
	}
	uni.navigateTo(options)
}
App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
