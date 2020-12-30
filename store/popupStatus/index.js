export default {
	namespaced: true,
	state: {
		show: false
	},
	mutations: {
		isShow (state) {
			state.show = true
		},
		noShow (state) {
			state.show = false
		}
	}
}