<template>
	<view class="main">
		<view class="top-navigation">
			<view class="left-cont">
				<text>返回</text>
			</view>
			<text>赣州广场舞队</text>
		</view>
		
		<view class="top-image-box">
			<image :src="TeamDetails.ImgUrl"></image>
			<view class="team-description">
				<text class="team-name">{{TeamDetails.BusinessName}}</text>
				
				<view class="team-details">{{content}}</view>	
			</view>
		</view>
		
		<view class="amount-box">
			<view class="left-amount-box">
				<view class="content-box">
					<view class="top" style="color: #FB5C69;">
						1233
						<text>次</text>
					</view>
					<text class="bottom">打赏次数</text>
				</view>
			</view>
			<view class="right-rank-box">
				<view class="content-box">
					<view class="top">
						12
						<text>名</text>
					</view>
					<text class="bottom">团队排名</text>
				</view>
			</view>
		</view>
	
		<view class="teamdetails-box">
			<view class="TeamDetails-middle">
				<view class="select-box">
					<view class="left-personal" style="border-right: 1rpx solid #f1f1f1;">
						<view class="content" @click="cur = 0" :class="cur==0 ? 'unselect':''">
							参数队员
						</view>
					</view>
					<view class="right-team">
						<view class="content" @click="cur = 1" :class="cur==1 ? 'unselect':''">
							团队展示
						</view>
					</view>
				</view>
			
				<view class="top-three-box">
					<view class="title">
						选手巅峰榜
					</view>
					<view class="middle-content">
						
					</view>
				</view>
			</view>			
		</view>
	</view>
</template>

<script>
import {request} from '@/api/request.js';
	export default {
		data() {
			return {
				BusinessID:'',
				//团队详情数据
				TeamDetails:[],
				cur:0,
				content: `山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨,山不在高，有仙则名。水不在深，有龙则灵。斯是陋室，惟吾德馨`
			};
		},
		onLoad(e) {
			this.BusinessID = e.BusinessID
			
			this.getTeamDetails()
		},
		methods:{
			getTeamDetails(){
				request('API_GetInfo_BusinessSearch',{BusinessID:this.BusinessID,Longitude:114,Latitude:25}).then(res=>{
					this.TeamDetails = res
				})
			}
		}
	}
</script>

<style lang="less">
.main{
	.top-navigation{
		width: 100%;
		height: 150rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		z-index: 199;
		
		.left-cont{
			width: 100rpx;
			height: 35rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 36rpx;
			color: #FFFFFF;
			position: absolute;
			left: 40rpx;
		}
		text{
			font-size: 36rpx;
			font-family: Adobe Heiti Std;
			font-weight: normal;
			color: #FFFFFF;
		}
	}

	.top-image-box{
		width: 100%;
		height: 750rpx;
		position: relative;
		
		image{
			width: 100%;
			height: 750rpx;
		}
		
		.team-description{
			width: 100%;
			height: 170rpx;
			position: absolute;
			bottom: 0;
			background-color: rgba(0,0,0,0.3);
			
			.team-name{
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: 600;
				color: #FFFFFF;
				line-height: 38rpx;
				position: relative;
				left: 30rpx;
				top: 20rpx;
			}
			
			.team-details{
				width: 690rpx;
				height: 60rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				position: relative;
				left: 30rpx;
				top: 25rpx;
				overflow:hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}
	
	.amount-box{
		width: 100%;
		height: 130rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		
		.left-amount-box,.right-rank-box{
			width: 375rpx;
			height: 130rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			
			.content-box{
				width: 155rpx;
				height: 100rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-around;
				
				.top{
					height: 40rpx;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 42rpx;
					font-family: PingFang SC;
					font-weight: 600;
					color: #000000;
					
					text{
						font-size: 32rpx;
					}
				}
				
				.bottom{		
					font-size: 24rpx;
					font-family: Adobe Heiti Std;
					font-weight: normal;
					color: #808080;
				}
			}
		}
	}
	
	.teamdetails-box{
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #F95C69;
		
		.TeamDetails-middle{
			width: 690rpx;
			margin: 30rpx 25rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;		
			border-radius: 20rpx;
			background-color: #FFFFFF;
			
			.select-box{
				width: 100%;
				height: 80rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				
				.left-personal,.right-team{
					width: 315rpx;
					height: 70%;
					display: flex;
					justify-content: center;
					align-items: center;	
					
					.content{
						width: 240rpx;
						height: 60rpx;
						display: flex;
						justify-content: center;
						align-items: center;	
						font-size: 30rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #000000;
						line-height: 38rpx;
					}
					
					.unselect{
						border-bottom: 2rpx solid #F75B68;
					}			
				}
			}
		
			.top-three-box{
				width: 690rpx;
				height: 370rpx;
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;
				
				.title{
					width: 100%;
					height: 70rpx;
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #000000;
					line-height: 38rpx;
				}
				
				.middle-content{
					width: 100%;
					height: 300rpx;
				}
			}
		}
	
	}
}
</style>
