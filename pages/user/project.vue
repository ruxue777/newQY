<template>
	<view class="main">
		<view class="top-title">
			<u-navbar  title="我的项目"></u-navbar>
		</view>
		
		<view class="middle">
			<view class="project-content" v-for="(item,index) in ProjectDetails" :key="index">
				<view class="top">
					<view class="project-name">
						<u-icon name="chat-fill" color="#fff"></u-icon>
						<text class="name">{{item.BusinessName}}</text>
					</view>
					
					<view class="project-fill">
						<view class="project-fill-top">
							<view>
								<u-icon name="gift" color="#fff"></u-icon>
								<text >收益总金额 (已自动转入总收益)</text>
							</view>
							<view >
								<u-icon name="gift" color="#fff"></u-icon>
								<text>昨日收益</text>
							</view>
						</view>
						<view class="project-fill-bottom">
							<text class="lump-sum">{{item.TotalProfitAmount}}</text>
							<text class="yesterday">{{item.BeforeDayProfitAmount}}</text>
						</view>
					</view>
				</view>
				<view class="bottom">
					<u-icon name="gift" color="#fff"></u-icon>
					<text>会员权益(份)</text>
					<text class="amount">{{item.BonusAmount}}</text>
					<text class="give-away">转赠</text>
				</view>
			</view>
		</view>
	<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" ></u-loadmore>
	</view>
</template>

<script>
import {request} from '@/api/request.js'	
	export default {
		data() {
			return {
				user_id:'',
				Index:1,
				ProjectDetails:[],
				loadStatus: 'loadmore'
			};
		},
		onLoad(e) {
			this.user_id = e.user_id
			this.getProjectDetails()
		},
		onReachBottom() {
			if(this.ProjectDetails.length<this.Index*10){
				this.loadStatus = 'nomore';
				return;
			}else{
				this.Index++;
				this.loadStatus = 'loading';
				// 模拟数据加载效果
				setTimeout(() => {
					this.getProjectDetails();
					this.loadStatus = 'loadmore';
				}, 1000);
			}
		},
		methods:{
			getProjectDetails(callBack){
				request('API_GetList_UserBusinessBonus',{user_id:this.user_id,pageSize:10,index:this.Index}).then(res=>{
					if(res.length<10){
						this.loadStatus = 'nomore'
					}
					
					this.ProjectDetails = [...this.ProjectDetails,...res]
									
					callBack && callBack()
				})
			}
		}
	}
</script>

<style lang="less">
.main{
	.middle{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		
		.project-content{
			width: 100%;
			height: 240rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background-color: #96e4ca;
			margin-top: 20rpx;
			
			.top{
				width: 100%;
				height: 180rpx;
				border-bottom: 1rpx solid #FFFFFF;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				
				.project-name{
					width: 710rpx;
					height: 60rpx;
					display: flex;
					align-items: center;
					font-size: 34rpx;
					color: #FFFFFF;
				}
				
				.project-fill{
					width: 710rpx;
					height: 120rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					
					.project-fill-top{
						width: 710rpx;
						height: 60rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 32rpx;
						color: #FFFFFF;
					}
					
					.project-fill-bottom{
						width: 710rpx;
						height: 60rpx;
						display: flex;
						justify-content: space-between;
						align-items: center;
						font-size: 36rpx;
						color: #FFFFFF;
					}
				}
			}
			.bottom{
				width: 100%;
				height: 60rpx;
				padding-left: 20rpx;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				
				.give-away{
					margin-left: 20rpx;
					color: yellow;
				}
			}
		}
	}
}
</style>
