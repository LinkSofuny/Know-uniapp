<template>
	<view>
		<big-button @click='logot'>退出登录</big-button>
	</view>
</template>

<script>
	import bigButton from '@/components/common/BigButton.vue';
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			logot() {
				this.$store.dispatch('logout').then( res => {
					uni.switchTab({
						url:"../my/my"
					})
				})
				uni.showToast({
					title: '退出成功',
					icon: 'none'
				});
			}
		},
		components:{
			bigButton
		}
	}
</script>

<style>

</style>
