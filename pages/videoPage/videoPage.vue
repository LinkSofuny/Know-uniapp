<template>
	<view style="line-height: 1;">
		<!-- #ifndef APP-PLUS -->
		<video
		:src="detail.src" 
		:poster="detail.poster" 
		controls 
		style="height: 225px; width: 750rpx;"
		></video>
		<!-- #endif -->
		
		<view
		class="border-bottom flex justify-center align-center " 
		style="height:80rpx;"
		>
			<!-- 选项卡 简介评论 -->
			<view
			v-for="(item, index) in tobBars"
			:key = "index"
			@click="optionTab(index)"
			class="flex-1 font flex justify-center align-center ">
				<text
				class="py-1 border-box" 
				:class="[{'active': tabIndex === index},{'noActive': tabIndex !== index}]">{{item.name}}</text>
			</view>
		</view>
		
		<scroll-view scroll-y="true" :style="'height:'+ scrollH +'px'" id="commentBody">
			<!-- 简介页 -->
			<view v-if= "tabIndex === 0" class="py-2 ">
				<view class="flex flex-column">
					<view class=" flex align-center justify-between px-3">
						<view class="">
							<image src="../../static/demo/avatar.jpg" mode="" class="mr-3 rounded-circle" style="width: 100rpx;height: 100rpx;"></image>
						</view>
						<view class="flex flex-column">
							<text class="font text-main">陈老师</text>
							<text class="font-sm text-light-muted">369粉丝</text>
						</view>
						<button class="bg-main text-white font mr-0" hover-class="bg-main-hover">关注</button>
					</view>
					<view class="font-md px-3">
						基于uniapp实现一个商城小程序
					</view>
					<view class="f-list-card-num flex align-center text-light-muted px-3"
					 style="height: 65rpx;">
						<text class="iconfont iconbofangshu mr-1 font-md"></text>
						<text class="font-sm">206.4万</text>
						<text class="iconfont icondanmushu mx-1 font-md"></text>
						<text class="font-sm">5524</text>
						<text class="font-sm ml-1">今日 12:20</text>
					</view>
					<!-- 选集 -->
					<view class="flex py-3 border-top border-bottom flex-column">
						<view class=" px-3 flex align-center">
							<text class="font-md">选集</text>
							<view class="ml-auto">
								<text @click="isShow" class="font text-light-muted">共9集</text>
								<text class="iconfont iconjinru font text-light-muted ml-1"></text>
							</view>
						</view>
						<scroll-view scroll-x="true" class="scroll-row px-3 mt-2">
							<view  
							class="scroll-row-item rounded  mr-2 pt-1 px-2 borde-box font-weight-light"
							:class="[{'border-main text-main': currentEpisode === index}, 
									{'border text-muted': currentEpisode !== index}]"
							style="width: 340rpx;height: 130rpx;"
							v-for="index in 10"
							:key="index"
							@click="currentEpisode = index"
							>
								<text class="font ">第{{index}}集</text>
								<view class="font-md text-ellipsis">关于uniapp的开发介绍</view>
							</view>
						</scroll-view>
					</view>
				</view>
				<view class="f-list px-2">
					<media-list @click="openVideoPage()" v-for="( item, index ) in list" :key="index" :item="item" :index="index"></media-list>
				</view>
			</view>
			<!-- 选集弹框 -->
			<my-poppup  :show="show"  :popupHeight="700" @click="noShow">
				<view class="flex flex-column" style="height: 700rpx;" @click.stop="stop">
					<view class="flex align-center" style="height: 80rpx;">
						<text class="font-md ml-3 font-weight-light">选集</text>
						<view @click="noShow" class="flex justify-center align-center ml-auto" style="width: 80rpx;height: 80rpx;"hover-class="bg-light">
							<text class="iconfont iconguanbi text-muted" ></text>
						</view>
					</view>
					<scroll-view scroll-y="true" style="height: 620rpx;" >
						<view class="flex flex-wrap">
							<view style="width: 50%;"
							v-for="index in 10"
							:key="index"
							class="border-box p-2">
								<view
								class="rounded font-weight-light"
								:class="[{'border-main text-main': currentEpisode === index}, 
										{'border text-muted': currentEpisode !== index}]"
								style="width: 100%;height: 130rpx;"
								@click="currentEpisode = index"
								>
									<text class="font">第{{index}}集</text>
									<view class="font-md text-ellipsis">最强发现</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</my-poppup>
			<!-- 评论页 -->
			<view v-if= "tabIndex === 1" class="py-1" >
				<view class="px-3">
					<view class="uni-comment-list" >
						<!-- 头像 -->
						<view class="uni-comment-face">
							<image src="/static/demo/6.jpg" style="width: 80rpx;height: 80rpx;" mode=""></image>
						</view>
						<!-- 评论体 -->
						<view class="uni-comment-body">
							<view class="uni-comment-top">
								<text class="text-main font">昵称11111</text>
							</view>
							<view class="uni-comment-date">
								<text class="text-muted font-sm">10:1011</text>
							</view>
							<view class="uni-comment-content">
								评论内容
							</view>
							<view class="flex flex-wrap py-2  bg-light rounded">
								<text class="font text-main mr-2 ml-2">昵称2:</text>
								回复功能
							</view>
						</view>
						
					</view>
				</view>
				<view
				style="height: 100rpx;" 
				class="flex position-fixed align-center border-top fixed-bottom"
				>
					<input
					@click="openComment" 
					class="bg-light px-2 ml-3 mr-2 flex-1 rounded-lg"  
					disabled
					placeholder="说点什么吧?"
					style="height: 60rpx;"/>
					
				</view>
			</view>
		</scroll-view>
		<my-poppup  :show="commentShow"  :popupHeight="100" @click="closeComment">
			<view
			style="height: 100rpx;" 
			@click.stop="stop"
			class="flex align-center border-bottom fixed-top position-fixed"
			>
				<input
				type="text"
				value="aaaa"
				:focus="isfocus"
				:adjust-position="false"
				placeholder="说点什么吧?" 
				class="bg-light px-2 ml-3 mr-2 flex-1 rounded-lg"  
				style="height: 60rpx;"/>
				<view class="font-md text-main mr-3" hover-class="" @click="closeComment">
					发布
				</view>
			</view>
		</my-poppup>
	</view>
</template>

<script>
	import mediaList from "@/components/common/MediaList.vue"
	import myPoppup from "@/components/common/MyPoppup.vue"
	import { mapMutations, mapState} from 'vuex'
	// 评论框聚焦
	let commentTimer = null
	export default {
		data() {
			return {
				commentShow: false,
				detail:{
					src: "https://douyinzcmcss.oss-cn-shenzhen.aliyuncs.com/%E8%AF%BE%E6%97%B61.%20%E9%A1%B9%E7%9B%AE%E4%BB%8B%E7%BB%8D.mp4",
					poster:"https://douyinzcmcss.oss-cn-shenzhen.aliyuncs.com/shengchengqi/datapic/1.jpg",
				},
				commentVal:'',
				scrollH: 0,
				tabIndex: 0,
				currentEpisode: 0,
				isfocus: false,
				tobBars: [
					{ name: "简介"},
					{ name: "评论"}
				],
				list: [
					{
						cover: "/static/demo/list2/5.png",
						title: "Vue框架开发, 你懂了吗?",
						createTime: "今日10:20",
						playCount: 221,
						danmuCount: 33,
					},
					{
						cover: "/static/demo/list2/9.png",
						title: "webpack打包实战开发",
						createTime: "今日10:11",
						playCount: 0,
						danmuCount: 0,
					},
					{
						cover: "/static/demo/list2/8.png",
						title: "HTML5实战开发",
						createTime: "今日10:20",
						playCount: 0,
						danmuCount: 0,
					},
					{
						cover: "/static/demo/list2/2.jpg",
						title: "标题标题标题标题标题标题标题标题标题标题",
						createTime: "今日10:20",
						playCount: 412,
						danmuCount: 124,
					},
					{
						cover: "/static/demo/list2/2.jpg",
						title: "你好这里是标题",
						createTime: "今日10:20",
						playCount: 412,
						danmuCount: 124,
					}
				]
			}
		},
		onLoad() {
			// #ifdef APP-PLUS
			this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight
			// 通过 id 获取 nvue 子窗体
			const subNVue = uni.getSubNVueById('top')
			subNVue.setStyle({  
			    width: '100%',
				height:"269px"
			})
			// #endif
			this.scrollH = uni.getSystemInfoSync().windowHeight - 226 - 47 - this.statusBarHeight
			console.log(uni.getSystemInfoSync())
			
			
		},
		methods: {
			optionTab(index) {
				this.tabIndex = index
			},
			closeComment() {
				this.commentShow = false
				this.isfocus = false
				clearTimeout(commentTimer)
			},
			openComment() {
				this.commentShow = true
				let commentTimer = setTimeout(()=> {
					this.isfocus = true
				},100)
				
			},
			stop(){},
			openVideoPage() {
				uni.navigateTo({
					url:"../videoPage/videoPage"
				})
			},
			clickInput(e) {
				
				
				
			},
			...mapMutations('episodePopupStatus', ['isShow', 'noShow'])
		},
		computed: {
			// app端则适配状态栏高度
			optionH: function() {
				return this.statusBarHeight ? 225 + this.statusBarHeight : 225
			},
			...mapState('episodePopupStatus',['show']),
		},
			
		components: {
			mediaList,
			myPoppup
		},
		onHide() {
			this.noShow()
		},
		onUnload() {
			this.noShow()
		}
	}
</script>

<style>
.active {
	border-bottom: 5rpx solid #87ceeb;
	color: #87ceeb;
}
.noActive {
	border-bottom: 5rpx solid #FFFFFF;
	color: #000000;
}
</style>
