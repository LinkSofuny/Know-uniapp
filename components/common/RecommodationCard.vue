<template>
	<view>
		<view class="px-3">
			<view class="flex align-center pb-1 pt-2">
				<text class=" font-weight-bolder font-md">{{ title }}</text>
			</view>
			<slot></slot>
			<view 
			v-if="showRefresh" @click="$emit('refresh')"
			class="flex align-center justify-center py-2 text-main " hover-class="text-main-hover">
				<text class="iconfont iconshuaxin pr-1"></text>
				换一批
			</view>
		</view>
		<view class="f-divider" v-if="showGap" >
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			showRefresh: {
				type: Boolean,
				default: true
			},
			showGap: {
				type: Boolean,
				default: true
			},
			title: {
				type: String,
				default: null
			}
		},
	}
</script>

<style>
</style>
