<template>
	<view class="">
		<uni-swipe-action  v-for="( item, index ) in list" :key="index">
			<uni-swipe-action-item :right-options="options" @click="onClick($event, item)">
				<media-list class="px-3" :item="item" :index="index"></media-list>
			</uni-swipe-action-item>
		</uni-swipe-action>
	</view>
</template>

<script>
	import mediaList from "@/components/common/MediaList.vue"
	export default {
		data() {
			return {
				list: [
					{	id: 1,
						cover: "/static/demo/list2/2.jpg",
						title: "标题标题标题标题标题标题标题标题标题标题",
						createTime: "今日10:20",
						playCount: 0,
						danmuCount: 0,
					},
					{	id: 2,
						cover: "/static/demo/list2/2.jpg",
						title: "标题标题标题标题标题标题标题标题标题标题",
						createTime: "今日10:20",
						playCount: 0,
						danmuCount: 0,
					},
					{	id: 3,
						cover: "/static/demo/list2/2.jpg",
						title: "标题标题标题标题标题标题标题标题标题标题",
						createTime: "今日10:20",
						playCount: 0,
						danmuCount: 0,
					}
				],
				options:[ 
					{
					text: '取消收藏',
					style: {
						backgroundColor: '#dd524d',
					}
				}	
				]

			};
		},
		components: {
			mediaList,
		},
		methods: {
			onClick(e, item){
			  console.log(item.id)
			  console.log('点击了'+(e.position === 'left' ? '左侧' : '右侧') + e.content.text + '按钮')
			},
		}
	}
</script>

<style lang="scss">

</style>
