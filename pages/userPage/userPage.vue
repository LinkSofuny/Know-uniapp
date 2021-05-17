<template>
	<view>
		<view class="">
			<image src="../../static/demo/list2/3.jpg" mode="aspectFill" style="height: 320rpx; width: 750rpx;"></image>
		</view>
		<!-- 个人信息 -->
		<view class="px-3 border-bottom" style="height: 300rpx;">
			<view class="flex justify-between align-center">
				<image v-if=" user_id == my_user_id" :src="userInfo.avatarUrl || '../../static/demo/avatar.jpg'" class="rounded-circle bg-light" style="width: 150rpx;height: 150rpx; margin-top: -70rpx;"></image>
				<image v-else :src="userInfos.avatar || '../../static/demo/6.jpg'" class="rounded-circle bg-light" style="width: 150rpx;height: 150rpx; margin-top: -70rpx;"></image>
				<button  v-if=" user_id != my_user_id" @click="doFollow"  class="bg-main text-white font mx-0" hover-class="bg-main-hover">关注</button>
			</view>
			<view class="mx-2 flex align-center py-1">
				<view class="font-lg text-main font-weight-bolder mr-2">
					{{userInfos.username}}
				</view>
				<view class="font text-light-muted alignInline">
					UID: {{userInfos.id}}
				</view>
			</view>
			<view class="flex align-center mx-2">
				<text class="font-md text-dark">{{followCount}}</text>
				<text class="font-sm ml-2 text-light-muted alignInline">关注</text>
				<text class="font-md ml-2 text-dark">{{fensCount}}</text>
				<text class="font-sm ml-2 text-light-muted alignInline">粉丝</text>
			</view>
			<view class="text-light-muted mx-2 text-ellipsis">
				{{userInfos.desc || '这个人很懒什么都没有留下'}}
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
		
		
		<swiper :current="tabIndex" :duration="300" :style="'height:'+scrollHeight+'px;'" @change="changeSwiper">
			<swiper-item v-for="(tab,tabI) in tabBars" :key="tabI">
				<scroll-view scroll-y="true" :style="'height:'+scrollHeight+'px;'" @scrolltolower="scrolltolower(tabI)">
					<view class="f-divider"></view>
					<media-list v-for="(item,index) in list[tabI].data" :key="index" :item="item" :index="index"></media-list>
				
					<!-- 如无数据 -->
					<view class="" v-if="list[tabI].data.length === 0" class="flex justify-center align-center mt-5 " style="color: grey;">暂无数据</view>
					<!-- 上拉加载更多 -->
					<view v-else-if="list[tabI].data.length > 10" class="flex justify-center align-center" style="height: 80rpx;color:grey;" hover-class="bg-light">{{ tab.loadText }}</view>
					
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import mediaList from "../../components/common/MediaList.vue"
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				tabIndex: 0,
				tabBars: [
					{
						name:'作品',
						key:'video_list',
						page: 1,
						loadText: '上拉加载更多'
					},
					{
						name:'收藏',
						key: 'fava_list',
						page: 1,
						loadText: '上拉加载更多'
					},
				],
				list: [{
					data: []
				},{
					data: []
				}],
				scrollHeight: 0,
				userInfos: {
					avatar: "",
					desc: "",
					email: "",
					id: -1,
					nickname: "",
					phone: "",
					updated_time: "",
					username: ""
				},
				userInfo: {},
				fensCount: 0,
				followCount: 0,
				user_id: 0,
				loadText: ''
				
				
			}
		},
		onLoad(e) {
			if(!e.user_id) {
				uni.navigateBack({
					delta: 1
				});
				uni.showToast({
					title: '非法参数',
					icon: 'none'
				});
			}
			this.user_id = e.user_id
			this.getUserInfo(this.user_id)
			this.getData()
			uni.getUserInfo({
				success: res => {
					this.userInfo = res.userInfo
				}
			})
		},
		methods: {
			getUserInfo (user_id) {
				this.$H.get(`/user/user_info?user_id=${user_id}`, {
					token: true,
					noJump: true,
					toast: true
				}).then(res => {
					this.userInfos = res.user
					this.fensCount = res.fensCount
					this.followCount = res.followCount
				})
			},
			clickChangeTabBar(index) {
				this.tabIndex = index
			},
			changeSwiper(e){
				this.tabIndex = e.detail.current
				this.tabBars[this.tabIndex].page = 1
				this.getData()
			},
			changeTabBar(e) {
				this.tabIndex = e.detail.current
			},
			getData(url) {
				let index = this.tabIndex
				let page = this.tabBars[index].page
				this.$H.get('/' + this.url).then( res => {
					if (page === 1) {
						this.list[index].data = res
					} else {
						this.list[index].data = [...this.list[index].data, ...res]
					}
					this.tabBars[index].loadText = res.length === 10 ? '上拉加载更多' : '没有更多了'
				}).catch( err => {
					console.log(this.url);
					if (page > 1) {
						this.tabBars[index].page--
					}
					this.tabBars[index].loadText = '上拉加载更多'
				})
			},
			scrolltolower (index) {
				this.tabBars[index].page++
				this.getData()
			},
			doFollow() {
				let url = this.followStatus ? '/user/unfollow' : "/user/follow"
				let msg = this.followStatus ? "取消关注" : '关注'
				this.$H.post(url, {
					follow_id: this.user_id
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
		},
		computed: {
			tab () {
				return this.tabBars[this.tabIndex]
			},
			url () {
				let t = this.tab
				return `${t.key}/${t.page}?user_id=${this.user_id}`
			},
			...mapState({
				my_user_id: state => {
					return state.user ? state.user.id : 0
				}
			})
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
