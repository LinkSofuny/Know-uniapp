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
				<input type="text" v-model="categoryTitle" placeholder="请选择分类" placeholder-class="text-light-muted " class="w-100 " disabled />
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
				id: 0,
				form:{
					cover: "",
					title: "",
					category_id: null,
					desc: "",
				},
				category: [],
				range: ['请选择分类']
			}
		},
		methods: {
			upload() {
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['compressed'], //可以指定是原图还是压缩图，默认二者都有
				    success: (res) => {
						console.log(res);
						this.$H.upload('/upload', {
							filePath: res.tempFilePaths[0]
						}).then(res => {
							this.form.cover = res.url.replace('localhost', 'linkknow.xyz')
							
							
							uni.showToast({
								title: '上传成功',
								icon: 'none'
							})
						}).catch(err => {
							console.log(err)
						})
						// this.form.cover = 
				    }
					
				});
			},
			selectorChange(e) {
				this.form.category_id = e.detail.value
			},
			submitWork() {
				let url = this.id === 0 ? '/video' : `/video/${this.id}`
				let msg = this.id === 0 ? '发布' : '修改'
				this.$H.post(url,this.form, {
					 token:true})
				uni.showToast({
					title: `${msg}成功`,
					icon: 'none'
				})
				uni.navigateBack({
					delta: 1
				})
			}
		},
		onLoad(e){
			// 分类列表
			this.$H.get('/category').then(res=> {
				this.category = res
				let arr = this.category.map(item => item.title)
				this.range.push(...arr) 
			})
			if(e.data) {
				let item = JSON.parse(decodeURIComponent(e.data))
				this.form = {
					cover: item.cover,
					category_id: item.category_id,
					desc: item.desc,
					title: item.title
				}
				this.id = item.id
			}
		},
		onNavigationBarButtonTap() {
			this.submitWork()
		},
		computed: {
			categoryTitle() {
				let index =  this.category.findIndex(item => item.id === this.form.category_id)
				if(index === -1) return ''
				return this.category[index].title
			
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
