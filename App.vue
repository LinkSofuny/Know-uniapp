<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
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
	
	/* 引入官方样式 */
	@import url("./common/uni.css");
	/* 引入工具类样式库 */
	@import url("./common/free.css");
	/* 引入全局样式 */
	@import url("./common/common.css");
</style>
