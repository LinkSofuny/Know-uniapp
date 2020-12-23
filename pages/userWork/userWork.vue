<template>
	<view class="">
		<view  v-for="( item, index ) in list" :key="index">
			<view class=" border-bottom px-3">
				<media-list :item="item" :index="index"></media-list>
			</view>
			<view class="flex" style="height: 100rpx;">
				<view class="flex-1 flex justify-center align-center" hover-class="bg-light">
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
	</view>
</template>

<script>
	import mediaList from "@/components/common/MediaList.vue"
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
				]
			}
		},
		components: {
			mediaList,
		},
		methods: {
			openVideoList(item) {
				uni.navigateTo({
					url: "../userVideoList/userVideoList"
				})
			}
		}
	}
</script>

<style>

</style>
