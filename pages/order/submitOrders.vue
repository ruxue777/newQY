<template>
	<view class="main">
		<view class="top-content">
			<view class="middle">
				
				<view class="shop-name"><text>{{GoodsDatails.BusinessName}}</text></view>
				
				<view class="goods-content">
					<image :src="GoodsDatails.BP_ImgUrl"></image>
					<view class="goods-datails">
						<text class="top-goods-name">{{GoodsDatails.BP_Name}}</text>
						<view class="good-price">
							<text class="commodity-price">￥{{GoodsDatails.BP_Amount}}</text>
							<text class="original-price">￥{{GoodsDatails.BP_MarketAmount}}</text>
						</view>
					</view>
				</view>
				
				<view class="goods-amount">
					<text class="left-title">购买份数</text>					
					<u-number-box v-model="amount" @change="valChange" :min="minAmount"></u-number-box>
				</view>
				
				<view class="goods-price">
					<text class="left-title">合计金额</text>
					<text class="payment-amount">￥{{payment_Amount}}</text>
				</view>
				
				<view class="subsidy-switch">
					<text class="left-title">补贴抵扣:<text class="tips">{{subTips}}</text></text>
					<text class="subAmount" v-if="subSwitch == true && isSub == false">x{{subAmount}}</text>
					<u-switch v-model="subSwitch" active-color="#19be6b" size="40" :disabled="isSub"></u-switch>
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
				
				<view class="write-off" v-for="(item,index) in GoodsWriteOffData" :key="index">
					<view class="write-off-content">
						<view class="left-img">
							<image :src="item.ImgUrl"></image>
						</view>
						
						<view class="shop-data">
							<view class="top">
								<text class="shop-name">{{item.BusinessName}}</text>
								<text class="distance">{{(item.Distance*1).toFixed(2)}}km</text>
							</view>
							
							<view class="bottom">
								<text class="shop-location">{{item.Address}}</text>
								<text class="business-hours">营业时间: {{item.BusinessTime}}</text>
							</view>
						</view>
					</view>
				</view>
				
				<view class="filling"></view>
			</view>
			
			<view class="middle" v-else>
				<text class="top-title">请填收货地址</text>
				
				<view class="post">
					<view class="contact-person">
						<text>联系人:</text>
						<input placeholder="请输入联系人姓名"/>
					</view>
					<view class="call">
						<text>电话:</text>
						<input placeholder="请输入联系人电话"/>
					</view>
					<view class="post-location">
						<text>地址:</text>
						<input placeholder="请输入联系人地址"/>
					</view>
				</view>
			</view>
		</view>
		
		<view class="subOrder">
			<view class="bottom-goods-price">
				<text class="price">
					实付: <text class="amount">￥{{payment_Amount}}</text>
				</text>
			</view>
			
			<view class="button">
				<u-button type="warning" shape="circle" ripple="true" @click="show = true">提交订单</u-button>
			</view>
		</view>
		
		<!-- 反馈组件 -->
		<u-toast ref="uToast" />
		<u-popup v-model="show" mode="bottom" border-radius="15" closeable="true" close-icon-pos="top-left">
			<view class="popup-content">
				<view class="top">
					<text class="top-title">付款详情</text>
					<text class="pay-amount">实付:<text class="btn">￥100.00</text> </text>
				</view>
				
				<view class="middle">
					<view class="subsidy"></view>
					<view class="payment-method"></view>
				</view>
				
				<view class="bottom">
					<view class="button">
						<u-button shape="circle" ripple="true" @click="show = true">提交订单</u-button>
					</view>
				</view>
			</view>
		</u-popup>
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
				//抵扣数量
				subAmount:0,
				//抵扣开关
				subSwitch: true,
				//是否禁用抵扣开关
				isSub:false,
				//支付框开关
				show:false,
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
				//补贴提示语
				subTips:'此商品不支持补贴',
				//商品详情数据
				GoodsDatails:[],
				user_id:'',
				LongItude:'',
				LatItude:'',
				//账户金额
				AccoutAmount:[],
				//使用津贴最大购买数量
				max_SubAmount:0,
				//商品实际付款金额
				payment_Amount:0.00,
				//核销点详情
				GoodsWriteOffData:[],
			};
		},
		watch: {
			//监听用户是否关闭抵扣开关
			subSwitch(val) {
				if(val == false){
					this.subTips = "不使用抵扣"
					
					this.payment_Amount = (this.amount * this.GoodsDatails.BP_Amount).toFixed(2)
				}else{
					this.subTips = `可用${Math.floor(this.GoodsDatails.BP_IntegralConsumeAmount)}补贴权益抵扣${Math.floor(this.GoodsDatails.BP_IntegralConsumeAmount)}元`
				
					this.currentAmount()			
				}
			}			
		},		
		onLoad(e) {
			this.GoodsDatails = JSON.parse(decodeURIComponent(e.GoodsDatails));
			this.user_id = e.user_id
			this.LongItude = e.LongItude
			this.LatItude = e.LatItude
			
			this.page_Init()
			this.getGoodsWriteOff()
		},		
		methods:{
			//页面初始化
			page_Init(){
				//初始化当前数量、最低购买数量
				this.amount = this.GoodsDatails.BP_OrderLimit 
				this.minAmount = this.GoodsDatails.BP_OrderLimit
				
				//用户账户金额信息
				request('API_GetAccountAmount',{user_id:this.user_id}).then(res=>{
					this.AccoutAmount = res
				
					//判断是否支持抵扣 
					if(this.GoodsDatails.BP_IsIntegralConsume != 0){
						this.subTips = `可用${Math.floor(this.GoodsDatails.BP_IntegralConsumeAmount)}补贴权益抵扣${Math.floor(this.GoodsDatails.BP_IntegralConsumeAmount)}元`
						
						this.max_SubAmount = Math.floor(this.AccoutAmount.IntegralAmount/this.GoodsDatails.BP_IntegralConsumeAmount) 
						
						this.currentAmount()
						
					}else{
						this.subTips = '此商品暂不支持抵扣'
						//禁用抵扣开关
						this.isSub = true;
						
						//初始化付款金额,保留2位小数
						this.payment_Amount = (this.minAmount * this.GoodsDatails.BP_Amount).toFixed(2)
					} 				
				})
			},
			//商品核销点
			getGoodsWriteOff(){
				request('API_GetList_BusinessSearch_ForDetailCheckBusiness',{ProductID:this.GoodsDatails.id,Longitude:this.LongItude,Latitude:this.LatItude,pageSize:10,index:1}).then(res=>{
					this.GoodsWriteOffData = res
				})
			},
			radioGroupChange(e){},
			radioChange(e) {
				console.log(e);
			},
			//修改数量
			valChange(){
				//判断是否少于最低购买数量
				if(this.amount<this.GoodsDatails.BP_OrderLimit){
					this.$refs.uToast.show({
						title: `少于最低购买数量`,
						type: 'error',
					})
				}
				else{
					this.currentAmount()
				}
			},
			//当前实际付款金额
			currentAmount(){
				//判断是否开启抵扣
				if(this.subSwitch == true && this.isSub == false){
					//判断是否大于最大抵扣份数
					if(this.amount > this.max_SubAmount){
						
						// = 当前数量 * 原价 - 最大抵扣份数 * 单件抵扣金额
						this.payment_Amount = (this.amount * this.GoodsDatails.BP_Amount - this.max_SubAmount * this.GoodsDatails.BP_IntegralConsumeAmount).toFixed(2)
						this.subAmount = this.max_SubAmount
					}else{
						
						// = 当前数量 * 原价 - 当前数量 * 单件抵扣金额
						this.payment_Amount = (this.amount * this.GoodsDatails.BP_Amount - this.amount * this.GoodsDatails.BP_IntegralConsumeAmount).toFixed(2)
						this.subAmount = this.amount
					}
				}
				else{
					this.payment_Amount = (this.amount * this.GoodsDatails.BP_Amount ).toFixed(2)
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
				position: relative;
				
				.tips{
					margin-left: 10rpx;
					font-size: 26rpx;
					color: #999;
				}
				
				.subAmount{
					position: absolute;
					left: 555rpx;
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
			
			.write-off{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: center;
				margin-top: 30rpx;
				
				.write-off-content{
					width: 650rpx;
					height: 220rpx;
					border: 1rpx solid #999999;
					border-radius: 10rpx;
					display: flex;
					justify-content: space-around;
					align-items: center;
					
					.left-img{
						width: 200rpx;
						height: 200rpx;
						
						image{
							width: 200rpx;
							height: 200rpx;
							border-radius: 10rpx;
						}
					}
					
					.shop-data{
						width: 400rpx;
						height: 200rpx;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						
						.top{
							width: 100%;
							height: 50rpx;
							display: flex;
							justify-content: space-between;
							align-items: center;
							
							.distance{
								color: #999;
							}
						}
						
						.bottom{
							width: 100%;
							color: #999999;
							
							.shop-location{
								width: 100%;
								display: flex;
								justify-content: flex-start;
								align-items: center;
							}
							
						}
					}
				}
			}
		
			.filling{
				width: 100%;
				height: 120rpx;
			}
		
			.post{
				width: 100%;
				height: 330rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;
				
				.contact-person,.call,.post-location{
					width: 670rpx;
					height: 90rpx;
					display: flex;
					justify-content: flex-start;
					align-items: center;
					position: relative;
					
					input{
						width: 530rpx;
						height: 60rpx;
						background-color: #e2e2e2;
						border-radius: 15rpx;
						position: absolute;
						left: 120rpx;
						
					}
				}
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
		background-color: #FFFFFF;
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
	
	.popup-content{
		width: 100%;
		height: 1000rpx;
		background-color: #fff;
		
		.top{
			width: 100%;
			height: 210rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		
		.middle{
			width: 100%;
			height:  580rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			
			.subsidy{
				width: 100%;
				height: 80rpx;
			}
			
			.payment-method{
				width: 100%;
				height: 500rpx;
			}
			
		}
		
		.bottom{
			width: 100%;
			height: 200rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			
			.button{
				width: 670rpx;
				height: 100rpx;
			}
		}
	}
}
</style>
