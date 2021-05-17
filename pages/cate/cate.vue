<template>
	<view>
	<!-- 仅在小程序端显示 -->
	<!-- #ifdef MP -->
		<!-- 导航栏wx -->
		<view class="" style="height: 38px;"></view>
		<view class="flex align-center p-1 mx-1 fixed-top bg-white" style="height: 38px;">
			<!-- 搜索框 -->
			<view @click="openSearch" class="flex align-center flex-1 rounded-circle px-1 mx-2" style="background: #F6F7F8; color: #959fA0;">
				<text class="iconfont iconsousuokuang"></text>
				<text class="font-small">输入点什么吧</text>
			</view>
		</view>
	<!-- #endif -->
	<hot-card 
	:showGap="false" 
	:showRefresh="false"
	>
		<view class="flex justify-around  flex-wrap cate-icon">
			<icon-cate
			:item="item"
			:index= "index"
			v-for="(item, index) in list" 
			:key="index"
			>
			</icon-cate>
		</view>
	</hot-card>
	</view>
</template>

<script>
	import HotCard from "@/components/common/RecommodationCard.vue"
	import iconCate from "@/components/common/iconCate.vue"
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.getDate()
		},
		onPullDownRefresh(){
			this.getDate().then(res=>{
				uni.showToast({
					title: '刷新成功',
					icon: 'none'
				})
				uni.stopPullDownRefresh()
			}).catch(err=> {
				uni.showToast({
					title: '刷新失败',
					icon: 'none'
				})
			})
		},
		methods: {
			getDate(){
				uni.showLoading()
				return this.$H.get('/category').then(res=> {
					this.list = res
					uni.hideLoading()
				}).catch(err=> {
					uni.hideLoading()
				})
			},
			openSearch() {
				uni.navigateTo({
					url:"../search/search"
				})
			}
		},
		components: {
			HotCard,
			iconCate
		}
	}
</script>

<style>

</style>
