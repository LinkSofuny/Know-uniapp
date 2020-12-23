<template>
	<view class="flex border-bottom border-light-secondary " style="min-height: 100rpx;">
		<view class=" flex align-center justify-center font-md" style="width: 120rpx; height: 100rpx;">
			{{label}}
		</view>
		<view class="flex-1 text-muted flex align-center justify-center">
			<slot></slot>
		</view>
		<text v-if="rightIcon" class="iconfont iconjinru flex align-center justify-center mr-2 text-muted"></text>
	</view>
</template>

<script>
	export default {
		props: {
			label: {
				type: String,
				default: "标题"
			},
			rightIcon: {
				type: Boolean,
				default: false,
			}
		},
	}
</script>

<style>
</style>
