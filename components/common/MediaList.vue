<template>
	<view class="flex justify-around align-center p-2 border-bottom" style="width: 100%;" @click="open">
		<image 
		:src="item.cover"
		style="width: 260rpx; height: 160rpx;"
		class="rounded-lg mr-2 fls"></image>
		<view class="flex-1 flex flex-column justify-between" style="height: 100%;">
			<text class="font" style="line-height: 1.2;">{{ item.title }}
			</text>
			<text class="font-sm text-light-muted mt-auto">{{ item.created_time }}</text>
			<view class="flex align-center text-light-muted justify-between line-h">
				<view class="line-h position-relative">
					<text class="iconfont iconbofangshu font-md"></text>
					<text class="font-sm position-absolute" style="top: 8rpx; left: 52rpx;">{{ item.danmu_count }}</text>
				</view>
				<view class="line-h position-relative" >
					<text class="iconfont icondanmushu font-md"></text>
					<text class="font-sm position-absolute" style="top: 8rpx; left: 52rpx;">{{ item.play_count }}</text>						
				</view>
				<!-- flex布局下 给margin-left: auto的话 该元素会挪到父元素的最右边 -->
				<text class="iconfont icongengduo"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				index: [String, Number]
			},
		},
		data(){
			return {
				imgSrc: null,
				preIndex: 0
			}
		},
		onLoad() {
		},
		methods: {
			open() {
				uni.navigateTo({
					url: `../../pages/videoPage/videoPage?id=` + this.item.id,
				});
				// 存储到历史记录中
				let list =  uni.getStorageSync('history')
				list = list ? JSON.parse(list) : []
				let index = list.findIndex( item => {
					return item.id === this.item.id
				})
				if (index === -1) {
					list.unshift(this.item)
					this.preIndex = index
				} else {
					this.toFirst(list, index)
				}
				uni.setStorage({
					key: 'history',
					data: JSON.stringify(list)
				})
			},
			toFirst(item, index) {
				console.log("before", item);
				item.unshift(item[index])
				item.splice(this.preIndex, 1)
				console.log("after", item);
			}
		}
	
	}
</script>

<style>
</style>
