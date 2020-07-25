<template>
	<view class="main">
		<view class="top">
			<view class="navbar">
				<u-icon name="arrow-left" size="42" color="#edeef5"></u-icon>
				<text class="title">我的补贴</text>
			</view>
			
			<view class="amount">
				<text class="title">可用补贴数(份)</text>
				<text>4953.5</text>
			</view>
		</view>
		
		<view class="content">
			<u-icon name="red-packet"></u-icon>
			<text>我的补贴</text>
		</view>
		
		<view class="bottom" v-for="(item,index) in listData" :key="index">
			<view class="cont">
				<view class="left">
					<text class="title">{{item.LP_Type}}</text>
					<text class="time">{{item.createTime}}</text>
				</view>
				<view class="right">{{item.LP_Event}}{{item.LP_Amount}}</view>
			</view>
		</view>
		<u-loadmore :status="status" />	
	</view>
</template>

<script>
import {request} from '@/api/request.js'
	export default {
		data() {
			return {
				status:'loadmore',
				user_id:'',
				Index:1,
				listData:[]
			};
		},
		onLoad(parameter){
			this.user_id = parameter.user_id
			this.getIntegralListData()
		},
		onReachBottom() {
			
			setTimeout(() => {
				this.list += 10;
				if(this.page >= 3) this.status = 'nomore';
				else this.status = 'loading';
			}, 2000)
		},
		methods:{
			getIntegralListData(){
				request('API_GetList_LogsUserProfit',{user_id:this.user_id,LP_Type:0,AmountType:'Integral',pageSize:15,index:this.Index}).then(res=>{
					this.listData = res
				})
			}
		}
	}
</script>

<style lang="less">
.main{
	width: 100%;
	display: flex;
	//flex-direction: column;
	flex-wrap: wrap;
	justify-content: center;
	align-items: center;
	.top{
		width: 100%;
		height: 340rpx;
		background-color: #A16BFE;
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
