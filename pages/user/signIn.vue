<template>
	<view class="main">
		
		<view class="head-portrait">
			<image src="../../static/image/morn.png" class="morn-img"></image>
		
			<view class="title">
				<view class="h1">您好,欢迎来到虔易</view>
				<view class="h2">WeLcome</view>
			</view>
			
			<view class="userInfo">
				<view class="cellphone">
					<u-icon name="phone-fill"  size="32"></u-icon>
					<text>手机号</text>
					<input v-model="mobile" placeholder="请输入手机号" />
				</view>
				
				<view class="psd">
					<u-icon name="lock-fill"  size="32"></u-icon>
					<text>密码</text>
					<input v-model="password" placeholder="请输入手机号" />
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				mobile:'',
				password:''
			};
		},
		onLoad() {
			
		},
		methods:{
			
		}
	}
</script>

<style lang="less">
.main{
	width: 100%;
	height: 1500rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	
	.head-portrait{
		width: 710rpx;
		height: 1200rpx;
		display: flex;
		align-items: center;
		flex-direction: column;
		
		.morn-img{
			width: 320rpx;
			height: 320rpx;
		}
		
		.title{
			width: 600rpx;
			height: 150rpx;
			display: flex;
			align-items: center;
			flex-direction: column;
			
			.h1{
				font-size: 46rpx;
				letter-spacing: 3rpx;
				font-weight: bold;
			}
			
			.h2{
				font-size: 26rpx;
				letter-spacing: 2rpx;
				color: #999999;
			}
		}
		
		.userInfo{
			width: 600rpx;
			height: 200rpx;
			display: flex;
			align-items: center;
			flex-direction: column;
			
			.cellphone{
				width: 560rpx;	
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: flex-start;
			}
			
			.psd{
				width: 560rpx;
				height: 100rpx;
				display: flex;
				align-items: center;
				justify-content: flex-start;
			}
		}
	}
}
</style>
