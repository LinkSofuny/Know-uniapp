<template>
	<view>
		<view class="f-list">
			<media-list v-for="( item, index ) in list" :key="index" :item="item" :index="index"></media-list>
		</view>
		<!-- 如无数据 -->
		<view class="" v-if="list.length === 0" class="flex justify-center align-center mt-5 " style="color: grey;">暂无数据</view>
		<!-- 上拉加载更多 -->
		<view v-else-if="list.length > 10" class="flex justify-center align-center" style="height: 80rpx;color:grey;" hover-class="bg-light">{{ loadText }}</view>
	</view>
</template>

<script>
	import mediaList from "@/components/common/MediaList.vue"
	export default {
		data() {
			return {
				category_id: 0,
				list: [],
				page: 1,
				loadText: '上拉加载更多'
			}
		},
		methods: {
			getData(){
				let url = `http://127.0.0.1:7001/category/${this.category_id}/video/${this.page}`
				
				let page = this.page
				return this.$H.get(url).then(res => {
					if(page === 1 ) {
						this.list = res
					} else {
						this.list = [...this.list, ...res]
					}
					this.loadText = res.length === 10 ? '上拉加载更多' : '你已经抵达知识的底部...'
				}).catch(err => {
					if(this.page > 1) {
						this.page--
					}
				})
			}
		},
		onLoad(e) {
			if(e.id) {
				this.category_id = e.id
			}
			if(e.title) {
				uni.setNavigationBarTitle({
					title: e.title
				})
			}
			this.getData()
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
			if (this.loadText === '你已经抵达知识的底部...') return
			this.page += 1
			this.getData()
		},
		components: {
			mediaList
		}
	}
</script>

<style>

</style>
