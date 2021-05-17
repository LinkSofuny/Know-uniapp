<template>
	<view>
		
		<!-- #ifdef MP -->
			<!-- 导航栏wx -->
			<view class="" style="height: 38px;"></view>
			<!-- 搜索框 -->
			<view  class="flex align-center p-1 mx-1 fixed-top bg-white" style="height: 38px;">
				<input type="text" v-model="keyword" class="flex align-center flex-1 rounded-circle px-2 py-1 mx-2" style="background: #F6F7F8; color: #959fA0;"  placeholder="输入点什么吧"/>
				<view @click="handleSearch" class=" align-center flex" style="color: #959fA0;" >
					搜索
				</view>
			</view>
		<!-- #endif -->
		
		
		<media-list class="px-3"  v-for="(item, index) in list" :key="index" :item="item" :index="index"></media-list>
		<!-- 如无数据 -->
		<view class="" v-if="list.length === 0" class="flex justify-center align-center mt-5 " style="color: grey;">暂无数据</view>
		<!-- 上拉加载更多 -->
		<view 
		v-else-if="list.length > 10" 
		class="flex justify-center align-center" 
		style="height: 80rpx;color:grey;" 
		hover-class="bg-light">
			{{ loadText }}
		</view>
		
	</view>
</template>

<script>
	import mediaList from "@/components/common/MediaList.vue"
	export default {
		components: {
			mediaList
		},
		data() {
			return {
				keyword: '',
				page: 1,
				list: [],
				loadText: '上拉加载更多'
			}
		},
		onNavigationBarSearchInputChanged(e) {
			this.keyword = e.text
		},
		onNavigationBarButtonTap() {
			this.handleSearch()
		},
		onReachBottom() {
			if( this.loadText !== '上拉加载更多') {
				return
			}
			this.loadText = '正在加载中'
			this.page++
			this.getData()
		},
		methods: {
			handleSearch () {
				if (this.keyword === '') {
					return uni.showToast({
						title: '关键词不能为空',
						icon: 'none'
					});
				}
				this.page = 1
				this.search()
			},
			search () {
				let page = this.page
				let keyword = this.keyword
				console.log(keyword);
				this.$H.get(`/video_search/${page}?keyword=${keyword}`).then ( res => {
					if(this.page === 1) {
						this.list = res
					} else {
						this.list = [...this.list, ...res]
					}
					this.loadText = res.length === 10 ? '上拉加载更多' : '没有更多了'
				} ).catch(err => {
						if (page > 1) {
							this.page--
							this.loadText = '上拉加载更多'
						}
				})
			}
		}
	}
</script>

<style>

</style>
