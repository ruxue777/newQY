<template>
	<view class="main">
		<view class="top">
			<u-navbar  title="我的账单"></u-navbar>
			<u-dropdown active-color="#ff9900">
				<u-dropdown-item v-model="value1" title="账户类别" :options="options1" @change="change"></u-dropdown-item>
				<u-dropdown-item v-model="value2" title="支付时间" :options="options2"></u-dropdown-item>
				<u-dropdown-item v-model="value3" title="操作类型" :options="options3"></u-dropdown-item>
			</u-dropdown>
		</view>		
		
		<view class="middle">			
			<view class="bill-content" v-for="(item,index) in BillDetails" :key="index">
				<view class="top-title">
					<text class="left-account-name">{{item.LP_AmountType}}</text>
					<text class="right-account-time">{{item.createTime}}</text>
				</view>
				<view class="middle-cont">
					<p>
						<text class="left">{{item.LP_Desc}}</text>
						<text class="middle-amount">{{item.LP_Event}}</text>
						<text class="right">{{item.LP_Amount}}</text>
					</p>
				</view>
				<view class="bottom-type">
					<text>{{item.LP_Type}}</text>
				</view>
			</view>
		</view>
		<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus"></u-loadmore>
	</view>
</template>

<script>
import {request} from '@/api/request.js'	
	export default {
		data() {
			return {
				user_id:'',
				value1: 1,
				value2: 1,
				value3: 1,
				options1: [{
						label: '补贴权益',
						value: 'Integral',
					},
					{
						label: '商家账户',
						value: 'Credit',
					},
					{
						label: '补贴账户',
						value: 'Recharge',
					},
					{
						label: '津贴账户',
						value: 'Profit',
					}
				],
				options2:[
					{
						label: '最近',
						value: 1,
					},
				],
				options3:[
					{
						label: '所有',
						value: 1,
					},
				],
				loadStatus: 'loadmore',
				AmountType:'Integral',
				Index:1,
				BillDetails:[]
			};
		},
		onLoad(e) {
			this.user_id = e.user_id
			this.getBillDetails()
		},
		onReachBottom() {
			if(this.BillDetails.length<this.Index*10){
				this.loadStatus = 'nomore';
				return;
			}else{
				this.Index++;
				this.loadStatus = 'loading';
				// 模拟数据加载效果
				setTimeout(() => {
					this.getBillDetails();
					this.loadStatus = 'loadmore';
				}, 1000);
			}
		},
		methods:{
			getBillDetails(callBack){
				request('API_GetList_LogsUserProfit',{user_id:this.user_id,LP_Type:0,AmountType:this.AmountType,pageSize:10,index:this.Index}).then(res=>{
					if(res.length<10){
						this.loadStatus = 'nomore'
					}
					this.BillDetails = [...this.BillDetails,...res]
					callBack && callBack()
				})
			},
			change(val){
				this.AmountType = val
				this.Index = 1
				this.BillDetails = []
				this.getBillDetails()
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
		justify-content: center;
		align-items: center;
		background-color: rgb(240, 240, 240);
		padding: 20rpx;
		
		.bill-content{
			width: 670rpx;
			height: 260rpx;
			margin-bottom: 15rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			background-color: #FFFFFF;
			border-radius: 20rpx;
			
			.top-title{
				width: 100%;
				height: 50rpx;
				padding-left: 20rpx;
				padding-right: 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid #d9d9d9;
				
				.left-account-name{
					font-size: 30rpx;
				}
				.right-account-time{
					font-size: 26rpx;
					color: #999999;
				}
			}
			
			.middle-cont{
				width: 100%;
				height: 170rpx;
				p{
					width: 100%;
					height: 170rpx;
					display: flex;
					justify-content: space-around;
					align-items: center;
					
					.left,.middle-amount{
						font-size: 30rpx;
						color: #929292;
					}
					
					.right{
						font-size: 36rpx;
						font-weight: bold;
					}
				}
			}
			
			.bottom-type{
				width: 100%;
				height: 40rpx;
				padding-left: 20rpx;
				font-size: 26rpx;
				color: #999999;
			}
		}
	}
}
</style>
