<template>
	<view>
		<view class="bg-light text-muted position-relative" 
		style="height: 350rpx;"
		@tap="upload">
			<image v-if="form.cover" :src="form.cover" mode="aspectFill" style="width: 100%;height:100%;"></image>
			<view class="position-absolute left-0 right-0 bottom-0 top-0 flex justify-center align-center flex-column" style=" background-color: rgba(255, 255, 255, 0.2);">
				<text v-if="!form.cover" class="iconfont iconjia " style="font-size: 70rpx;"></text>
				<view class="">点击{{form.cover ? '切换' : '提交'}}封面图</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form:{
					cover: ""
				}
			}
		},
		methods: {
			upload() {
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				    success: (res) => {
						this.form.cover = res.tempFilePaths[0]
				    }
				});
			}
		}
	}
</script>

<style>

</style>
