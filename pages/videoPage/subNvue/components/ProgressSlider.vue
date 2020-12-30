<template>
	<view 
	class=" flex align-center position-relative" 
	style="height: 44px;"
	@touchstart= "touchstart"
	@touchmove= "touchmove"
	@touchend= "touchend"
	@touchcancel="touchcancel">
		<view class="flex-1  rounded" style="height: 3px;background-color: rgba(255,255,255,0.5);">
			<view class="bg-main" style="height: 3px;" :style=" 'width:' + activeStyle +'px;'"></view>
			<view class="position-absolute rounded-circle bg-main-hover" style="width: 15px;height: 15px; top: -6px; ;":style=" 'left:' + activeDotStyle +'px;'">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		inject: ['v'],
		props: {
			currentTime: {
				type: Number,
				default: 0
			},
			duration: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				
				activeWidth:0,
				// 进度条长度
				progressWidth: 0,
				// 拖拽状态
				moveStatus: false
				
			}
		},
		created () {
			this.progressWidth =  this.v.windowWidth - 88 - 80 - 15
			this.active()
		},
		methods: {
			// 进度条当前长度
			active() {
				this.activeWidth = this.duration === 0 ? 0 : (this.currentTime / this.duration) * this.progressWidth
			},
			touchstart(e){
				if(this.duration === 0) return
				this.moveStatus = true
				this.activeWidth = e.changedTouches[0].screenX - 44 
			},
			touchmove(e){
				if(this.duration === 0) return
				// 拖拽长度
				let d = e.changedTouches[0].screenX - 44
				if(d <= 0 ) {
					this.activeWidth = 0
				}else if ( d >= this.progressWidth) {
					this.activeWidth = this.progressWidth
				}else {
					this.activeWidth = d
				}
				this.$emit('update', this.currentMoveTime)
			},
			touchend(e) {
				if(this.duration === 0) return
				this.moveStatus = false
				this.$emit('change', this.currentMoveTime)
			},
			touchcancel() {
				this,touchend(e)
			}
		},
		watch: {
			currentTime() {
				if(!this.moveStatus) {
					this.active()
				}
			},
		},
		computed: {
			activeStyle() {
				return this.activeWidth
			},
			activeDotStyle() {
				return this.activeWidth
			},
			// 拖拽的时间
			currentMoveTime() {
				return this.progressWidth == 0 ? 0 : (this.activeWidth / this.progressWidth) * this.duration
			}
		}
	}
</script>

<style>
</style>
