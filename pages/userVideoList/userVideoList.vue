<template>
	<view class="bg-light" style="min-height: 100vh;">
		<view class="" v-for="(item, index) in list" :key="index">
			<view  v-if="!item.isEdit" class="bg-white">
				<video :src="item.video" style="height: 350rpx; width: 100%;" controls></video>
				<from-item label="标题">
					<text class="font flex-1 justify-start">{{item.title}}</text>
				</from-item>
				<view class="flex align-center justify-center" style="height: 100rpx;">
					<view @click="openEdit(item)" class="flex-1 font flex align-center justify-center h-100" hover-class="bg-hover-light" >
						修改
					</view>
					<view @click="deleteVidieo(item)" class="flex-1 font flex align-center justify-center h-100" hover-class="bg-hover-light">
						删除
					</view>
				</view>
			</view>

			<!-- 点击添加新章节后的界面 -->
			<view v-else class="bg-white">
				<view class="bg-light text-muted position-relative"
				style="height: 350rpx;"
				>
					<video v-if="item.video" :src="item.video" style="height: 350rpx; width: 100%;" controls></video>
					<view v-else @tap="uploadVideo(item)" class="position-absolute left-0 right-0 bottom-0 top-0 flex justify-center align-center flex-column" style=" background-color: rgba(255, 255, 255, 0.2);">
						<text class="iconfont iconjia " style="font-size: 70rpx;"></text>
						<view class="">点击添加视频</view>
					</view>
				</view>
				<big-button v-if="item.video" @tap="uploadVideo(item)">切换视频</big-button>
				<from-item label="标题">
					<input type="text" v-model="item.title" placeholder="请填写视频标题" placeholder-class="text-light-muted" class="w-100" placeholder-style="margin-top: 3rpx;" />
				</from-item>
				
				<from-item label="描述">
					<textarea type="text" v-model="item.desc" placeholder="请填写视频描述" placeholder-class="text-light-muted" class="w-100 py-3 textareaMargin" />
				</from-item>
				<view class="flex align-center justify-center " style="height: 100rpx;">
					<view @click="submitVidieo(item)" class="flex-1 font flex align-center justify-center h-100 bg-main text-white" hover-class="bg-main-hover" >
						完成
					</view>
					<view @click="deleteVidieo(index)" class="flex-1 font flex align-center justify-center h-100 bg-white" hover-class="bg-hover-light">
						删除
					</view>
				</view>
			</view>
	
			<!-- 点击添加新章节后的界面end -->
		<view class="f-divider"></view>
		</view>
		<view @click="addChapter" v-if="showAddChapterBtn" class="flex bg-main align-center justify-center font text-white" style="height: 100rpx;">
			<text class="iconfont iconjia mr-1"></text>
			<text >添加新章节</text>
		</view>
	</view>
</template>

<script>
	import fromItem from "@/components/common/FromItem.vue"
	import bigButton from '@/components/common/BigButton.vue';
	import VodUploader from '@/common/vod-wx-sdk-v2.js';
	export default {
		
		data() {
			return {
				id: 0,
				list: []
			}
		},
		computed: {
			showAddChapterBtn() {
				// 如大于0则处于编辑状态
				return this.list.filter(item => item.isEdit).length > 0 ? false : true
			}
		},
		methods: {
			submitVidieo(item) {
				if(!item.video) {
					return uni.showToast({
						title: "视频不能为空",
						icon: "none"
					})}
				if(!item.title) {
					return uni.showToast({
						title: "标题不能为空",
						icon: "none"
					})}
				
				let url = item.id ? '/video_detail/' + item.id : '/video_detail'
				
				let msg = item.id ? '修改' : '创建'
				this.$H.post(url, {
					title: item.title,
					url: item.video,
					video_id: this.id,
					desc: item.desc
				}, {token: true}).then(res => {
					item.isEdit = false
					uni.showToast({
						title:  msg + '成功',
						icon: 'none'
					})
				}).catch(reson => {
					
				})
				item.isEdit = false
				uni.showToast({
					title: '添加成功',
					icon: 'none'
				})
			},
			deleteVidieo(item) {
				uni.showModal({
					title: '提示',
					content: "是否要删除该视频?",
					success: res => {
					        if (res.confirm) {
								this.$H.post('/video_detail/destroy', {
									id: item.id
								}, {
									token: true
								}).then(res=> {
									this.getData()
									uni.showToast({
										title: '删除成功',
										icon: 'none'
									})
								})
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
				})
			},
			addChapter() {
				this.list.push(
				{
				video: "",
				title: "",
				desc: "",
				isEdit: true
				})
			},
			// 生成唯一ID
			genID(length){
			    return Number(Math.random().toString().substr(3,length) + Date.now()).toString(36);
			},
			// 章节添加新视频
			uploadVideo(item) {
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success: res => {
					// #ifdef H5
					let getSignature = (callback) => {
						return this.$H.post('/vod/sign',{},{
							token:true
						}).then(res=>{
							return res
						})
						
					}
					// #endif
					 // #ifndef H5
					let getSignature = (callback) => {
						this.$H.post('/vod/sign',{},{
							token:true
						}).then(res=>{
							callback(res);
						})
					}
					// #endif
					// 生成唯一名称
					let mediaName = this.genID(12)
					uni.showLoading({
						title: '上传中...'
					})
					// #ifdef H5
					const tcVod = new TcVod.default({
					  getSignature: getSignature
					})
					const uploader = tcVod.upload({
					  mediaFile: res.tempFile,
					})
					uploader.on('media_progress',(info)=> {
					  console.log(info.percent) // 进度
					})
					uploader.done().then((doneResult)=>{
						// 上传后的视频链接
						item.video =  doneResult.video.url
						uni.hideLoading()
						uni.showToast({
							title:'上传成功',
							icon:'none'
						})
					}).catch((err)=>{
						console.dir(err)
						uni.hideLoading()
						uni.showToast({
							title: '上传失败',
							icon: 'none'
						});
					})
					// #endif
				    // #ifndef H5
						VodUploader.start({
							mediaFile: res, 
							getSignature: getSignature,
							mediaName: mediaName,
							success: (result)=>{
								console.log('success');
								console.log(result);
							},
							error:(result)=> {
								console.log(result);
								uni.showModal({
									title: '上传失败',
									content: JSON.stringify(result),
									showCancel: false
								});
							},
							progress:(result)=> {
								console.log('progress');
								console.log(result);
							},
							finish: (result)=>{
								// 上传后视频链接
								item.video = result.videoUrl
								uni.hideLoading()
							}
						});
					// #endif
					}
				})
			},
			openEdit(item) {
				console.log(item)
				item.isEdit = true

			},
			getData(){
				this.$H.get(`/video_detail/${this.id}`).then(res => {
					this.list = res.map( item => {
						item.isEdit = false
						item.video = item.url
						return item
					})
				})
			}
		},
		components: {
			fromItem,
			bigButton
		},
		onLoad(e){
			if (!e.id) {
				uni.navigateBack({
					delta: 1
				})
				return uni.showToast({
					title: '非法参数',
					icon: 'none'
				})
			}
			
			this.id = e.id
			this.getData()
		}
	}
</script>

<style>

</style>
