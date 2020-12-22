<template>
		<view 
		 class="icon-cate flex align-center justify-center">
			<image  :src="item.cover"  style="width: 70rpx;height: 70rpx;"></image>
			<text class="font text-muted mt-2">{{ item.name }}</text>
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
