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
					<view @click="deleteVidieo(index)" class="flex-1 font flex align-center justify-center h-100" hover-class="bg-hover-light">
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
	export default {
		
		data() {
			return {
				list: [
					{
					video: "",
					title: "第一季 啊啊",
					desc: "xxxx",
					isEdit: false
					}
				]
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
				item.isEdit = false
			},
			deleteVidieo(index) {
				uni.showModal({
					title: '提示',
					content: "是否要删除该视频?",
					success: res => {
					        if (res.confirm) {
					           this.list.splice(index, 1)
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
			// 章节添加新视频
			uploadVideo(item) {
				uni.chooseVideo({
					count: 1,
					sourceType: ['camera', 'album'],
					success: res => {
						item.video = res.tempFilePath
						console.log(res.tempFilePath)
					}
				})
			},
			openEdit(item) {
				item.isEdit = true
			}
		},
		components: {
			fromItem,
			bigButton
		}
	}
</script>

<style>

</style>
