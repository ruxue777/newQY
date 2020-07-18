<template>
	<view class="main">
		<view class="content" >
			<view class="left">
				<image class="left-img" :src="HotListData[0].ADR_ImgUrl"></image>
			</view>
			
			<view class="right">
				<view class="top">
					<image class="top-img" :src="HotListData[1].ADR_ImgUrl"></image>
				</view>
				
				<view class="bottom">
					<view class="inside-left">
						<image class="inside-left-img" :src="HotListData[2].ADR_ImgUrl"></image>
					</view>
					<view class="inside-right">
						<image class="inside-right-img" :src="HotListData[3].ADR_ImgUrl"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['HotListData'],
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less" scoped>
.main{
	width: 100%;
	height: 400rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	
	.content{
		width: 710rpx;
		height: 380rpx;
		border-radius: 15rpx;
		padding: 20rpx;
		background-color: #fffffd;
		display: flex;
		align-items: center;
		justify-content: space-between;
		
		.left{
			width: 320rpx;
			height: 340rpx;
			background-color: pink;
			border-radius: 15rpx;
			
			.left-img{
				width: 320rpx;
				height: 340rpx;
				border-radius: 15rpx;
			}
		}
		
		.right{
			width: 320rpx;
			height: 340rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			
			.top{
				width: 320rpx;
				height: 160rpx;
				background-color: pink;
				border-radius: 15rpx;
				
				.top-img{
					width: 320rpx;
					height: 160rpx;
					border-radius: 15rpx;
				}
			}
			
			.bottom{
				width: 320rpx;
				height: 160rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				
				.inside-left{
					width: 155rpx;
					height: 160rpx;
					background-color: #c3e6ee;
					border-radius: 15rpx;
					
					.inside-left-img{
						width: 155rpx;
						height: 160rpx;
						border-radius: 15rpx;
					}
				}
				
				.inside-right{
					width: 155rpx;
					height: 160rpx;
					border-radius: 15rpx;
					
					.inside-right-img{
						width: 155rpx;
						height: 160rpx;
						border-radius: 15rpx;
					}
				}
			}
		}
	}
}
</style>
