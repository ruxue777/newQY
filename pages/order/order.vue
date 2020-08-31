<template>
	<view>
		<view class="top-title">
			<text class="cont">订单列表</text>
		</view>
		
		<view class="btnn"></view>
		
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#f29100" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				
				<!-- 待付款 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom_0">
						<view class="page-box" v-if="orderList_0.length != 0">
							<view class="order" v-for="(item, index) in orderList_0" :key="index">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{ item.BusinessName }}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">等待付款</view>
								</view>
								<view class="item">
									<view class="left"><image :src="item.BP_ImgUrl" mode="aspectFill"></image></view>
									<view class="content">
										<view class="title u-line-2">{{ item.BP_Desc }}</view>
									</view>
									<view class="right">
										<view class="price">
											￥{{ priceInt(item.BPR_AppAmount) }}
											<text class="decimal">.{{ priceDecimal(item.BPR_AppAmount) }}</text>
										</view>
										<view class="number">x{{ item.BPR_Count }}</view>
									</view>
								</view>
								<view class="total">
									共{{ item.BPR_Count }}件商品 合计:
									<text class="total-price">
										￥{{ priceInt(item.BPR_AppAmount) }}.
										<text class="decimal">{{ priceDecimal(item.BPR_AppAmount) }}</text>
									</text>
								</view>
								
								<u-line class="line-0" color="#909399" border-style="dashed" />
								
								<view class="bottom">
									<view class="Amount">
										<text class="Amount-left">应付总额:</text>
										<text class="Amount-right">￥{{item.BPR_AppAmount}}</text>
									</view>
									
									<view class="buttom">
										<u-button type="default" size="mini" shape="circle" :ripple="true" ripple-bg-color="#abafb6" @click="closeOrder">取消订单</u-button>
										<u-button type="error" size="mini" shape="circle" :ripple="true" ripple-bg-color="#abafb6" @click="test">立即付款</u-button>
									</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus_0" bgColor="#ffffff"></u-loadmore>
						</view>
						
						<view class="page-box" v-else>
							<view>
								<view class="centre">
									<image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode=""></image>
									<view class="explain">
										您还没有相关的订单
										<view class="tips">可以去看看有那些想买的</view>
									</view>
									<view class="btn" @click="toIndex">随便逛逛</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				
				<!-- 待核销 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom_1">
						<view class="page-box" v-if="orderList_1.length != 0">
							<view class="order" v-for="(item, index) in  orderList_1" :key="index">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{item.BusinessName}}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">等待核销</view>
								</view>
								<view class="item">
									<view class="left"><image :src="item.BP_ImgUrl" mode="aspectFill"></image></view>
									<view class="content">
										<view class="title u-line-2">{{item.BP_Name}}</view>
									</view>
									<view class="right-1">
										<view class="price">
											￥{{ priceInt(item.BPR_AppAmount) }}
											<text class="decimal">.{{ priceDecimal(item.BPR_AppAmount)}}</text>
										</view>
										<view class="number">x{{ item.BPR_Count }}</view>
									</view>
								</view>
								<view class="total">
									共{{ item.BPR_Count }}件商品 合计:
									<text class="total-price">
										￥{{ priceInt(item.BPR_AppAmount) }}.
										<text class="decimal">{{ priceDecimal(item.BPR_AppAmount) }}</text>
									</text>
								</view>
								
								<u-line class="line-1" color="#909399" border-style="dashed" />
								
								<view class="reservation">
									<view class="cont">
										<text class="name">品名</text>
										<text class="number">
											{{item.BP_Desc}}
										</text>
									</view>
									<view class="cont">
										<text class="name">总数</text>
										<text class="number_1">{{item.BPR_Count}}</text>
									</view>
									<view class="cont">
										<text class="name">未领取</text>
										<text class="number_2">{{item.DataList_Detail[0].BPRD_ValidCount}}</text>
									</view>
									<view class="cont">
										<text class="name">预约领取</text>
										<u-button type="warning" v-if="item.DataList_Detail[0].btn_DetailOrder == 1" size="mini" shape="square" :ripple="true" ripple-bg-color="#abafb6" @click="reservation(item.BPR_OrderId)">立即预约</u-button>
										<u-button type="primary" v-if="item.DataList_Detail[0].btn_DetailCheck == 1" size="mini" shape="square" :ripple="true" ripple-bg-color="#abafb6" @click="receive(item.DataList_Detail[0].id)">立即领取</u-button>
									</view>
								</view>
							
							</view>
							<u-loadmore  :status="loadStatus_1" bgColor="#f2f2f2"></u-loadmore>
						</view>
					
						<view class="page-box" v-else>
							<view>
								<view class="centre">
									<image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode=""></image>
									<view class="explain">
										您还没有相关的订单
										<view class="tips">可以去看看有那些想买的</view>
									</view>
									<view class="btn" @click="toIndex">随便逛逛</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				
				<!-- 已完成 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom_2">
						<view class="page-box" v-if="orderList_2.length != 0">
							<view class="order" v-for="(item, index) in  orderList_2" :key="index">
								<view class="top">
									<view class="left">
										<u-icon name="home" :size="30" color="rgb(94,94,94)"></u-icon>
										<view class="store">{{item.BusinessName}}</view>
										<u-icon name="arrow-right" color="rgb(203,203,203)" :size="26"></u-icon>
									</view>
									<view class="right">已完成</view>
								</view>
								<view class="item">
									<view class="left"><image :src="item.BP_ImgUrl" mode="aspectFill"></image></view>
									<view class="content">
										<view class="title u-line-2">{{ item.BP_Name }}</view>
									</view>
									<view class="right-2">
										<view class="price">
											￥{{ priceInt(item.BPR_AppAmount) }}
											<text class="decimal">.{{ priceDecimal(item.BPR_AppAmount)}}</text>
										</view>
										<view class="number">x{{ item.BPR_Count }}</view>
									</view>
								</view>
								<view class="total">
									共{{ item.BPR_Count }}件商品 合计:
									<text class="total-price">
										￥{{ priceInt(item.BPR_AppAmount) }}.
										<text class="decimal">{{ priceDecimal(item.BPR_AppAmount)}}</text>
									</text>
								</view>
								
								<u-line class="line-1" color="#909399" border-style="dashed" />
								
								<view class="reservation">
									<view class="cont">
										<text class="name">品名</text>
										<text class="number">{{item.DataList_Detail[0].BPD_Name}}</text>
									</view>
									<view class="cont">
										<text class="name">总数</text>
										<text class="number_1">{{parseInt(item.DataList_Detail[0].BPD_TotalCount)}}</text>
									</view>
									<view class="cont">
										<text class="name">未领取</text>
										<text class="number_2">{{parseInt(item.DataList_Detail[0].BPRD_NoReceiveCount)}}</text>
									</view>
									<view class="cont">
										<text class="name">预约领取</text>
										<view class="warning-0">已核销</view>
									</view>
								</view>
							
								<u-line class="line-1" color="#909399" border-style="dashed" />
							
								<u-collapse>
									<u-collapse-item title="订单详情" >
										
									<view class="record" v-for="(res,index) in item.DataList_DetailLogs" :key="index">
										<view class="cont">
											<text class="name">核销时间:</text>
											<text class="number">{{res.updateTime}}</text>
										</view>
										<view class="cont">
											<text class="name">核销店铺:</text>
											<text class="number">{{item.BusinessName}}</text>
										</view>
										<view class="cont">
											<text class="name">产品名称:</text>
											<text class="number">{{ item.BP_Name }}</text>
										</view>
										<view class="cont">
											<text class="name">数量:</text>
											<view class="number">{{priceInt(res.BPRDL_OrderCount)}}个</view>
										</view>
										<view class="cont">
											<text class="name">订单号:</text>
											<text class="number">{{ item.BPR_OrderId }}</text>
										</view>
									</view>
									</u-collapse-item>
								</u-collapse>
							</view>
							<u-loadmore  :status="loadStatus_2" bgColor="#f2f2f2"></u-loadmore>
						</view>
											
						<view class="page-box" v-else>
							<view>
								<view class="centre">
									<image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode=""></image>
									<view class="explain">
										您还没有相关的订单
										<view class="tips">可以去看看有那些想买的</view>
									</view>
									<view class="btn" @click="toIndex">随便逛逛</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>	
			</swiper>
		</view>
			
		<!-- 反馈组件 -->
		<u-toast ref="uToast" />
		<u-calendar v-model="calendar" mode="date" @change="selectionTime" z-index="11000" :min-date="disableTime()" max-date="2050-01-01"></u-calendar>
		<u-select v-model="address" :list="addresList" z-index="11000" @confirm="confirm"></u-select>
		<u-popup v-model="reservationPopup" mode="bottom" border-radius="20" closeable="true" close-icon-pos="top-left">
			<view class="popup-content">
				<view class="middle">
					<view class="top-title-1">预约</view>
					<view class="goods-name">
						<text class="title">商品名称</text>
						<view class="name">{{reservationPopupDetails.BPD_Name}}</view>
					</view>
					<view class="unaccalimed">
						<text class="title">未领取总数量</text>
						<view class="name">{{parseInt(reservationPopupDetails.BPRD_NoReceiveCount)}}</view>
					</view>
					<view class="maxamount">
						<text class="title">可领最大数量</text>
						<view class="name">{{parseInt(reservationPopupDetails.BPD_PerCount)}}/月</view>
					</view>
					<view class="remaining">
						<text class="title">剩余可领数量</text>
						<view class="name">{{parseInt(reservationPopupDetails.BPRD_ValidCount)}}</view>
					</view>
					<view class="Number-of-appointments">
						<text class="title">预约领取数量</text>
						<view class="name">
							<u-number-box v-model="value" @change="valChange" min=1 :disabled="numberBox"></u-number-box>
						</view>
					</view>
					<view class="appointment">
						<text class="title">领取时间</text>
						<view class="name" @click="calendar = true">
							<text>{{popTime}}</text>
							<u-icon name="arrow-down-fill" style="position: absolute;right: 0;"></u-icon>
						</view>
					</view>
					<view class="address">
						<text class="title">领取地点选择</text>
						<view class="location" @click="address = true">
							<text>{{addresName}}</text>
							<u-icon name="arrow-down-fill" style="position: absolute;right: 0;"></u-icon>
						</view>
					</view>
					<view class="button">
						<view class="button-content">
							<u-button @click="reservationPopup = false">取消</u-button>
						</view>
						<view class="button-content">
							<u-button type="warning" @click="reservationConfirm">预约</u-button>
						</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
//请求组件
import {request} from '@/api/request.js'
export default {
	data() {
		return {
			orderList_0:[],
			orderList_1:[],
			orderList_2:[],
			list: [
				{
					name: '待付款'
				},
				{
					name: '待核销'
				},
				{
					name: '已完成'
				}
			],
			day:["日", "一", "二", "三", "四", "五", "六"],
			current: 0,
			swiperCurrent: 0,
			tabsHeight: 0,
			dx: 0,
			loadStatus_0: 'loadmore',
			loadStatus_1: 'loadmore',
			loadStatus_2: 'loadmore',
			userInfo:[],
			Index:[1,1,1],
			//预约弹窗
			reservationPopup:false,
			//预约弹窗数据
			reservationPopupDetails:[],
			//数量步进禁用
			numberBox:false,
			//弹窗当前时间
			popTime:'',
			//日历弹窗
			calendar:false,
			//预约地址弹窗
			address:false,
			//预约数量
			value: 1,
			//预约地址显示
			addresName:'',
			//预约地址列表
			addresList:[
				{
					value: '',
					label: '',
					extra:''
				}
			],
			//预约商家ID
			res_BusinessID:'',
		};
	},
	onLoad() {
		this.getUserInfo()
		this.getOrderList_0();
		this.getOrderList_1();
		this.getOrderList_2();
	},
	computed: {
		// 价格小数
		priceDecimal() {
			return val => {
				if (val !== parseInt(val)) return val.slice(-2);
				else return '00';
			};
		},
		// 价格整数
		priceInt() {
			return val => {
				if (val !== parseInt(val)) return val.split('.')[0];
				else return val;
			};
		}
	},
	onPullDownRefresh(){
		this.getUserInfo()
		this.orderList_0 = []
		this.orderList_1 = []
		this.orderList_2 = []
		this.Index[0] = 1
		this.Index[1] = 1
		this.Index[2] = 1
		this.getOrderList_0();
		this.getOrderList_1();
		this.getOrderList_2();
	},
	methods: {
		reachBottom_0() {
			if(this.orderList_0.length<this.Index[0]*10){
				this.loadStatus_0 = 'nomore';
				return;
			}else{
				this.Index[0]++;
				this.loadStatus_0 = 'loading';
				// 模拟数据加载效果
				setTimeout(() => {
					this.getOrderList_0();
					this.loadStatus_0 = 'loadmore';
				}, 1000);
			}		
		},
		reachBottom_1() {
			if(this.orderList_1.length<this.Index[1]*10){
				this.loadStatus_1 = 'nomore';
				return;
			}else{
				this.Index[1]++;
				this.loadStatus_1 = 'loading';
				// 模拟数据加载效果
				setTimeout(() => {
					this.getOrderList_1();
					this.loadStatus_1 = 'loadmore';
				}, 1000);
			}			
		},
		reachBottom_2() {
			if(this.orderList_2.length<this.Index[2]*10){
				this.loadStatus_2 = 'nomore';
				return;
			}else{
				this.Index[2]++;
				this.loadStatus_2 = 'loading';
				// 模拟数据加载效果
				setTimeout(() => {
					this.getOrderList_2();
					this.loadStatus_2 = 'loadmore';
				}, 1000);
			}	
		},
		getUserInfo(){
			const userInfo = uni.getStorageSync("globalUser");
			if(!userInfo){
				uni.showModal({
					title:'您还没有登录哦',
					confirmText:'去登录',
					success:function(res){
						if(res.cancel)
						{
							return
						}
						else if(res.confirm)
						{
							uni.navigateTo({
								url:'/pages/user/signIn'
							})
						}
					}
				})
			}
			else{
				this.userInfo = userInfo;
			}
		},
		closeOrder(){
			this.$refs.uToast.show({
				title: '24小时后订单自动取消',
				type: 'warning'
			})
		},
		test(){
			console.log('按键点击')
		},
		// 页面数据
		getOrderList_0(callBack) {		
			request('API_GetList_BusinessProductRecord',{
				user_id:this.userInfo.user_id,
				state:0,
				pageSize:10,
				index:this.Index[0]
			}).then(res=>{
				if(res.length<10){
					this.loadStatus_0 = 'nomore'
				}
				this.orderList_0 = [...this.orderList_0,...res]
				callBack && callBack()	
			})		
		},
		getOrderList_1(callBack){
			request('API_GetList_BusinessProductRecord',{
				user_id:this.userInfo.user_id,
				state:1,
				pageSize:10,
				index:this.Index[1]
			}).then(res=>{			
				if(res.length<10){
					this.loadStatus_1 = 'nomore'
				}
				this.orderList_1 = [...this.orderList_1,...res]
				callBack && callBack()			
			})
		},
		getOrderList_2(callBack){
			request('API_GetList_BusinessProductRecord',{
				user_id:this.userInfo.user_id,
				state:3,
				pageSize:10,
				index:this.Index[2]
			}).then(res=>{
				if(res.length<10){
					this.loadStatus_2 = 'nomore'
				}
				this.orderList_2 = [...this.orderList_2,...res]
				callBack && callBack()	
			})
		},
		toIndex(){
			uni.switchTab({
				url:'../index/index'
			})
		},
		//领取订单
		receive(OrderId){
			uni.navigateTo({
				url:`/pages/receive/receive?orderId=${OrderId}`
			})
		},
		//预约
		reservation(OrderId){
			request('API_GetList_BusinessProductRecordDetailByOrderId',{user_id:this.userInfo.user_id,BPR_OrderId:OrderId}).then(res=>{
				this.getMonth()
				this.reservationPopupDetails = res[0]
				this.getDetailCheck(res[0].id)
				if(res[0].BPRD_ValidCount == 1){
					this.numberBox = true
				}
			})
			this.reservationPopup = true
		},
		//预约确认
		reservationConfirm(){
			request('API_AddBusinessProductRecordDetailLogs',{ID:this.reservationPopupDetails.id,OrderCount:this.value,OrderTime:this.orderTime(this.popTime),BusinessID:this.res_BusinessID}).then(res=>{
				if(res.result_code === 'SUCCESS'){
					this.$refs.uToast.show({
						title: '预约成功',
						type: 'success'
					})
					this.reservationPopup = false;
					return;
				}else{
					this.$refs.uToast.show({
						title: res.result_content ,
						type: 'error'
					})
					return;
				}	
			})
		},
		//领取地址
		getDetailCheck(id){
			request('API_GetList_BusinessForDetailCheck',{ID:id}).then(res=>{
				let momentData = []
				for(var i = 0;i<res.length;i++){
					momentData.push({value:`${i}`,extra:res[i].id,label:res[i].BusinessName})
				}
				this.addresName = momentData[0].label
				this.res_BusinessID = momentData[0].extra
				this.addresList = momentData
			})
		},
		//当前时间
		getMonth(){
			const week = new Date().getDay(); 
			//返回日期格式,2020-8-29 周六
			this.popTime = `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()} 星期${this.day[week]}`
		},
		//预约时间选择
		selectionTime(e){
			this.popTime = `${e.result} 星期${this.day[(new Date(`${e.result}`)).getDay()]}`
		},
		//预约订单时间
		orderTime(s){
			return s.substring(0, s.length-3)
		},
		//禁用当前日期之前
		disableTime(){
			//锁定预约日期
			return `${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
		},
		//预约地址选择
		confirm(e){
			this.res_BusinessID = JSON.parse(JSON.stringify(e))[0].extra;
			this.addresName = JSON.parse(JSON.stringify(e))[0].label;
		},
		valChange(e) {
			console.log('当前值为: ' + e.value)
		},
		// tab栏切换
		change(index) {
			this.swiperCurrent = index;
		},
		transition({ detail: { dx } }) {
			this.$refs.tabs.setDx(dx);
		},
		animationfinish({ detail: { current } }) {
			this.$refs.tabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
		}
	}
};
</script>

<style>
/* #ifndef H5 */
page {
	height: 100%;
	background-color: #f2f2f2;
}
/* #endif */
</style>

<style lang="scss" scoped>
.top-title{
	width: 100%;
	height: 130rpx;
	display: flex;
	align-items: center;
	position: fixed;
	top: 0;
	z-index: 100;
	
	.cont{
		font-size: 36rpx;
		font-weight: bold;
		margin-left: 25rpx;
		position: relative;
		top: 15rpx;
	}
}

.order {
	width: 710rpx;
	background-color: #ffffff;
	margin: 20rpx auto;
	border-radius: 20rpx;
	box-sizing: border-box;
	padding: 20rpx;
	font-size: 28rpx;
	.top {
		display: flex;
		justify-content: space-between;
		.left {
			display: flex;
			align-items: center;
			.store {
				margin: 0 10rpx;
				font-size: 32rpx;
				font-weight: bold;
			}
		}
		.right {
			color: $u-type-warning-dark;
		}
	}
	.item {
		display: flex;
		margin: 20rpx 0 0;
		.left {
			margin-right: 20rpx;
			image {
				width: 200rpx;
				height: 200rpx;
				border-radius: 10rpx;
			}
		}
		.content {
			.title {
				width: 325rpx;
				font-size: 28rpx;
				line-height: 50rpx;
			}
			.type {
				margin: 10rpx 0;
				font-size: 24rpx;
				color: $u-tips-color;
			}
			.delivery-time {
				color: #e5d001;
				font-size: 24rpx;
			}
		}
		.right {
			// position: relative;
			// left: 300rpx;
			margin-left: 10rpx;
			padding-top: 15rpx;
			text-align: right;
			
			
			.decimal {
				font-size: 24rpx;
				margin-top: 4rpx;
			}
			.number {
				color: $u-tips-color;
				font-size: 24rpx;
			}
		}
		.right-1{
			position: absolute;
			left: 620rpx;
			padding-top: 15rpx;
			text-align: right;
			
			.decimal {
				font-size: 24rpx;
				margin-top: 4rpx;
			}
			.number {
				color: $u-tips-color;
				font-size: 24rpx;
			}
		}
		.right-2{
			position: absolute;
			left: 620rpx;
			padding-top: 15rpx;
			text-align: right;
		}
	}
	.total {
		margin-top: 20rpx;
		text-align: right;
		font-size: 24rpx;
		.total-price {
			font-size: 32rpx;
		}
	}
	.line-1{
		position: relative;
		top: 20rpx;
	}
	.reservation{
		width: 100%;
		height: 125rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		position: relative;
		top: 20rpx;
		
		.cont{
			height: 100rpx;
			width: 150rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			
			.name{
				font-size: 28rpx;
				font-weight: bold;
				margin-bottom: 8rpx;
			}
			
			.warning-0{
				width: 130rpx;
				height: 50rpx;
				background-color: #82848a;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				top: -3rpx;
				border-radius: 10rpx;
				color: #FFFFFF;
			}
			
			.number{
				width: 180rpx;
				height: 50rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				overflow:hidden;
				white-space:nowrap;
				text-overflow:ellipsis;
				color: #fa3534;
				line-height:30rpx;
			}
			.number_1,.number_2{
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
	
	.record{
		width: 100%;
		height: 220rpx;
		display: flex;
		flex-direction: column;
		
		.cont{
			display: flex;
			align-items: center;
			
			.name{
				font-size: 32rpx;
			}
			
			.number{
				font-size: 32rpx;
				position: relative;
				left: 10rpx;
			}
		}
	}
	.line-0{
		position: relative;
		top: 15rpx;
	}
	.bottom {
		display: flex;
		margin-top: 10rpx;
		padding: 0 10rpx;
		justify-content: space-between;
		align-items: center;
		position: relative;
		top: 10rpx;
		
		.Amount{
			width: 350rpx;
			height: 75rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			left: -45rpx;
			.Amount-left{
				font-size: 28rpx;
			}
			
			.Amount-right{
				font-size: 38rpx;
				color: red;
				font-weight: bold;
			}
		}
		.buttom{
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			
			u-button{
				margin-left: 15rpx;
			}
		}
		
		.btn {
			line-height: 52rpx;
			width: 160rpx;
			border-radius: 26rpx;
			border: 2rpx solid $u-border-color;
			font-size: 26rpx;
			text-align: center;
			color: $u-type-info-dark;
		}
		.evaluate {
			color: $u-type-warning-dark;
			border-color: $u-type-warning-dark;
		}
	}
}
.centre {
	text-align: center;
	margin: 200rpx auto;
	font-size: 32rpx;
	image {
		width: 164rpx;
		height: 164rpx;
		border-radius: 50%;
		margin-bottom: 20rpx;
	}
	.tips {
		font-size: 24rpx;
		color: #999999;
		margin-top: 20rpx;
	}
	.btn {
		margin: 80rpx auto;
		width: 200rpx;
		border-radius: 32rpx;
		line-height: 64rpx;
		color: #ffffff;
		font-size: 26rpx;
		background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
	}
}
.btnn{
	width: 100%;
	height: 130rpx;
	
}

.wrap {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
	
}
.swiper-box {
	flex: 1;
}
.swiper-item {
	height: 100%;
}

.popup-content{
	width: 100%;
	height: 1000rpx;
	display: flex;
	justify-content: center;
	align-items: center;
	
	.middle{
		width: 690rpx;
		height: 970rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		
		.top-title-1{
			width: 100%;
			height: 90rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 34rpx;
			font-weight: 550;
		}
		
		.goods-name,.unaccalimed,.maxamount,.remaining,.Number-of-appointments,.appointment{
			width: 100%;
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1rpx solid #dddddd;
			font-size: 28rpx;
			
			.name{
				width: 300rpx;
				height: 40rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				left: -10rpx;
			}
		}
		.address{
			width: 100%;
			height: 140rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1rpx solid #dddddd;
			font-size: 28rpx;
			
			.location{
				width: 300rpx;
				height: 40rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				left: -10rpx;
			}
		}
		.button{
			width: 100%;
			height: 130rpx;
			display: flex;
			justify-content: space-around;
			align-items: center;
			position: relative;
			top: 20rpx; 
			
			.button-content{
				width: 300rpx;
				height: 100rpx;
			}
		}
	}
}
</style>
