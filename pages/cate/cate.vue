<template>
	<view>
	<!-- 仅在小程序端显示 -->
	<!-- #ifdef MP -->
		<!-- 导航栏wx -->
		<view class="" style="height: 38px;"></view>
		<view class="flex align-center p-1 mx-1 fixed-top bg-white" style="height: 38px;">
			<!-- 搜索框 -->
			<view class="flex align-center flex-1 rounded-circle px-1 mx-2" style="background: #F6F7F8; color: #959fA0;">
				<text class="iconfont iconsousuokuang"></text>
				<text class="font-small">输入点什么吧</text>
			</view>
		</view>
	<!-- #endif -->
	<hot-card title="热门分类" :showRefresh="false">
		<scroll-view scroll-x="true" class="scroll-row" >
			<icon-cate 
			:item="item"
			:index= "index"
			v-for="(item, index) in list" 
			:key="index">
			</icon-cate>
		</scroll-view>
	</hot-card>
	<hot-card 
	title="全部分类" 
	:showGap="false" 
	:showRefresh="false"
	>
		<icon-cate
		:item="item"
		:index= "index"
		v-for="(item, index) in list" 
		:key="index">
		</icon-cate>
	</hot-card>
	</view>
</template>

<script>
	import HotCard from "@/components/common/RecommodationCard.vue"
	import iconCate from "@/components/common/iconCate.vue"
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			for (let i = 0; i < 10; i++) {
				this.list.push(
				{
					name: '分类',
					cover: "/static/demo/cate/1.png"
				}
				)
			}
		},
		methods: {
			
		},
		components: {
			HotCard,
			iconCate
		}
	}
</script>

<style>

</style>
