<template>
	<view class="main">
		<view class="top-title">
			店铺介绍
		</view>
		<view class="u-content">
			<u-parse :html="MerchantData.BusinessContent"></u-parse>
		</view>	
	</view>
</template>

<script>
	export default {
		props:['MerchantData'],
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less">
.main{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	.top-title{
		width: 100%;
		height: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: red;
		font-size: 30rpx;
		font-weight: bold;
	}
	
	.u-content {
		padding: 24rpx;
		font-size: 32rpx;
		line-height: 1.6;
	}
}
</style>
