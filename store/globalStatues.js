import Vue from 'vue'
import Vuex from 'vuex'
import popupStatues from "./popupStatues/index.js"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {},
	mutations: {},
	modules: {
		popupStatues,
	}
	
})