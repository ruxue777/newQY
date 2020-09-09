<template>
	<view class="main">
		<u-navbar :title="BP_Name" :background="background" title-width="350" back-icon-color="#ffffff" title-color="#ffffff"></u-navbar>
		<view class="top-team-name">《最美广场舞队》成员</view>
		<view class="personal-box">
			<view class="personal-details-box">
				<text class="player-profile">选手资料:</text>
				
				<view class="player-profile-middle">
					<text class="personal-name">{{BP_Name}}</text>
					<image :src="PersonalDetails.BP_ImgUrl"></image>
					<view class="personal-desc">
						显示选手介绍分地区一年四季中的第四季，由于天气转冷(赤道地区除外)，在很多地区都意味着沉寂和冷清。
					</view>
				</view>
			
				<view class="player-ranking">
					<view class="ranking-item">
						<view class="ranking-item-content">
							<view class="top-text">
								<text class="amount">21</text><text>名</text>
							</view>
							<text class="bottom-text">团队内排名</text>
						</view>
					</view>
					<view class="ranking-item btn">
						<view class="ranking-item-content ">
							<view class="top-text middle">
								<text class="amount" style="color: #FB5C6A;">21</text><text class="frequency" style="color: #FB5C6A;">次</text>
							</view>
							<text class="bottom-text">打赏次数</text>
						</view>
					</view>
					<view class="ranking-item">
						<view class="ranking-item-content">
							<view class="top-text">
								<text class="amount">21</text><text>名</text>
							</view>
							<text class="bottom-text">选手排名</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="personal-display-box">
				<text class="player-profile">个人展示:</text>
				
				<view class="personal-display-H5">
					<u-parse :html="PersonalDetails.BP_Content"></u-parse>
				</view>
			</view>
		</view>
			
		<view class="bottom-navigation-box">
			<view class="index" @click="back">
				<image src="../../../static/image/toIndex.png"></image>
				<text>投票首页</text>
			</view>
			<view class="share-it">
				<image src="../../../static/image/share_it.png"></image>
				<text>分享(为ta加油)</text>
			</view>
			<view class="reward-box">
				<view class="button">
					<u-button shape="circle" ripple="true" ripple-bg-color="#dcdcdc" :custom-style="customStyle" @click="show = true">马上打赏</u-button>
				</view>
			</view>
		</view>	
	
	<!-- 反馈组件 -->
	<u-popup v-model="show" mode="center" border-radius="10">
		<view class="popup-middle">
			<view class="pop-top">
				<view class="head-img">
					<image src="../../../static/image/img4.jpg"></image>
				</view>
			</view>
			
			<view class="pop-middle">
				
			</view>
			
			<view class="pop-bottom">
				
			</view>
		</view>
	</u-popup>
	</view>
</template>

<script>
import {request} from '@/api/request.js'	
	export default {
		props:['ProductID','BusinessID','BP_Name','MSS_id'],
		data() {
			return {
				//顶部背景
				background:{
					backgroundColor: '#FB5C6A',
				},
				//按钮样式
				customStyle:{
					backgroundColor:'#FFBA00',
					color:'#000000'
				},
				//弹窗
				show:false,
				//选手详情
				PersonalDetails:[]
			};
		},
		onLoad() {
			this.getPersonalDetails()
		},
		methods:{
			getPersonalDetails(){
				request('API_GetInfo_BusinessProductSearch',{ProductID:this.ProductID,Longitude:114,Latitude:25}).then(res=>{
					this.PersonalDetails = res
				})
			},
			back(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="less">
page{
	background-color: #FB5C69;
}	
.main{
	.top-team-name{
		width: 100%;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #FA868F;
		font-size: 38rpx;
		font-family: Adobe Heiti Std;
		font-weight: normal;
		color: #FFFFFF;
		line-height: 52rpx;
	}
	
	.personal-box{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		.personal-details-box{
			width: 690rpx;
			height: 950rpx;
			background-color: #FFFFFF;			
			border-radius: 20rpx;
			margin-top: 30rpx;
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.player-profile{	
				position: absolute;
				top: 40rpx;
				left: 40rpx;
				font-size: 34rpx;
				font-family: Adobe Heiti Std;
				font-weight: normal;
				color: #1A1A1A;
			}
			
			.player-profile-middle{
				width: 580rpx;
				height: 680rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: center;
				
				.personal-name{
					font-size: 32rpx;
					font-family: Adobe Heiti Std;
					font-weight: normal;
					color: #333333;
					line-height: 38rpx;
				}
				
				image{
					width: 490rpx;
					height: 490rpx;
				}
				
				.personal-desc{
					width: 580rpx;
					height: 110rpx;	
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 28rpx;
					font-family: Adobe Heiti Std;
					font-weight: normal;
					color: #333333;
					line-height: 38rpx;
				}
			}
		
			.player-ranking{
				width: 100%;
				height: 130rpx;
				position: absolute;
				bottom: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				
				.ranking-item{
					width: 100%;
					height: 75%;
					display: flex;
					justify-content: center;
					align-items: center;
					
					.ranking-item-content{
						width: 130rpx;
						height: 110rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						align-items: center;
						
						.top-text{
							.amount{							
								font-size: 50rpx;
								font-family: Adobe Heiti Std;
								font-weight: normal;
								color: #3B3B3B;
							}
							
							.frequency{
								font-size: 24rpx;
								font-family: Adobe Heiti Std;
								font-weight: normal;
								color: #3B3B3B;
							}
						}
						
						.bottom-text{						
							font-size: 24rpx;
							font-family: Adobe Heiti Std;
							font-weight: normal;
							color: #808080;
						}
					}
				}
			
				.btn{
					border-left: 1rpx solid #D8D8D8;
					border-right: 1rpx solid #D8D8D8;
				}
			}
		}
		
		.personal-display-box{
			width: 690rpx;
			background-color: #FFFFFF;
			border-radius: 20rpx;
			margin-top: 30rpx;
			margin-bottom: 120rpx;
			position: relative;
			
			.player-profile{
				position: absolute;
				left: 40rpx;
				top: 35rpx;				
				font-size: 34rpx;
				font-family: Adobe Heiti Std;
				font-weight: normal;
				color: #1A1A1A;	
			}
			
			.personal-display-H5{
				margin-top: 100rpx;
			}
		}
	}
	
	.bottom-navigation-box{
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		border-top: 1rpx solid #e5e5e5;
		
		.index,.share-it{
			width: 175rpx;
			height: 80rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: center;
			
			image{
				width: 50rpx;
				height: 50rpx;
			}
			
			text{
				font-size: 20rpx;
				font-family: PingFang TC;
				font-weight: 400;
				color: #333333;
			}
		}
		
		.reward-box{
			width: 400rpx;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.button{
				width: 335rpx;
				height: 80rpx;
			}
		}
	}

	.popup-middle{
		width: 580rpx;
		height: 830rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		
		
		.pop-top{
			width: 100%;
			height: 325rpx;
			position: relative;
			
			.head-img{
				width: 280rpx;
				height: 280rpx;
				position: absolute;
				top: -140rpx;
				left: 28%;
				border-radius: 50%;
				background-color: #FFFFFF;
				padding: 15rpx;
				z-index: 20202;
				image{
					width: 250rpx;
					height: 250rpx;
					border-radius: 50%;
					z-index: 20202;
				}
			}
		}
		
		.pop-middle{
			width: 540rpx;
			height: 190rpx;
		}
		
		.pop-bottom{
			width: 100%;
			height: 190rpx;
		}
	}
}
</style>
