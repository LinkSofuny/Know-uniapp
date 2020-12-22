<template>
	<view class="">
		<!-- 蒙版 -->
		<view class="position-fixed top-0 left-0 right-0 bottom-0 animated faster fadeIn "
		style="background: rgba(0, 0, 0, 0.5);"
		v-if="show"
		@click.stop="noShow">
		<!-- 弹框 -->
			<view
			 class="position-absolute left-0 right-0 bottom-0 bg-white animated faster fadeIn "
			 style="height: 320rpx; z-index: 1000;">
				<slot></slot>	
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		data () {
			return {
			}
		},
		methods: {
			...mapMutations('popupStatues', ['noShow'])
		},
		computed: {
			...mapState('popupStatues',['show'])
		}
	}
</script>

<style scoped>
	.animated{
		-webkit-animation-duration:.3s;
		animation-duration:.3s;
		}
</style>
