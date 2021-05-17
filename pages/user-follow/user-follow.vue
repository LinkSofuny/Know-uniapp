<template>
	<view>
		<my-options v-for="(item,index) in list" :key="index" :title="item.name">
			<image slot='icon'  :src="item.avatar || '../../static/demo/6.jpg'" style="width: 80rpx;height: 80rpx;" class="mr-2 rounded-circle"></image>
		</my-options>
		<!-- 如无数据 -->
		<view class="" v-if="list.length === 0" class="flex justify-center align-center mt-5 " style="color: grey;">暂无数据</view>
		<!-- 上拉加载更多 -->
		<view 
		v-else-if="list.length > 10" 
		class="flex justify-center align-center" 
		style="height: 80rpx;color:grey;"
		 hover-class="bg-light">{{ loadText }}</view>
	 </view>
</template>

<script>
	import myOptions from '@/components/common/MyOptions.vue'
	export default {
		data() {
			return {
				list: [],
				page: 1,
				loadText: '上拉加载更多'
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			getData () {
				return this.$H.get(`/user/follows/${this.page}`, {token: true}).then(res => {
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
		components: {
			myOptions
		}
	}
</script>

<style>

</style>
