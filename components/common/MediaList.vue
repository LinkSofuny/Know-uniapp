<template>
	<view class="flex align-center p-2 border-bottom" @click="$emit('click')">
		<image 
		:src="item.cover" 
		style="width: 260rpx; height: 160rpx;"
		class="rounded-lg mr-2 fls"></image>
		<view class="flex-1 flex flex-column justify-between" style="height: 100%;">
			<text class="font" style="line-height: 1.2;">{{ item.title }}
			</text>
			<text class="font-sm text-light-muted mt-auto">{{ item.createTime }}</text>
			<view class="flex align-center text-light-muted justify-between line-h">
				<view class="line-h position-relative">
					<text class="iconfont iconbofangshu font-md"></text>
					<text class="font-sm position-absolute" style="top: 8rpx; left: 52rpx;">{{ item.playCount }}</text>
				</view>
				<view class="line-h position-relative" >
					<text class="iconfont icondanmushu font-md"></text>
					<text class="font-sm position-absolute" style="top: 8rpx; left: 52rpx;">{{ item.danmuCount }}</text>						
				</view>
				<!-- flex布局下 给margin-left: auto的话 该元素会挪到父元素的最右边 -->
				<text class="iconfont icongengduo "></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				index: [String, Number]
			},
		},
	}
</script>

<style>
</style>
