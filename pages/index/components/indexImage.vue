<template>
	<view class="main">
		
		<image class="act-img" :src="IndexImage[0].ADR_ImgUrl"></image>
		<image class="act-img" :src="IndexImage[1].ADR_ImgUrl" @click="toActivity"></image>
		<view class="hot">
			<image class="act-hot" src="../../../static/image/index_activity.png"></image>
			<view class="title">热门产品</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		props:['IndexImage'],
		data() {
			return {
				
			};
		},
		methods:{
			toActivity(){
				uni.navigateTo({
					url:'/pages/activity/dance/index'
				})
			}
		}
	}
</script>

<style lang="less">
.main{
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	
	.act-img{
		width: 690rpx;
		height: 150rpx;
		margin-top: 10rpx;
	}
	
	.hot{
		width: 400rpx;
		height: 50rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		.act-hot{
			width: 336rpx;
			height: 25rpx;
			position: relative;
			top: 40rpx;
		}
		.title{
			width: 125rpx;
			height: 40rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 30rpx;
			font-weight: bold;
			position: relative;
			top: 10rpx;
		}
	}
	
}
</style>
