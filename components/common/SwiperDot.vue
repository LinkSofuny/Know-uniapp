<template>
	<view>
		<view class=" position-relative">
			<slot></slot>
			<view class="flex align-center position-absolute px-2 bottom-0 left-0 right-0 rounded-bottom-lg swiper-bottom-info" >
				<view class="flex-8 text-ellipsis">
					<!-- title -->
					{{info[current] ? info[current].title : '暂无描述'}}
				</view>
				<view class="flex-2 flex justify-end" >
					<!-- 可以有两个class(其中一个未绑定) => 判断的类名不用加引号 只在外部添加即可 -->
					<view 
					class= "align-center rounded-circle flex-shrink swiper-bottom-index"
					v-for="(item, index) in info" :key = "index"
					:class="{active: index === current}"
					>
					<!-- index -->
					</view>
				</view>
			</view>
		</view>		
	</view>
</template>

<script>
	export default {
		name:"swiperDot",
		props: {
			info: {
				type: Array,
				default: null
			},
			current: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.swiper-bottom-info {
		height: 70rpx;
		background-image: linear-gradient(to bottom, rgba(0,0,0,0),rgba(0,0,0,0.8));
		color: white;
	}
	.swiper-bottom-index {
		width: 16rpx; 
		height: 16rpx; 
		margin: 0 5rpx 0 5rpx;
		background-color: rgba(255,255,255,.5);
		&.active {
			background-color: rgba(255,255,255,1);
		}
	}
</style>
