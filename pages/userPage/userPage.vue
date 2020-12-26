<template>
	<view>
		<view class="">
			<image src="../../static/demo/list2/3.jpg" mode="aspectFill" style="height: 320rpx; width: 750rpx;"></image>
		</view>
		<!-- 个人信息 -->
		<view class="px-3 border-bottom" style="height: 300rpx;">
			<view class="flex justify-between align-center">
				<image src="../../static/demo/6.jpg" class="rounded-circle bg-danger" style="width: 150rpx;height: 150rpx; margin-top: -70rpx;"></image>
				<button class="bg-main text-white font mx-0" hover-class="bg-main-hover">关注</button>
			</view>
			<view class="mx-2 flex align-center py-1">
				<view class="font-lg text-main font-weight-bolder mr-2">
					Link
				</view>
				<view class="font text-light-muted alignInline">
					UID: 123456
				</view>
			</view>
			<view class="flex align-center mx-2">
				<text class="font-md text-dark">21</text>
				<text class="font-sm ml-2 text-light-muted alignInline">关注</text>
				<text class="font-md ml-2 text-dark">2123</text>
				<text class="font-sm ml-2 text-light-muted alignInline">粉丝</text>
			</view>
			<view class="text-light-muted mx-2 text-ellipsis">
				aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
			</view>
		</view>
		<view class="flex align-center text-muted" style="height: 44px;">
			<view class="flex-1 font-weight-bold flex align-center justify-center"
			 :class="{ 'text-main': tabIndex === index}"
			 v-for="(item, index) in tabBars"
			 :key = "index"
			 @click="clickChangeTabBar(index)">
				{{item.name}}
			</view>
		</view>
		<view class="f-divider"></view>
		<swiper
		:current="tabIndex" 
		:duration="300" 
		:style="'height:' + scrollHeight + 'px'"
		@change="changeTabBar($event)">
			<swiper-item v-for="(tab, tabId) in tabBars" :key="tabId">
				<scroll-view class="" scroll-y="true" :style="'height:' + scrollHeight + 'px'">
					<media-list class="border-bottom px-2" v-for="( item, index ) in list" :key="index" :item="item" :index="index"></media-list>
				</scroll-view>	
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import mediaList from "../../components/common/MediaList.vue";
	export default {
		data() {
			return {
				tabIndex: 0,
				tabBars: [
					{name:'主页'},
					{name:'动态'},
					{name:'作品'},
					{name:'收藏'},
				],
				list: [
					{
						cover: "/static/demo/list2/2.jpg",
						title: "标题标题标题标题标题标题标题标题标题标题",
						createTime: "今日10:20",
						playCount: 0,
						danmuCount: 0,
					},
					{
						cover: "/static/demo/list2/2.jpg",
						title: "标题标题标题标题标题标题标题标题标题标题",
						createTime: "今日10:20",
						playCount: 0,
						danmuCount: 0,
					},
					{
						cover: "/static/demo/list2/2.jpg",
						title: "标题标题标题标题标题标题标题标题标题标题",
						createTime: "今日10:20",
						playCount: 0,
						danmuCount: 0,
					},
					{
						cover: "/static/demo/list2/2.jpg",
						title: "标题标题标题标题标题标题标题标题标题标题",
						createTime: "今日10:20",
						playCount: 0,
						danmuCount: 0,
					},
					{
						cover: "/static/demo/list2/2.jpg",
						title: "标题标题标题标题标题标题标题标题标题标题",
						createTime: "今日10:20",
						playCount: 0,
						danmuCount: 0,
					},
					{
						cover: "/static/demo/list2/2.jpg",
						title: "标题标题标题标题标题标题标题标题标题标题",
						createTime: "今日10:20",
						playCount: 0,
						danmuCount: 0,
					},
					{
						cover: "/static/demo/list2/2.jpg",
						title: "标题标题标题标题标题标题标题标题标题标题",
						createTime: "今日10:20",
						playCount: 0,
						danmuCount: 0,
					},
					{
						cover: "/static/demo/list2/2.jpg",
						title: "标题标题标题标题标题标题标题标题标题标题",
						createTime: "今日10:20",
						playCount: 0,
						danmuCount: 0,
					},
					{
						cover: "/static/demo/list2/2.jpg",
						title: "标题标题标题标题标题标题标题标题标题标题",
						createTime: "今日10:20",
						playCount: 0,
						danmuCount: 0,
					},
					{
						cover: "/static/demo/list2/2.jpg",
						title: "标题标题标题标题标题标题标题标题标题标题",
						createTime: "今日10:20",
						playCount: 0,
						danmuCount: 0,
					}
				],
				scrollHeight: 0
				
			}
		},
		methods: {
			clickChangeTabBar(index) {
				this.tabIndex = index
			},
			changeTabBar(e) {
				this.tabIndex = e.detail.current
			}
		},
		components: {
			mediaList,
		},
		created() {
			
			let windowHeight = uni.getSystemInfoSync().windowHeight
			let statusBarHeight = uni.getSystemInfoSync().statusBarHeight
			// 下滑保留选项卡
			this.scrollHeight = windowHeight - statusBarHeight - 94
		}
	}
</script>

<style scoped>
.alignInline {
	/* app 昵称与ID位置对齐 */
	/* #ifdef APP-PLUS */
	margin-top: 5rpx;
	/* #endif */
}
</style>
