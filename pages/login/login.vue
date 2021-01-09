<template>
	<view>
		<!-- 状态栏高度 -->
		<!-- #ifdef APP-PLUS -->
		<view :style="'height:' + statusBarHeight + 'px;'" ></view>
		<view class="flex align-center" style="height: 44rpx;">
			<view @click="backPage" class="px-3 pt-2" style="width: 44px; height: 44px;" hover-class="text-main">
				<text class="iconfont iconguanbi" style="font-size: 40rpx;"></text>
			</view>
		</view>
		<!-- #endif -->
		
		<view class="flex justify-center align-center" style="margin-top: 100rpx; margin-bottom: 80rpx; font-size: xx-large;">
			{{ type === "login" ? "欢迎回来" : "账号注册"}}
		</view>
		
		<view class="px-4">
			<input 
			type="text" 
			class="uni-input mb-4 bg-light rounded" 
			placeholder="手机号/用户名/邮箱" 
			v-model="form.username"/>
			<input 
			type="text" 
			class="uni-input mb-4 bg-light rounded" 
			placeholder="请输入密码"
			v-model="form.password"/>
			<input 
			v-if="type === 'reg'" 
			type="text" 
			class="uni-input mb-4 bg-light rounded" 
			placeholder="请确认密码"
			v-model="form.repassword"/>
		</view>
		<view class="px-2">
			<big-button @click="submit">{{ type === "reg" ? '注册账号' : '登 录' }}</big-button>
		</view>
		
		<view class="flex align-center justify-center py-5">
			<view class="" style="height: 1rpx;width: 100rpx; background-color: #DDDDDD;"></view>
			<text class="mx-2 text-muted font-sm">社交账号登录</text>
			<view class="" style="height: 1rpx;width: 100rpx; background-color: #DDDDDD;"></view>
		</view>
		<!-- 社交账号登录口 -->
		<view class="flex align-center justify-between justify-around" style="height: 100rpx;">
			<view class="bg-light flex justify-center align-center rounded-circle" style="height: 100rpx; width: 100rpx;" hover-class="bg-hover-light">
				<text class="iconfont iconweixin text-muted"></text>
			</view>
			<view class="bg-light flex justify-center align-center rounded-circle" style="height: 100rpx; width: 100rpx;" hover-class="bg-hover-light">
				<text class="iconfont iconQQ text-muted"></text>
			</view>
			<view class="bg-light flex justify-center align-center rounded-circle" style="height: 100rpx; width: 100rpx;" hover-class="bg-hover-light">
				<text class="iconfont iconxinlangweibo text-muted"></text>
			</view>
		</view>
	
		<view class="flex align-center justify-center py-5">
			<text class="mx-2 text-muted font-sm" @click="changeType">{{ type === "login" ? '注册账号' : '登录' }}</text>
		</view>
	</view>
</template>

<script>
	import bigButton from '@/components/common/BigButton.vue'
	export default {
		data() {
			return {
				type: "login",
				statusBarHeight: 0,
				form: {
					username: "",
					password: '',
					repassword: '',
				}
			}
		},
		methods: {
			changeType() {
				this.type = this.type === 'login' ? 'reg' : 'login'
				this.form = {
					username: "",
					password: '',
					repassword: '',
				}
			},
			backPage() {
				uni.navigateBack({
					delta: 1
				})
			},
			submit() {
				if(this.type === 'reg') {
					this.$H.post('/reg', this.form).then(res => {
						this.changeType()
						uni.showToast({
							title: '注册成功',
							icon: 'none'
						})
					})
				}
			}
		},
		onLoad() {
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight
		},
		components: {
			bigButton,
		},
	}
</script>

<style>

</style>
