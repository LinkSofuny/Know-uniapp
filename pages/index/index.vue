<template>
	<view>
		<!-- 仅在小程序端显示 -->
		<!-- #ifdef MP -->
			<!-- 导航栏wx -->
			<view class="flex align-center p-1 mx-1 fixed-bottom" style="height: 44px;">
				<!-- 搜索框 -->
				<view class="flex align-center flex-1 rounded-circle py-1 px-1 mx-2" style="background: #F6F7F8; color: #959fA0;">
					<text class="iconfont iconsousuokuang"></text>
					<text>输入点什么吧</text>
				</view>
				<view class=" align-center flex" style="color: #959fA0;">
					分类
				</view>
			</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {

		},
		onNavigationBarSearchInputClicked() {
			console.log('导航栏监听')
			
		},
		onNavigationBarButtonTap(e) {
			console.log('分类按钮监听')
		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
