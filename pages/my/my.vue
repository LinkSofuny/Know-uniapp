<template>
	<view>
		<!-- 登录后 -->
		<navigator v-if="!user" url="../login/login">
			<view class="p-3 flex align-center">
				<image 
				src="../../static/demo/6.jpg" 
				style="height: 120rpx;width: 120rpx;"
				class="rounded-circle bg-light flex-shrink"></image>
				<view class="flex flex-column ml-3 flex-1">
					<text class="font-md text-main">点击登录</text>
				</view>
			</view>
		</navigator>
		<!-- 登录后 -->
		<navigator v-else url="../userPage/userPage">
			<view class="p-3 flex align-center">
				<image 
				:src="user.avatar || '../../static/demo/6.jpg'" 
				style="height: 120rpx;width: 120rpx;"
				class="rounded-circle bg-light flex-shrink"></image>
				<view class="flex flex-column ml-3 flex-1">
					<view class="font-md text-dark">
						{{user.nickname || user.username}} 
						<text class="font-sm text-light-muted ml-2">{{user.sex}}</text>
					</view>
					<text class=" font text-muted">
						{{user.desc || '这个人很懒什么都没有留下'}}
					</text>
				</view>
			</view>
		</navigator>
		<view class="f-divider"></view>
		
		<!-- 选项部分 -->
		<my-options @click="navigateTo('userWork')" icon="iconshipin" title="我的作品" :showRightIcon="false" :rightText="videoCount + ' 个'"></my-options>
		<my-options @click="navigateTo('userFava')" icon="iconshoucang1" title="我的收藏" ></my-options>
		<my-options  icon="iconguanzhu" title="关注" :rightText="followCount"></my-options>
		<my-options  icon="iconlishi" title="历史记录" ></my-options>
		<view class="f-divider"></view>
		<!-- 投稿 -->
		<view class="py-3 px-2">
			<big-button @click="isShow">立即投稿</big-button>
		</view>
		<!-- 弹窗 -->
		<my-poppup :show="show" :popupHeight="320" @click="noShow">
			<view class="flex align-center justify-center" style="height: 200rpx;" @click.stop="stop">
				<!-- 单集 -->
				<view class="flex-1 flex justify-center align-center flex-column"
				 style="height: 100%;"
				 hover-class="bg-light"
				 @click="navigateTo('create')">
					<text class="iconfont icondingdanwenjian bg-deliver-single text-white rounded-circle flex justify-center align-center" style="height: 80rpx; width: 80rpx;"></text>
					<view class="font text-muted">
						单集
					</view>
				</view>
				<!-- 连载 -->
				<view @click="navigateTo('create')" class="flex-1 flex justify-center align-center flex-column" style="height: 100%;" hover-class="bg-light">
					<text class="iconfont icon918caidan_wenjian bg-deliver-series text-white rounded-circle flex justify-center align-center" style="height: 80rpx; width: 80rpx;"></text>
					<view class="font  text-muted">
						连载
					</view>
				</view>
			</view>
							
			<view class="f-divider"></view>
			
			<view class="font-md py-2 flex justify-center align-center"
			hover-class="bg-light"
			@click.stop="noShow">
				取消
			</view>
		</my-poppup>
	</view>
</template>

<script>
	import myOptions from "@/components/common/MyOptions.vue"
	import bigButton from "@/components/common/BigButton.vue"
	import myPoppup from "@/components/common/MyPoppup.vue"
	import { mapMutations, mapState } from "vuex"
	export default {
		data() {
			return {
				userInfo: {},
				followCount: 0,
				videoCount: 0
			}
		},
		methods: {
			...mapMutations('popupStatus', ['isShow', 'noShow']),
			// 选择投稿类型
			navigateTo(path) {
				uni.navigateTo({
					url: '/pages/' + path + '/' + path ,
				})
			},
			stop(){},

		},
		onShow(){
				this.$H.get('/user/statistics', {
					token: true,
					noJump: true,
					toast: false
				}).then(res => {
					this.followCount = res.followCount 
					this.videoCount = res.videoCount 
				})
		},
		computed: {
			...mapState('popupStatus', ['show']),
			...mapState({
				user: state => state.user
			}),
			
			isLogin() {
				return false
			}
		},
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				uni.navigateTo({
					url: '../userSet/userSet'
				});
			}
		},
		components:{
			myOptions,
			bigButton,
			myPoppup
		}
	}
</script>

<style>
.loginBtn {
	background-color: white;
}
.loginBtn::after {
	border: none;
}
</style>
