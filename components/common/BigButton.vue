<template>
	<view class="mt-2">
		<view class="py-3 mx-3 text-center bg-main rounded-circle text-white font" 
		hover-class="bg-main-hover"
		@click="$emit('click')">
			<slot></slot>
		</view>
	</view>
</template>

<script>
export default {
	methods:{
			
	},
}
</script>

<style>
</style>
