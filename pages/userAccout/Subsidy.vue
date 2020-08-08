<template>
	<view class="main">
		<view class="top-background"></view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				//账户数据
				LogsUserProfit:[],
				//账户金额
				ProfitAmount:0.00,
				BonusAmount:0.00,
				//页面数
				Index:1
			};
		},
		onLoad(options)  
		{
		
		},
		onReachBottom() {
		
		},
		methods:
		{
			
		}	
	}
</script>

<style lang="scss" scoped>
page{
	width: 100%;
	height: 100%;
	background-color: #f5f5f5;
}
.main{
	.top-background{
		width: 100%;
		height: 400rpx;
		background-color: RGBA(255, 229, 14, 1);
	}
}
</style>
