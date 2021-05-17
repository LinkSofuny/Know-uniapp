<template>
	<view>
		<!-- 仅在小程序端显示 -->

		<!-- #ifdef MP -->
			<!-- 导航栏wx -->
			<view class="" style="height: 38px;"></view>
			<!-- 搜索框 -->
			<view  class="flex align-center p-1 mx-1 fixed-top bg-white" style="height: 38px;">
				<view @click="openSearch" class="flex align-center flex-1 rounded-circle px-1 mx-2" style="background: #F6F7F8; color: #959fA0;">
					<text class="iconfont iconsousuokuang"></text>
					<text class="font-small">输入点什么吧</text>
				</view>
				<view class=" align-center flex" style="color: #959fA0;" @click="openCate">
					分类
				</view>
			</view>
		<!-- #endif -->
		<!-- 轮播图 -->
		<view class="py-2 px-3">
		 <swiper-dot :info="swipers" :current="current">
			<swiper
			circula 
			:autoplay="true" 
			:interval="3000" 
			:duration="150" 
			style="height: 250rpx;"
			@change="changeSwiper">
				<swiper-item v-for="(item, index) in swipers" :key="index" @click="openVideoPage(item.video_id)">
					<image :src="item.cover" class="rounded-lg" mode="aspectFill" style="width: 100%; height: 250rpx;"></image>
				</swiper-item>
			</swiper>
		 </swiper-dot>
		</view>
		<!-- 推荐栏 -->
		<recom-card>
			<view class="f-list p-3" >
				<view  @click="openVideoPage(item.id)" class="f-list-card rounded-lg border position-relative" v-for="(item, index) in list3" :key="index">
					<image 
					class="rounded-top" 
					:src="item.cover"
					mode="aspectFill" 
					style="width: 100%; height: 220rpx;"></image>
					<view class="f-list-card-num text-white flex align-center position-absolute left-0 right-0 bottom-0"
					 style="height: 65rpx; top:156rpx ;">
						<text class="iconfont iconbofangshu mx-1 font-md"></text>
						<text class="font-sm">2{{item.play_count}}</text>
						<text class="iconfont icondanmushu mx-1 font-md"></text>
						<text class="font-sm">{{item.danmu_count}}</text>
					</view>
					<view class="px-1 pb-1">
						<view class="font f-list-card-title">
							{{item.title}}
						</view>
						<view class="flex justify-between align-center text-light-muted">
							<text class="font-sm">{{ item.category.title  }}</text>
							<text class="iconfont icongengduo"></text>
						</view>
					</view>
				</view>
			</view>
		</recom-card>
	</view>
</template>

<script>
	import swiperDot from "@/components/common/SwiperDot.vue"
	import recomCard from '@/components/common/RecommodationCard.vue'
	import mediaList from "@/components/common/MediaList.vue"
	export default {
		data() {
			return {
				imgSrc: null,
				current: 0,
				swipers: [
				],
				ctg: [],
				list3: []
			}
		},
		components: {
			swiperDot,
			recomCard,
			mediaList
		},
		onLoad () {
			this.$H.get('/index_data').then( res => {
				this.list3 = res
			})
			this.$H.get('/banner/list').then( res => {
				this.swipers = res
			})
			
		},
		onNavigationBarSearchInputClicked() {
			uni.navigateTo({
				url:"../search/search"
			})
			
		},
		onNavigationBarButtonTap(e) {
			uni.switchTab({
				url:'../cate/cate'
			})
		},
		onReachBottom (){
			console.log(1)
		},
		computed: {
		},
		methods: {
			changeSwiper (e) {
				this.current = e.detail.current
			},
			openVideoPage(e) {
				uni.navigateTo({
					url:"../videoPage/videoPage?id=" + e
				})
			},
			openSpecialPage() {
				uni.navigateTo({
					url: "../specialPage/specialPage"
				})
			},
			openSearch () {
				uni.navigateTo({
					url:"../search/search"
				})
			},
			openCate(e) {
				uni.switchTab({
					url:'../cate/cate'
				})
			},

		}
	}
</script>

<style lang="scss">
.f-list {
	display: flex;
	flex-wrap: wrap;
}

.f-list-card:nth-child(2n) {
	margin-left: 30rpx;
}
.f-list-card {
	min-height: 5rpx;
	width: 330rpx;
	box-sizing: border-box;
	margin-bottom: 30rpx;
}

// 样式2

.f-list-card-2 {
	width: 210rpx;
	margin-left: 30rpx;
}
.f-list-card-2:nth-child(1) {
	margin-left: 0;
}
.f-list-card-2:nth-child(4) {
	margin-left: 0;
}


.f-list-card-num {
	height: 66rpx;
	background: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0, 0, 0, .8));
}
	
</style>
