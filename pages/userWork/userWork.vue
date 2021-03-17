<template>
	<view class="">
		<view  v-for="( item, index ) in list" :key="index">
			<view class=" border-bottom px-3">
				<media-list :item="item" :index="index"></media-list>
			</view>
			<view class="flex" style="height: 100rpx;">
				<view @click="edit(item)" class="flex-1 flex justify-center align-center" hover-class="bg-light">
					修改
				</view>
				<view @click="openVideoList(item)" class="flex-1 flex justify-center align-center" hover-class="bg-light">
					详细
				</view>
				<view class="flex-1  flex justify-center align-center" hover-class="bg-light">
					删除
				</view>
			</view>
			<view class="f-divider"></view>
		</view>
		<!-- 上拉加载更多 -->
		<view  class="flex justify-center align-center" style="height: 80rpx;color:grey;" hover-class="bg-light">{{ loadText }}</view>
	</view>
</template>

<script>
	import mediaList from "@/components/common/MediaList.vue"
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				list: [
					{
						cover: "/static/demo/list2/2.jpg",
						title: "标题标题标题标题标题标题标题标题标题标题",
						createTime: "今日10:20",
						playCount: 0,
						danmuCount: 0,
					}
				],
				page: 1,
				loadText: "上拉加载更多"
			}
		},
		onShow(){
			this.getData()
		},
		methods: {
			openVideoList(item) {
				uni.navigateTo({
					url: `../userVideoList/userVideoList?id=${item.id}`
				})
			},
			getData(){
				let page = this.page
				return this.$H.get(`/video_list/${this.page}?user_id=${this.user_id}&limit=10`).then(  res => {
					if( page === 1) {
						this.list = res
					} else {
						this.list = [...this.list, ...res]
					}
					this.loadText = res.length < 10 ? '没有更多数据了...' : '上拉加载更多'
				}).catch( err => {
					if(this.page > 1) {
						this.page--
					}
					this.loadText = '上拉加载更多'
				})
			},
			edit(item){
				uni.navigateTo({
					url: `../create/create?data=${decodeURIComponent(JSON.stringify(item))}`
				})
			}
		},
		onPullDownRefresh() {
			this.page = 1
			this.getData().then(res => {
				uni.showToast({
					title: '刷新成功',
					icon:'none'
				})
				uni.stopPullDownRefresh()
			}).catch(err => {
				uni.showToast({
					title: '刷新失败',
					icon:'none'
				})
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {
			if (this.loadText !== '上拉加载更多') return
			this.loadText = '正在加载中...'
			this.page += 1
			this.getData()
		},
		computed: {
			...mapState({
				user_id: state=> {
					return state.user.id ? state.user.id : 0
				}
			})
		},
		components: {
			mediaList,
		}
	}
</script>

<style>

</style>
