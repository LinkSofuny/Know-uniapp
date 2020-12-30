<template>
	<view class="">
		<!-- 蒙版 -->
		<view class="position-fixed top-0 left-0 right-0 bottom-0 animated faster fadeIn "
		style="background: rgba(0, 0, 0, 0.5);"
		v-if="show"
		@click.stop="$emit('click')">
		<!-- 弹框 -->
			<view
			 class="position-absolute left-0 right-0 bottom-0 bg-white animated faster fadeIn "
			 style="z-index: 1000;"
			 :sytle="'height:'+ popupHeight + 'rpx;'">
				<slot></slot>	
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			popupHeight: {
				type: Number,
				default: 320
			}
		},
		data () {
			return {
			}
		},
		methods: {
		},
		computed: {
		}
	}
</script>

<style scoped>
	.animated{
		-webkit-animation-duration:.3s;
		animation-duration:.3s;
		}
</style>
