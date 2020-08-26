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
						<view class="giveaway-name">{{GoodsList[0].BPD_Name}}</view>
						<view class="giveaway-list">
							<text>每月可领{{GoodsList[0].BPD_TotalCount}}{{GoodsList[0].BPD_Unit}}</text>
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
						<input placeholder="请输入联系人姓名" v-model="name"/>
					</view>
					<view class="call">
						<text>电话:</text>
						<input placeholder="请输入联系人电话" v-model="callphone"/>
					</view>
					<view class="post-location">
						<text>地址:</text>
						<input placeholder="请输入联系人地址" v-model="location"/>
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
				<u-button type="warning" shape="circle" ripple="true" @click="submitOrder">提交订单</u-button>
			</view>
		</view>
		
		<!-- 反馈组件 -->
		<u-toast ref="uToast" />
		<u-popup v-model="show" mode="bottom" border-radius="15" closeable="true" close-icon-pos="top-left">
			<view class="popup-content">
				<view class="top">
					<text class="top-title">付款详情</text>
					<text class="pay-amount">实付:￥<text class="btn">{{popup_Amount}}</text></text>
				</view>
				
				<view class="middle">
					<view class="subsidy">
						<view class="left-cont">
							<image src="../../static/image/coupon.png"></image>
							<text>{{DeductionTips}}</text>
							<view class="title">补贴抵扣</view>
						</view>
						<view class="right-cont">
							<u-switch v-model="deductionSwitch" size='40' active-color="#fa3534" :disabled="isDeduction"></u-switch>
						</view>
					</view>
					
					<view class="payment-method">
						<view class="payment-method-title">选择付款方式</view>
						<view class="payment-method-content">
							
							<view class="jt-account Selected" v-if="payment_Method === 0" >
								<view class="left">
									<image class="left-img-0" src="../../static/image/pop_moneyred.png"></image>
									<text>津贴账户</text>
								</view>
								<view class="right">
									<view class="account-amount">{{AccoutAmount.ProfitAmount}}</view>
									<u-icon class="btn" name="checkmark-circle-fill" size="38"></u-icon>
								</view>
							</view>
							<view class="jt-account" v-else @click="select_Payment(0)">
								<view class="left">
									<image class="left-img-0" src="../../static/image/pop_money.png"></image>
									<text>津贴账户</text>
								</view>
								<view class="right">
									<view class="account-amount">{{AccoutAmount.ProfitAmount}}</view>
									<u-icon class="btn" name="checkmark-circle-fill" size="38"></u-icon>
								</view>
							</view>
							
							
							<view class="bt-account Selected" v-if="payment_Method === 1">
								<view class="left">
									<image class="left-img-0" src="../../static/image/pop_homered.png"></image>
									<text>补贴账户</text>
								</view>
								<view class="right">
									<view class="account-amount">{{AccoutAmount.RechargeAmount}}</view>
									<u-icon class="btn" name="checkmark-circle-fill" size="38"></u-icon>
								</view>								
							</view>
							<view class="bt-account" v-else @click="select_Payment(1)">
								<view class="left">
									<image class="left-img-0" src="../../static/image/pop_home.png"></image>
									<text>补贴账户</text>
								</view>
								<view class="right">
									<view class="account-amount">{{AccoutAmount.RechargeAmount}}</view>
									<u-icon class="btn" name="checkmark-circle-fill" size="38"></u-icon>
								</view>								
							</view>
							
							
							<view class="wx-account Selected" v-if="payment_Method === 2">
								<view class="left">
									<image class="left-img-0" src="../../static/image/pop_wxred.png"></image>
									<text>微信支付</text>
								</view>
								<view class="right">
									<u-icon class="btn" name="checkmark-circle-fill" size="38"></u-icon>
								</view>		
							</view>
							<view class="wx-account" v-else @click="select_Payment(2)">
								<view class="left">
									<image class="left-img-0" src="../../static/image/pop_wx.png"></image>
									<text>微信支付</text>
								</view>
								<view class="right">
									<u-icon class="btn" name="checkmark-circle-fill" size="38"></u-icon>
								</view>		
							</view>
						</view>
					</view>
				</view>
				
				<view class="bottom">
					<view class="button" @click="Pay()">
						立即支付
					</view>
				</view>
			</view>
		</u-popup>
		<u-popup v-model="Pay_popup" mode="center" border-radius="15" closeable="true" close-icon-pos="top-left">
			<view class="cont">
				<text class="title">请输入支付密码</text>
				<input type="password" v-model="PayPwd"/>
				<text class="mini">忘记支付密码</text>
				<u-button shape="circle" size="medium" ripple="true"  type="warning" @click="virtual_Payment()">确认支付</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
import {request,wxRequest,payment} from '@/api/request.js';
import md5Libs from "uview-ui/libs/function/md5";
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
				deductionSwitch:true,
				isDeduction:false,
				payment_Method:4,
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
				DeductionTips:'',
				//商品实际付款金额
				payment_Amount:0.00,
				//弹窗显示金额
				popup_Amount:0.00,
				//虚拟银行支付账户类别
				AmountType:'',
				//账户中文名称
				AmountTypeCh:'',
				//虚拟银行支付密码
				PayPwd:'',
				//核销点详情
				GoodsWriteOffData:[],
				//商品列表
				GoodsList:[],
				name:'',
				callphone:'',
				location:'',
				//领取方式
				ReceiveType:0,
				//支付弹窗
				Pay_popup:false,
				//订单详情
				orderData:[]
			};
		},
		watch: {
			//监听用户是否关闭抵扣开关
			subSwitch(val) {
				if(val == false){
					this.subTips = "不使用补贴"
					
					this.payment_Amount = (this.amount * this.GoodsDatails.BP_Amount).toFixed(2)
				}else{
					this.subTips = `可用${(this.GoodsDatails.BP_IntegralConsumeAmount*1).toFixed(2)}补贴权益抵扣${(this.GoodsDatails.BP_IntegralConsumeAmount*1).toFixed(2)}元`
				
					this.currentAmount()			
				}
			},
			deductionSwitch(val){
				if(val == false){
					this.DeductionTips = '不使用或不支持抵扣'
					
				 	this.popup_Amount =  this.payment_Amount
				}else{
					
					this.DeductionTips = `补贴账户已抵扣￥${this.amount * this.orderData.BPR_OffsetAmount}`;
					this.popup_Amount =  (this.orderData.BPR_AppAmount - this.orderData.BPR_OffsetAmount).toFixed(2); 		
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
			this.getGoodsList()
		},		
		methods:{
			Pay(){
				if(this.payment_Method != 4){
					switch(this.payment_Method){
						case 0:
							this.AmountType = 'Profit';
							this.AmountTypeCh = '津贴账户'
							this.Pay_popup = true
						break;
						case 1:
							this.AmountType = 'Recharge';
							this.AmountTypeCh = '补贴账户'
							this.Pay_popup = true
						break;
						case 2:
							this.wx_Payment(this.orderData.OrderId);
						break;
					} 
				}else{
					this.$refs.uToast.show({
						title: `请选择支付方式`,
						type: 'warning',
					})
				}
				
			},
			//是否参加积分消费
			isSubmit(){
				if(this.subSwitch == true && this.isSub == false){
					return 1;
				}else{
					return 0;
				}
			},
			//判断领取方式
			collection_Method(){
				if(this.value === '到店自取'){
					return 0;
				}else{
					return 1;
				}
			},
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
						this.subTips = `可用${(this.GoodsDatails.BP_IntegralConsumeAmount*1).toFixed(2)}补贴权益抵扣${(this.GoodsDatails.BP_IntegralConsumeAmount*1).toFixed(2)}元`
						
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
			getGoodsList(){
				request('API_GetList_BusinessProductDetail',{ProductID:this.GoodsDatails.id}).then(res=>{
					this.GoodsList = res
				})
			},
			radioGroupChange(e){},
			radioChange(e) {
				
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
			//选择支付方式
			select_Payment(e){
				this.payment_Method = e
			},
			submitOrder(){		
				request('API_AddBusinessProduct_V4',{user_id:this.user_id,ProductID:this.GoodsDatails.id,Count:this.amount,UserName:this.name,
					Mobile:this.callphone,Address:this.location,ReceiveType:this.collection_Method(),IsIntegralConsume:this.isSubmit()}).then(res=>{
						
						this.popup_Amount = (res.BPR_AppAmount - res.BPR_OffsetAmount).toFixed(2); 							
						this.orderData = res;
						
						if(res.BPR_OffsetAmount == 0){
							this.DeductionTips = '不使用或不支持抵扣'
							this.isDeduction = true
							this.show = true
						}else{
							this.isDeductions()
							this.show = true
						}
				})	
			},
			//当前实际付款金额
			currentAmount(){
				//判断是否开启补贴
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
			},
			//判断是否开启抵扣
			isDeductions(){
				if(this.deductionSwitch == true && this.isDeduction == false){
					this.DeductionTips = `补贴账户已抵扣￥${this.amount * this.orderData.BPR_OffsetAmount}`
					return 1;
				}else{
					this.DeductionTips = `不使用或不支持抵扣`
					return 0;
				}
			},
			virtual_Payment(){
				if(this.PayPwd != '' && this.PayPwd.length != 0){
					payment('API_Payment_BusinessProductRecord_V2_Json',{OrderId:this.orderData.OrderId,AmountType:this.AmountType,PayPwd:this.PayPwd,IsOffset:this.isDeductions()}).then(res=>{
						if(res.result_code === 'SUCCESS'){
							this.$refs.uToast.show({
								title: `支付成功`,
								type: 'success',
								url:`/pages/pay/paySuccess?AmountType=${this.AmountTypeCh}&Amount=${this.popup_Amount}&orderId=${this.orderData.OrderId}&BusinessName=${this.GoodsDatails.BusinessName}`
							})
							return;
						}
						else
						{
							this.$refs.uToast.show({
								title: res.result_content,
								type: 'error'
							})
							return;
						}
					})
				}else{
					this.$refs.uToast.show({
						title: `请输入支付密码`,
						type: 'error',
					})
					return;
				}
			},
			//微信支付方法
			wx_Payment(OrderId){
				uni.login({
					success:(e=>{
						let code = e.code
						wxRequest('API_GetOpenid',{code:code}).then(result=>{
							wxRequest('API_GetWxpayTradeInfo_BusinessProductRecord_V2_Json',{OrderId:OrderId,openid:result.openid,IsOffset:this.isDeductions()}).then(pay=>{
								let obj = JSON.parse(pay.RequestStr);
								const {appId,timeStamp,nonceStr,paySign} = obj
								const Zpackage = obj.package
								
								let md5Data = md5Libs.md5(`appId=${appId}&nonceStr=${nonceStr}&package=${Zpackage}&signType=MD5
									&timeStamp=${timeStamp}&key=78fe4b2343ec3cc7fa3a46e858e5e7bf`).toUpperCase();
								uni.requestPayment({
									provider:'wxpay',
									timeStamp:timeStamp,
									nonceStr:nonceStr,
									package:Zpackage,
									signType:'MD5',
									paySign:paySign,
									success:(success) => {
										this.$refs.uToast.show({
											title:'支付成功',
											type: 'success'
										})
										return;
									},
									fail:(err) => {
										this.$refs.uToast.show({
											title:'支付失败',
											type: 'error'
										})
										return;
									}
								})
							})
						})
					}) 
				})
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
			justify-content: space-around;
			align-items: center;
			
			.top-title{
				font-size:36rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(0,0,0,1);
			}
			
			.pay-amount{
				font-size:30rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:rgba(0,0,0,1);
				
				.btn{
					font-size:50rpx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(0,0,0,1);
				}
			}
		}
		
		.middle{
			width: 100%;
			height: 580rpx;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border-radius:20px;
			-moz-box-shadow:0px 0px 10px #e1e1e1; -webkit-box-shadow:0px 0px 10px #e1e1e1; box-shadow:0px 0px 10px #e1e1e1;
			
			.subsidy{
				width: 670rpx;
				height: 80rpx;
				border-bottom: 4rpx solid rgba(250, 250, 250, 1);
				display: flex;
				justify-content: center;
				align-items: center;
				
				.left-cont{
					width: 520rpx;
					height: 100%;
					display: flex;
					justify-content: space-between;
					align-items: center;
					
					image{
						width: 40rpx;
						height: 30rpx;
					}
					
					text{
						font-size:28rpx;
						font-family:PingFang SC;
						font-weight:300;
						color:rgba(255,48,0,1);
						line-height:46rpx;
					}
					
					.title{
						width:90rpx;
						height:25rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						background:rgba(255,104,104,1);
						border-radius:5rpx 5rpx 5rpx 0rpx;						
						font-size:20rpx;
						font-family:Adobe Heiti Std;
						font-weight:normal;
						color:rgba(255,255,255,1);
						line-height:40rpx;
					}
				}
				
				.right-cont{
					width: 150rpx;
					height: 100%;
					display: flex;
					justify-content: flex-end;
					align-items: center;
				}
			}
			
			.payment-method{
				width: 670rpx;
				height: 500rpx;
				
				.payment-method-title{
					width: 100%;
					height: 80rpx;
					display: flex;
					align-items: center;
					font-size:30rpx;
					font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
					font-weight:500;
					color:rgba(51,51,51,1);
				}
				
				.payment-method-content{
					width: 100%;
					height: 420rpx;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					align-items: center;
					image{
						width: 40rpx;
						height: 40rpx;
					}
					
					.jt-account,.bt-account,.wx-account{
						width:670rpx;
						height:80rpx;
						border:3rpx solid rgba(225,225,225,1);
						border-radius:40rpx;
						display: flex;
						justify-content: center;
						align-items: center;
						
						.left{
							width: 215rpx;
							height: 40rpx;
							display: flex;
							justify-content: space-around;
							align-items: center;
							border-right: 2rpx solid #efefef;
						}
						
						.right{
							width: 360rpx;
							height: 50rpx;
							display: flex;
							justify-content: space-between;
							align-items: center;
							position: relative;
							
							.account-amount{
								position: absolute;
								left: 20rpx;
								font-size:26rpx;
								font-family:PingFang SC;
								font-weight:400;
								color:rgba(102,102,102,1);
								line-height:40rpx;
							}
							
							.btn{
								position: absolute;
								right: 0;
							}
						}
					}
			
					.Selected{
						border:3rpx solid rgba(255, 48, 0, 1);
						color:rgba(255, 48, 0, 1);
					}
				}
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
				height: 80rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				background:rgba(255,229,14,1);
				border-radius:40rpx;
				font-size:36rpx;
				font-family:PingFang SC;
				font-weight:600;
				color:rgba(51,51,51,1);
			}
		}
	}
	.cont{
		width: 500rpx;
		height: 500rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.title{
			width: 480rpx;
			height: 120rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 32rpx;
			font-weight: bold;
		}
		input{
			width: 380rpx;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			border: 1rpx solid #999999;
			font-size: 30rpx;
		}
		.mini{
			width: 480rpx;
			height: 120rpx;
			font-size: 24rpx;
			color: red;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
}
</style>
