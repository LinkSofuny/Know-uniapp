import Vue from 'vue'
import Vuex from 'vuex'
import popupStatus from "./popupStatus/index.js"
import episodePopupStatus from "./episodePopupStatus/index.js"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {},
	mutations: {},
	modules: {
		popupStatus,
		episodePopupStatus
	}
	
})