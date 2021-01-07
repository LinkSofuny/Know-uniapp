<template>
	<view>
		<!-- 仅在小程序端显示 -->
		<!-- #ifdef MP -->
			<!-- 导航栏wx -->
			<view class="" style="height: 38px;"></view>
			<!-- 搜索框 -->
			<view class="flex align-center p-1 mx-1 fixed-top bg-white" style="height: 38px;">
				<view class="flex align-center flex-1 rounded-circle px-1 mx-2" style="background: #F6F7F8; color: #959fA0;">
					<text class="iconfont iconsousuokuang"></text>
					<text class="font-small">输入点什么吧</text>
				</view>
				<view class=" align-center flex" style="color: #959fA0;">
					分类
				</view>
			</view>
		<!-- #endif -->
		<!-- 轮播图 -->
		<view class="py-2 px-3">
		 <swiper-dot :info = "swipers" :current="current">
			<swiper
			circula 
			:autoplay="true" 
			:interval="3000" 
			:duration="150" 
			style="height: 250rpx;"
			@change="changeSwiper">
				<swiper-item v-for="(item, index) in swipers" :key="index">
					<image :src="item.src" class="rounded-lg" mode="aspectFill" style="width: 100%; height: 250rpx;"></image>
				</swiper-item>
			</swiper>
		 </swiper-dot>
		</view>
		<!-- 列表样式3 -->
		<recom-card>
			<view class="f-list">
				<media-list @click="openVideoPage()" v-for="( item, index ) in list3" :key="index" :item="item" :index="index"></media-list>
			</view>
		</recom-card>
		<!-- 推荐栏 -->
		<recom-card title="为你推荐">
			<view class="f-list p-3" >
				<view  @click="openSpecialPage()" class="f-list-card rounded-lg border position-relative" v-for="i in 6" :key="i">
					<image 
					class="rounded-top" 
					src="../../static/demo/list2/1.jpg" 
					mode="aspectFill" 
					style="width: 100%; height: 220rpx;"></image>
					<view class="f-list-card-num text-white flex align-center position-absolute left-0 right-0 bottom-0"
					 style="height: 65rpx; top:156rpx ;">
						<text class="iconfont iconbofangshu mx-1 font-md"></text>
						<text class="font-sm">206.4万</text>
						<text class="iconfont icondanmushu mx-1 font-md"></text>
						<text class="font-sm">5524</text>
					</view>
					<view class="px-1 pb-1">
						<view class="font f-list-card-title">
							标题
						</view>
						<view class="flex justify-between align-center text-light-muted">
							<text class="font-sm">恶搞</text>
							<text class="iconfont icongengduo"></text>
						</view>
					</view>
				</view>
			</view>
		</recom-card>
		<!-- 推荐栏样式2 -->
		<recom-card title="为你推荐">
			<view class="f-list p-3" >
				<view class="f-list-card-2 rounded-lg position-relative" v-for="i in 6" :key="i">
					<image 
					class="rounded-lg" 
					src="../../static/demo/list3/2.webp" 
					mode="aspectFill" 
					style="width: 100%; height: 280rpx;"></image>
					<view class="f-list-card-num text-white flex align-center position-absolute left-0 right-0 bottom-0 rounded-bottom-lg"
					 style="height: 65rpx; top:216rpx ;">
						<text class="iconfont iconbofangshu mx-1 font-md"></text>
						<text class="font-sm">206.4万</text>
					</view>
					<view class="font">
						标题
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
				current: 0,
				swipers: [
					{src: "../../static/demo/swiper/1.jpg",
					title: "啊啊啊啊啊啊啊啊啊1"},
					{src: "../../static/demo/swiper/2.jpg",
					title: "啊啊啊啊啊啊啊啊啊2"},
					{src: "../../static/demo/swiper/3.jpg",
					title: "啊啊啊啊啊啊啊啊啊3"}
				],
				list3: [
					{
						cover: "/static/demo/list2/2.jpg",
						title: "标题标题标题标题标题标题标题标题标题标题",
						createTime: "今日10:20",
						playCount: 2132,
						danmuCount: 1243,
					},
					{
						cover: "/static/demo/list2/2.jpg",
						title: "标题标题标题标题标题标题标题标题标题标题",
						createTime: "今日10:20",
						playCount: 124,
						danmuCount: 121,
					},
					{
						cover: "/static/demo/list2/2.jpg",
						title: "标题标题标题标题标题标题标题标题标题标题",
						createTime: "今日10:20",
						playCount: 412,
						danmuCount: 124,
					}
				]
			}
		},
		components: {
			swiperDot,
			recomCard,
			mediaList
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
			changeSwiper (e) {
				this.current = e.detail.current
			},
			openVideoPage() {
				uni.navigateTo({
					url:"../videoPage/videoPage"
				})
			},
			openSpecialPage() {
				uni.navigateTo({
					url: "../specialPage/specialPage"
				})
			}
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
