<script>
	export default {
		onLaunch: function() {
			// 初始化用户登录状态
			this.$store.dispatch('initUser')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* #ifndef APP-NVUE */
	/* 引入官方样式 */
	@import url("./common/uni.css");
	/* #endif */
	
	/* 引入工具类样式库 */
	@import url("./common/free.css");
	/* 引入全局样式 */
	@import url("./common/common.css");
	
	/* #ifndef APP-NVUE */
	/* 引入图标库 */
	@import url("./common/icon.css");
	
	/* 动画库 */
	@import url("./common/animate.min.css");
	/* #endif */
</style>
