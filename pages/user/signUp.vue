<template>
	<view class="main">
		<view class="arrow-leftward" @click="back">
			<u-icon name="arrow-leftward" size="46"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad() {
			
		},
		methods:{
			back(){
				uni.navigateBack({})
			}
		}
	}
</script>

<style lang="less">
.main{
	width: 100%;
	height: 1200rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	
	.arrow-leftward{
		position: absolute;
		top: 65rpx;
		left: 50rpx;
	}
}
</style>
