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
		

		<from-item label="标题">
			<input type="text" v-model="form.title" placeholder="请填写视频标题" placeholder-class="text-light-muted" class="w-100" placeholder-style="margin-top: 3rpx;" />
		</from-item>
		
		<picker mode="selector" :range="range" @change="selectorChange">
			<from-item label="分类" rightIcon>
				<input type="text" v-model="form.category" placeholder="请选择分类" placeholder-class="text-light-muted " class="w-100 " disabled />
			</from-item>
		</picker>
		

		<from-item label="描述">
			<textarea type="text" v-model="form.desc" placeholder="请填写视频描述" placeholder-class="text-light-muted" class="w-100 py-3 textareaMargin" />
		</from-item>
		
		<!-- #ifdef MP -->
		<big-button @tap="submitWork">发 布</big-button>
		<!-- #endif -->
		

	</view>
</template>

<script>
	import fromItem from "@/components/common/FromItem.vue"
	import bigButton from "@/components/common/BigButton.vue"
	export default {
		data() {
			return {
				form:{
					cover: "",
					title: "",
					category: "",
					desc: "",
				},
				range: ["分类1", "分类2", "分类3", "分类4", ]
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
			},
			selectorChange(e) {
				this.form.category = e.detail.value
			},
			submitWork() {
				console.log('1')
			}
		},
		
		components: {
			fromItem,
			bigButton
		}
	}
</script>

<style>
.textareaMargin {
	/* #ifdef MP */
	/* 需条件编译的代码 */
	margin-top: 7rpx ;
	/* #endif */
}
</style>
