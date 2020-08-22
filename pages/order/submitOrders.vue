<template>
	<view class="main">
		<view class="top-content">
			<view class="middle">
				
				<view class="shop-name"><text>心理店铺</text></view>
				
				<view class="goods-content">
					<image src="../../static/image/img4.jpg"></image>
					<view class="goods-datails">
						<text class="top-goods-name">超级无敌棒棒糖！！！</text>
						<view class="good-price">
							<text class="commodity-price">￥123123</text>
							<text class="original-price">￥31222</text>
						</view>
					</view>
				</view>
				
				<view class="goods-amount">
					<text class="left-title">购买份数</text>
					<u-number-box v-model="amount" @change="valChange" :min="minAmount"></u-number-box>
				</view>
				
				<view class="goods-price">
					<text class="left-title">合计金额</text>
					<text class="payment-amount">￥0.10</text>
				</view>
				
				<view class="subsidy-switch">
					<text class="left-title">补贴抵扣:<text class="tips">可使用0.05补贴权益抵扣0.05元</text></text>
					<u-switch v-model="subSwitch" active-color="#19be6b" size="40"></u-switch>
				</view>
				
				<view class="goods-list">
					<text>商品列表</text>
					<view class="list">
						<view class="giveaway-name">大鸡蛋</view>
						<view class="giveaway-list">
							<text>每月可领1个</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="bottom-content">			
			<view class="radio">
				<text>领取方式</text>
				
				<view class="radio-cont">
					<u-radio-group v-model="value" @change="radioGroupChange" active-color="#ff9900">
						<u-radio @change="radioChange" v-for="(item, index) in list" :key="index" :name="item.name" :disabled="item.disabled">
							{{item.name}}		
						</u-radio>			
					</u-radio-group>
				</view>
				
			</view>
			<view class="middle" v-if="value === '到店自取'">
				<text class="top-title">仅可在以下地点核销</text>
			</view>
			<view class="middle" v-else>
				<text class="top-title">请填收货地址</text>
			</view>
		</view>
		
		<view class="subOrder">
			<view class="bottom-goods-price">
				<text class="price">
					实付: <text class="amount">￥100.0</text>
				</text>
			</view>
			
			<view class="button">
				<u-button type="warning" shape="circle" ripple="true">提交订单</u-button>
			</view>
		</view>
		
		<!-- 反馈组件 -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import {request} from '@/api/request.js'	
	export default {
		data() {
			return {
				//当前数量
				amount:1,
				//最小数量
				minAmount:1,
				//抵扣开关
				subSwitch: true,
				list: [
					{
						name: '到店自取',
						disabled: false
					},
					{
						name: '快递(需自费)',
						disabled: false
					}
				],
				value: '到店自取',
				//商品详情数据
				GoodsDatails:[]
			};
		},
		onLoad(e) {
			this.GoodsDatails = JSON.parse(decodeURIComponent(e.GoodsDatails));
		},
		methods:{
			radioGroupChange(e) {
			},
			radioChange(e) {
				console.log(e);
			},
			valChange(){
				if(this.amount<1){
					this.$refs.uToast.show({
						title: `数量不能小于1`,
						type: 'error',
					})
				}
			}
		}
	}
</script>

<style lang="less">
.main{
	display: flex;
	flex-direction: column;
	align-items: center;
	
	.top-content{
		width: 100%;
		height: 720rpx;
		border-bottom: 10rpx solid #e4e4e4;
		display: flex;
		justify-content: center;
		align-items: center;
		
		.middle{
			width: 690rpx;
			height: 700rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			
			.shop-name{
				width: 100%;
				height: 80rpx;
				border-bottom: 2rpx solid #e4e4e4;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				
				text{
					font-size:34rpx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(47,49,53,1);
					letter-spacing:2rpx
				}
			}
			
			.goods-content{
				width: 100%;
				height: 200rpx;
				border-bottom: 2rpx solid #e4e4e4;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				
				image{
					width: 170rpx;
					height: 170rpx;
					border-radius: 10rpx;
				}
				
				.goods-datails{
					width: 500rpx;
					height: 170rpx;
					position: relative;
					left: 20rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					
					.good-price{
						width: 300rpx;
						height: 30rpx;
						display: flex;
						align-items: center;
						justify-content: flex-start;
						
						.commodity-price{
							font-size:36rpx;
							font-family:PingFang SC;
							font-weight:500;
							color:rgba(245,51,34,1);
						}
						
						.original-price{
							position: relative;
							top: 5rpx;
							left: 10rpx;
							font-size:24rpx;
							font-family:PingFang SC;
							font-weight:500;
							text-decoration:line-through;
							color:rgba(153,153,153,1);
						}
					}
				}
			}
			
			.goods-amount{
				width: 100%;
				height: 100rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 2rpx solid #e4e4e4;
				font-size: 32rpx;
			}
			
			.goods-price{
				width: 100%;
				height: 100rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 2rpx solid #e4e4e4;
				font-size: 32rpx;
				
				.payment-amount{
					font-size: 34rpx;
					font-family:PingFang SC;
					font-weight:500;
					color: #f53322;
					letter-spacing:1rpx
				}
			}
			
			.subsidy-switch{
				width: 100%;
				height: 100rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 2rpx solid #e4e4e4;
				font-size: 32rpx;
				
				.tips{
					margin-left: 10rpx;
					font-size: 26rpx;
					color: #999;
				}
			}
	
			.goods-list{
				width: 100%;
				height: 100rpx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				
				.list{
					width: 450rpx;
					height: 80rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					color: #999;
					position: relative;
					top: 20rpx;
					left: 30rpx;
					
				}
			}
		}
	}
	
	.bottom-content{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		.radio{
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			
			.radio-cont{
				width: 500rpx;
				height: 60rpx;
				margin-top: 5rpx;
			}
		}
		
		.middle{
			width: 690rpx;
			
			.top-title{
				font-size: 28rpx;
				color: #FF9900;
			}
		}
	}
	
	.subOrder{
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position:fixed;
		bottom:0;
		z-index: 123;
		box-shadow:inset 0px 15px 10px -15px #dadada; 
		
		.bottom-goods-price{
			width: 300rpx;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.price{
				font-size: 32rpx;
				font-weight: bold;
				
				.amount{
					margin-left: 20rpx;
					color: red;
				}
			}
		}
		
		.button{
			width: 260rpx;
			height: 100%;
			display: flex;
			align-items: center;
			
			u-button{
				margin-left: 30rpx;
			}
		}
	}
}
</style>
