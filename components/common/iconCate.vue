<template>
		<view 
		 class="icon-cate flex align-center justify-center" @click="open">
			<text  class="iconfont " :class="item.cover"  style="width: 70rpx;height: 70rpx; font-size: 70rpx;"></text>
			<text class="font text-muted mt-2">{{ item.title }}</text>
		 </view>
		 
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
			},
			index: {
				type: [ Number, String ]
			}
		},
		methods: {
			open: function() {
				uni.navigateTo({
					url:'/pages/list/list?id='+this.item.id + '&title='+ this.item.title,
					success:res=> {}
				})
			}
		}
	}
</script>

<style>
	.icon-cate {
		display: inline-flex!important;
		flex-direction: column;
		width: 172rpx; 
		height: 187.5rpx; 
		line-height: 1;
		box-sizing: border-box;
	}
</style>
