<template>
	<view class="main">
		<view class="top">
			<view class="navbar">
				<u-icon name="arrow-left" size="42" color="#edeef5" @click="back"></u-icon>
				<text class="title">权益明细</text>
			</view>
			
			<view class="amount">
				<text class="title">权益份额(份)</text>
				<text>{{accoutAmount}}</text>
			</view>
		</view>
		
		<view class="content">
			<u-icon name="star"></u-icon>
			<text>我的权益</text>
		</view>
		
		<view class="bottom" v-for="(item,index) in listData" :key="index">
			<view class="cont">
				<view class="left">
					<text class="title">{{item.LB_Desc}}</text>
					<text class="time">{{item.createTime}}</text>
				</view>
				<view class="right">{{item.LB_Event}}{{item.LB_Amount}}</view>
			</view>
		</view>
		<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus"  />	
	</view>
</template>

<script>
import {request} from '@/api/request.js'
	export default {
		data() {
			return {
				loadStatus: 'loadmore',
				user_id:'',
				accoutAmount:0,
				Index:1,
				listData:[]
			};
		},
		onLoad(parameter){
			this.user_id = parameter.user_id
			this.accoutAmount = parameter.accoutAmount
			this.getBonusListData()
		},
		onReachBottom() {
			if(this.listData.length<this.Index*15){
				this.loadStatus = 'nomore';
				return;
			}else{
				this.Index++;
				this.loadStatus = 'loading';
				// 模拟数据加载效果
				setTimeout(() => {
					this.getBonusListData();
					this.loadStatus = 'loadmore';
				}, 1000);
			}
		},
		methods:{
			getBonusListData(callBack){
				request('API_GetList_LogsUserBonus',{user_id:this.user_id,pageSize:15,index:this.Index}).then(res=>{
					if(res.length<15){
						this.loadStatus = 'nomore'
					}
					this.listData = [...this.listData,...res]
					callBack && callBack()
				})
			},
			back(){
				uni.navigateBack({})
			}
		}
	}
</script>

<style lang="less">
.main{
	.top{
		width: 100%;
		height: 340rpx;
		background-color: #48d5e7;
		display: flex;
		flex-direction: column;
		
		.navbar{
			width: 100%;
			height: 100rpx;
			margin-top: 60rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			u-icon{
				position: absolute;
				left: 35rpx;
				top: 85rpx;
			}
			.title{
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 32rpx;
				font-weight: bold;
				color: #f4f4f5;
				font-family: "Microsoft soft";
			}
		}
		.amount{
			width: 100%;
			height: 130rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			position: relative;
			top: 50rpx;
			.title{
				font-size: 26rpx;
				font-weight: bold;
				color: #f4f4f5;
			}
			text{
				font-size: 32rpx;
				font-weight: bold;
				color: #f4f4f5;
			}
		}
	}
	.content{
		width: 700rpx;
		height: 60rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		position: relative;
		left: 15rpx;
		border-bottom: 1rpx solid #f3f3f4;
	}
	.bottom{
		width: 100%;
		height: 130rpx;
		padding: 10rpx 20rpx;
		.cont{
			width: 100%;
			height: 110rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1rpx solid #f3f3f4;
			.left{
				display: flex;
				flex-direction: column;
				align-items: center;
				.title{
					font-size: 30rpx;
					color: #999999;
				}
				.time{
					font-size: 24rpx;
					color: #999999;
				}
			}
			.right{
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 28rpx;
				color: #999999;
				position: relative;
				top: 15rpx;
			}
		}
	}
}
</style>
