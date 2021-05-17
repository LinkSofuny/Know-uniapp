<template>
	<view style="line-height: 1;">
		<!-- #ifndef APP-PLUS -->
		<video
		:src="src" 
		:poster="poster" 
		controls 
		style="height: 225px; width: 750rpx;"
		id="myVideo"
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
						<view class="" @click="openUserPage">
							<image :src="detail.user.avatar || '../../static/demo/avatar.jpg'" class="mr-3 rounded-circle" style="width: 100rpx;height: 100rpx;"></image>
						</view>
						<view class="flex flex-column flex-1">
							<text class="font text-main">{{detail.user.nickname || detail.user.username}}</text>
							<text class="font text-muted">{{fensCount}} 粉丝</text>
						</view>
						<button  v-if="detail.user.id !== user_id" @click="doFollow" class="bg-main text-white font mr-0" hover-class="bg-main-hover">{{ followStatus? "已关注" : "关注" }}</button>
					</view>
					
					
					<view class="flex justify-between font-md px-3">
						{{currentVideo.title}}
					</view>
					<view class="f-list-card-num flex align-center text-light-muted px-3"
					 style="height: 65rpx;">
						<text class="iconfont iconbofangshu mr-1 font-md"></text>
						<text class="font-sm">{{detail.danmu_count}}</text>
						<text class="iconfont icondanmushu mx-1 font-md"></text>
						<text class="font-sm">{{detail.play_count}}</text>
						<text class="font-sm ml-1">{{detail.created_time}}</text>
						<button @click="doFava" class="bg-main text-white font-small mr-0 mb-2 px-2" hover-class="bg-main-hover">{{ favaStatus ? "已收藏" : "收藏" }}</button>
					</view>
					<!-- 选集 -->
					<view class="flex py-3 border-top border-bottom flex-column">
						<view class=" px-3 flex align-center">
							<text class="font-md">选集</text>
							<view class="ml-auto">
								<text @click="isShow" class="font text-light-muted">共{{videos.length}}集</text>
								<text class="iconfont iconjinru font text-light-muted ml-1"></text>
							</view>
						</view>
						<scroll-view scroll-x="true" class="scroll-row px-3 mt-2">
							<view  
							class="scroll-row-item rounded  mr-2 pt-1 px-2 borde-box font-weight-light"
							:class="[{'border-main text-main': currentEpisode === index}, 
									{'border text-muted': currentEpisode !== index}]"
							style="width: 340rpx;height: 130rpx;"
							v-for="(item, index) in videos"
							:key="index"
							@click="switchVideo(item, index)"
							>
								<text class="font ">第{{index + 1}}集</text>
								<view class="font-md text-ellipsis">{{ item.title }}</view>
							</view>
						</scroll-view>
					</view>
				</view>
				<view class="f-list px-2">
					<media-list @click="openVideoPage()" v-for="( item, index ) in hot" :key="index" :item="item" :index="index"></media-list>
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
							v-for="(item, index) in videos"
							:key="index"
							class="border-box p-2">
								<view
								class="rounded font-weight-light"
								:class="[{'border-main text-main': currentEpisode === index}, 
										{'border text-muted': currentEpisode !== index}]"
								style="width: 100%;height: 130rpx;"
								@click="switchVideo(item, index)"
								>
									<text class="ml-2 font">第 {{index + 1}} 集</text>
									<view class="ml-2 font-md text-ellipsis">{{ item.title }}</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</my-poppup>
			<!-- 评论页 -->
			<view v-if= "tabIndex === 1" class="py-1" style="margin-bottom: 70rpx;">
				<view class="px-3" v-for=" (item, index) in comments" :key="index">
					<view class="uni-comment-list"  >
						<!-- 头像 -->
						<view class="uni-comment-face">
							<image :src="item.send_user.avatar || '/static/demo/avatar.jpg'" style="width: 80rpx;height: 80rpx;" mode=""></image>
						</view>
						<!-- 评论体 -->
						<view class="uni-comment-body">
							<view class="uni-comment-top">
								<text class="text-main font">{{item.send_user.nickname || item.send_user.username}}</text>
							</view>
							<view class="uni-comment-date">
								<text class="text-muted font-sm">{{ item.created_time | formatTime }}</text>
							</view>
							<view class="uni-comment-content" @click="openComment(item.id, item.send_user)">
								{{item.content}}
							</view>
							<view class="flex flex-wrap py-1  bg-light rounded" v-for="(item2, index2) in item.comments" :key="index2">
								<text class="font text-main mr-2 ml-2">{{ item2.send_user.nickname || item2.send_user.username}}</text>
								<text class="font text-dark">回复</text>
								<text class="font text-main mr-2 ml-2">{{ item2.reply_user.nickname || item2.reply_user.username}}: </text>
								<text @click="openComment(item.id, item2.send_user)">{{item2.content}}</text>
							</view>
						</view>
						
					</view>
				</view>
				<view
				style="height: 100rpx;" 
				class="flex position-fixed align-center border-top fixed-bottom"
				>
					<input
					@click="openComment(0)" 
					class="bg-light px-2 ml-3 mr-2 flex-1 rounded-lg"  
					disabled
					placeholder="说点什么吧?"
					style="height: 60rpx;"/>
					
				</view>
			</view>
		</scroll-view>
		<my-poppup class="comment-popup" :show="commentShow" ref="comment"  :popupHeight="100"  @click="closeComment" >
			<view
			style="height: 100rpx;" 
			@click.stop="stop"
			class="comment-box flex align-center border-bottom"
			>
				<input
				type="text"
				v-model="content"
				:focus="isfocus"
				:adjust-position="false"
				:placeholder="reply_user.id ? '回复 @' + reply_user.name : '说点什么吧'" 
				class="bg-light px-1 ml-3 mr-2 flex-1 rounded-lg"  
				style="height: 60rpx;"/>
				<view class="font-md text-main mr-3" hover-class="" @click="sendComment">
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
	import $T from '@/components/common/time.js'
	// 评论框聚焦
	let commentTimer = null
	let videoCtx = null
	export default {
		data() {
			return {
				commentShow: false,
				src: "",
				poster:"",
				detail:{
					category_id: 0,
					cover: "",
					created_time: "",
					danmu_count: 0,
					desc: "",
					duration: 0,
					id: 18,
					play_count: 0,
					title: "",
					user: {
						id: 3,
						username: "link2",
						nickname: "",
					   avatar: ""
					}
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
				videos: [],
				hot: [],
				id: '',
				comments: [],
				currentVideo: {},
				followStatus: false,
				favaStatus: false,
				content: '',
				reply_user: {
					id: 0,
					name: ""
				},
				fensCount: 0
			}
		},
		mounted() {
			videoCtx = uni.createVideoContext('myVideo', this)
		},
		async onLoad(e) {
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
			if(!e.id) {
				uni.showToast({
					title: '参数错误',
					icon: 'none'
				})
				return uni.navigateBack({
					delta: 1
				})
			}
			this.id = e.id
			await this.$H.get('/video_read/' + this.id, {
				token: true,
				noJump: true,
				toast: false
			}).then(result => {
				console.log(result);
				this.hot =  result.hot
				this.detail = result.video
				this.poster = result.video.cover
				this.videos = result.video.video_details || []
				this.detail.created_time = $T.gettime(this.detail.created_time)
				this.hot.forEach( item => {
					item.created_time  = $T.gettime(item.created_time)
				})
				
				this.followStatus = result.follow
				this.favaStatus = result.fava
				this.getComment()
			})
			this.switchVideo()
			this.getUserInfo()
			
			
		},
		methods: {
			getUserInfo () {
				this.$H.get('/user/user_info?user_id=' + this.detail.user.id).then( res => {
					this.fensCount = res.followCount
				})
			},
			getComment () {
				this.$H.get('/video_comment/' + this.detail.id).then( res => {
					this.comments = res
					console.log(res);
				})
			},
			sendComment () {
				if ( this.comment === '') {
					uni.showToast({
						title: '评论内容不能为空',
						icon: 'none'
					});
				}
				this.$H.post('/comment', {
					content:  this.content,
					video_id: this.detail.id,
					reply_id: this.reply_id,
					reply_user_id: this.reply_user.id
				}).then(res => {
					console.log(res);
					uni.showToast({
						title: '评论成功',
						icon: 'none'
					});
					this.getComment()
					this.closeComment()
				})
			},
			optionTab(index) {
				this.tabIndex = index
			},
			closeComment() {
				console.log(1);
				this.commentShow = false
				this.isfocus = false
				clearTimeout(commentTimer)
			},
			openComment(reply_id = 0, reply_user = {
				id: 0,
				username: "",
				nickname: ""
			}) {
				this.reply_id = reply_id
				this.reply_user = {
					id: reply_user.id,
					name: reply_user.nickname || reply_user.username
				}
				this.content = ""
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
			doFava() {
				this.$H.post('/fava/video', {
					video_id: this.detail.id
				}, {
					token: true
				}).then( res => {
					this.favaStatus = res.status
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
				})
			},
			doFollow() {
				let url = this.followStatus ? '/user/unfollow' : "/user/follow"
				let msg = this.followStatus ? "取消关注" : '关注'
				this.$H.post(url, {
					follow_id: this.detail.user.id
				}, {
					token: true
				}).then( res => {
					this.followStatus = !this.followStatus
					uni.showToast({
						title: msg + '成功',
						icon: 'none'
					})
				}).catch( err => {
					console.log(err);
				})
			},
			switchVideo(item, index) {
				if(!item && !index) {
					index = 0
					item = this.videos[index]
					console.log(this.videos);
				}
				videoCtx.pause()
				this.currentEpisode = index
				this.currentVideo = this.videos[index]
				this.src = item.url
				setTimeout(() => {
					videoCtx.play()
				}, 300)
			},
			openUserPage() {
				uni.navigateTo({
					url: '../userPage/userPage?user_id='+ this.detail.user.id,
					success: res => {},
				});
			},
			...mapMutations('episodePopupStatus', ['isShow', 'noShow'])
		},
		computed: {
			// app端则适配状态栏高度
			optionH: function() {
				return this.statusBarHeight ? 225 + this.statusBarHeight : 225
			},
			...mapState('episodePopupStatus',['show']),
			...mapState({
				user_id: state => {
					return state.user ? state.user.id : 0
				}
			}),
		},
		components: {
			mediaList,
			myPoppup
		},
		filters: {
			formatTime (value) {
				return $T.gettime(value)
			}
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
.comment-popup {
	z-index: 99999;
}
.comment-box {
	position: fixed;
	top: 448rpx;
	left: 0;
	right: 0;
	background-color: white;
}
</style>
