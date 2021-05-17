<template>
	<view class="">
		<uni-swipe-action  v-for="( item, index ) in list" :key="index">
			<uni-swipe-action-item :right-options="options" @click="onClick($event, item)">
				<media-list class="w-100" :item="item" :index="index"></media-list>
			</uni-swipe-action-item>
		</uni-swipe-action>
	<!-- 如无数据 -->
	<view class="" v-if="list.length === 0" class="flex justify-center align-center mt-5 " style="color: grey;">暂无数据</view>
	<!-- 上拉加载更多 -->
	<view v-else-if="list.length > 10" class="flex justify-center align-center" style="height: 80rpx;color:grey;" hover-class="bg-light">{{ loadText }}</view>
	</view>
</template>

<script>
	import mediaList from "@/components/common/MediaList.vue"
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				list: [],
				options:[ 
					{
					text: '取消收藏',
					style: {
						backgroundColor: '#dd524d',
					}
				}
				],
				page: 1,
				loadText: '上拉加载更多'

			};
		},
		components: {
			mediaList,
		},
		onLoad () {
			this.getData()
		},
		methods: {
			onClick(e, item){
				this.$H.post('fava/video', {
					video_id: item.id
				}, {
					token: true
				}).then( res => {
					uni.showToast({
						title: res.msg,
						icon: 'none'
					});
					this.page = 1
					this.getData()
				})
			},
			getData () {
				return this.$H.get(`/fava_list/${this.page}?user_id=${this.user_id}`).then(res => {
					if(this.page === 1) { 
						this.list = res
					} else {
						this.list = [...this.list, ...res]
					}
					this.loadText = res.length === 10 ? '上拉加载更多' : '没有更多了'
				}).catch(err => {
						if (page > 1) {
							this.page--
						}
						this.loadText = '上拉加载更多'
				})
			}
		},
		onReachBottom() {
			if( this.loadText !== '上拉加载更多') {
				return
			}
			this.loadText = '正在加载中'
			this.page++
			this.getData()
		},
		onPullDownRefresh () {
			this.page = 1
			this.getData().then( res => {
				uni.showToast({
					title: '刷新成功',
					icon: 'none'
				});
				uni.stopPullDownRefresh()
			}).catch( err => {
				uni.showToast({
					title: '刷新失败',
					icon: 'none'
				});
				uni.stopPullDownRefresh()
			})
		},
		computed: {
			...mapState({
				user_id: state => state.user.id
			})
		}
	}
</script>

<style lang="scss">

</style>
