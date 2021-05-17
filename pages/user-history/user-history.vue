<template>
	<view class="">
		<uni-swipe-action  v-for="( item, index ) in list" :key="index">
			<uni-swipe-action-item :right-options="options" @click="onClick($event, item)">
				<media-list class="w-100" :item="item" :index="index"></media-list>
			</uni-swipe-action-item>
		</uni-swipe-action>
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
					text: '删除记录',
					style: {
						backgroundColor: '#dd524d',
					}
				}
				],

			};
		},
		components: {
			mediaList,
		},
		onLoad () {
			this.getData()
		},
		onNavigationBarButtonTap() {
			uni.removeStorage({
				key: 'history',
				success: (res) => {
					uni.showToast({
						icon:'none',
						title:'清除成功'
					})
					this.list = []
				}
			})
		},
		methods: {
			onClick(e, item){
				item.id
				let index = this.list.findIndex( v => {
					v.id === item.id
				} )
				if (index !== -1) {
					this.list.splice(index, 1)
					uni.setStorage({
						key: 'history',
						data: JSON.stringify(this.list)
					})
					uni.showToast({
						icon:'none',
						title:'删除成功'
					})
				}
			},
			getData () {
				let list =  uni.getStorageSync('history')
				list = list ? JSON.parse(list) : [],
				this.list = list
			}
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
