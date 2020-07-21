<template>
	<view>
		<view class="top-title">
			<text class="cont">订单列表</text>
		</view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#f29100" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				
				<!-- 待付款 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box" v-if="orderList[0].length != 0">
							<view class="order" v-for="(item, index) in orderList[0]" :key="index">
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
										<u-button type="default" size="mini" shape="circle" :ripple="true" ripple-bg-color="#abafb6" @click="test">取消订单</u-button>
										<u-button type="error" size="mini" shape="circle" :ripple="true" ripple-bg-color="#abafb6" @click="test">立即付款</u-button>
									</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="#ffffff"></u-loadmore>
						</view>
						
						<view class="page-box" v-else>
							<view>
								<view class="centre">
									<image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode=""></image>
									<view class="explain">
										您还没有相关的订单
										<view class="tips">可以去看看有那些想买的</view>
									</view>
									<view class="btn">随便逛逛</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				
				<!-- 待核销 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box" v-if="orderList[1].length != 0">
							<view class="order" v-for="(item, index) in  orderList[1]" :key="index">
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
										<view class="title u-line-2">{{ item.BP_Desc }}</view>
									</view>
									<view class="right-1">
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
								
								<u-line class="line-1" color="#909399" border-style="dashed" />
								
								<view class="reservation">
									<view class="cont">
										<text class="name">品名</text>
										<text class="number">测试发布</text>
									</view>
									<view class="cont">
										<text class="name">总数</text>
										<text class="number">1</text>
									</view>
									<view class="cont">
										<text class="name">未领取</text>
										<text class="number">1</text>
									</view>
									<view class="cont">
										<text class="name">预约领取</text>
										<u-button type="warning" size="mini" shape="square" :ripple="true" ripple-bg-color="#abafb6" @click="test">立即付款</u-button>
									</view>
								</view>
							
							</view>
							<u-loadmore :status="loadStatus[1]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					
						<view class="page-box" v-else>
							<view>
								<view class="centre">
									<image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode=""></image>
									<view class="explain">
										您还没有相关的订单
										<view class="tips">可以去看看有那些想买的</view>
									</view>
									<view class="btn">随便逛逛</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				
				<!-- 已完成 -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view class="page-box" v-if="orderList[2].length != 0">
							<view class="order" v-for="(item, index) in orderList[2]" :key="index">
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
										<u-button type="default" size="mini" shape="circle" :ripple="true" ripple-bg-color="#abafb6" @click="test">取消订单</u-button>
										<u-button type="error" size="mini" shape="circle" :ripple="true" ripple-bg-color="#abafb6" @click="test">立即付款</u-button>
									</view>
								</view>
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="#ffffff"></u-loadmore>
						</view>
						
						<view class="page-box" v-else>
							<view>
								<view class="centre">
									<image src="https://cdn.uviewui.com/uview/template/taobao-order.png" mode=""></image>
									<view class="explain">
										您还没有相关的订单
										<view class="tips">可以去看看有那些想买的</view>
									</view>
									<view class="btn">随便逛逛</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
			
			</swiper>
		</view>
	</view>
</template>

<script>
//请求组件
import {request} from '@/api/request.js'
export default {
	data() {
		return {
			orderList: [[], [], []],
			dataList: [
				{
					id: 1,
					store: '夏日流星限定贩卖',
					deal: '交易成功',
					goodsList: [
						{
							goodsUrl: '//img13.360buyimg.com/n7/jfs/t1/103005/7/17719/314825/5e8c19faEb7eed50d/5b81ae4b2f7f3bb7.jpg',
							title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
							type: '灰色;M',
							deliveryTime: '付款后30天内发货',
							price: '348.58',
							number: 2
						},
						{
							goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg',
							title: '【葡萄藤】现货 小清新学院风制服格裙百褶裙女短款百搭日系甜美风原创jk制服女2020新款',
							type: '45cm;S',
							deliveryTime: '付款后30天内发货',
							price: '135.00',
							number: 1
						}
					]
				},
				{
					id: 2,
					store: '江南皮革厂',
					deal: '交易失败',
					goodsList: [
						{
							goodsUrl: '//img14.360buyimg.com/n7/jfs/t1/60319/15/6105/406802/5d43f68aE9f00db8c/0affb7ac46c345e2.jpg',
							title: '【冬日限定】现货 原创jk制服女2020冬装新款小清新宽松软糯毛衣外套女开衫短款百搭日系甜美风',
							type: '粉色;M',
							deliveryTime: '付款后7天内发货',
							price: '128.05',
							number: 1
						}
					]
				},
				{
					id: 3,
					store: '三星旗舰店',
					deal: '交易失败',
					goodsList: [
						{
							goodsUrl: '//img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg',
							title: '三星（SAMSUNG）京品家电 UA65RUF70AJXXZ 65英寸4K超高清 HDR 京东微联 智能语音 教育资源液晶电视机',
							type: '4K，广色域',
							deliveryTime: '保质5年',
							price: '1998',
							number: 3
						},
						{
							goodsUrl: '//img14.360buyimg.com/n7/jfs/t6007/205/4099529191/294869/ae4e6d4f/595dcf19Ndce3227d.jpg!q90.jpg',
							title: '美的(Midea)639升 对开门冰箱 19分钟急速净味 一级能效冷藏双开门杀菌智能家用双变频节能 BCD-639WKPZM(E)',
							type: '容量大，速冻',
							deliveryTime: '保质5年',
							price: '2354',
							number: 1
						}
					]
				},
				{
					id: 4,
					store: '三星旗舰店',
					deal: '交易失败',
					goodsList: [
						{
							goodsUrl: '//img10.360buyimg.com/n7/jfs/t22300/31/1505958241/171936/9e201a89/5b2b12ffNe6dbb594.jpg!q90.jpg',
							title: '法国进口红酒 拉菲（LAFITE）传奇波尔多干红葡萄酒750ml*6整箱装',
							type: '4K，广色域',
							deliveryTime: '珍藏10年好酒',
							price: '1543',
							number: 3
						},
						{
							goodsUrl: '//img10.360buyimg.com/n7/jfs/t1/107598/17/3766/525060/5e143aacE9a94d43c/03573ae60b8bf0ee.jpg',
							title: '蓝妹（BLUE GIRL）酷爽啤酒 清啤 原装进口啤酒 罐装 500ml*9听 整箱装',
							type: '一打',
							deliveryTime: '口感好',
							price: '120',
							number: 1
						}
					]
				},
				{
					id: 5,
					store: '三星旗舰店',
					deal: '交易成功',
					goodsList: [
						{
							goodsUrl: '//img12.360buyimg.com/n7/jfs/t1/52408/35/3554/78293/5d12e9cfEfd118ba1/ba5995e62cbd747f.jpg!q90.jpg',
							title: '企业微信 中控人脸指纹识别考勤机刷脸机 无线签到异地多店打卡机WX108',
							type: '识别效率高',
							deliveryTime: '使用方便',
							price: '451',
							number: 9
						}
					]
				}
			],
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
			current: 0,
			swiperCurrent: 0,
			tabsHeight: 0,
			dx: 0,
			loadStatus: ['loadmore','loadmore','loadmore','loadmore'],
		};
	},
	onLoad() {
		this.getOrderList(0);
		this.getOrderList(1);
		this.getOrderList(2);
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
	methods: {
		reachBottom() {
			// 此tab为空数据
			if(this.current != 2) {
				this.loadStatus.splice(this.current,1,"loading")
				setTimeout(() => {
					this.getOrderList(this.current);
				}, 1200);
			}
		},
		test(){
			console.log('按键点击')
		},
		// 页面数据
		getOrderList(idx) {
			// if(idx!=0){
			// 	for(let i = 0; i < 5; i++) {
			// 		let index = this.$u.random(0, this.dataList.length - 1);
			// 		let data = JSON.parse(JSON.stringify(this.dataList[index]));
			// 		data.id = this.$u.guid();
			// 		this.orderList[idx].push(data);
			// 	}
			// 	this.loadStatus.splice(this.current,1,"loadmore")
			// }
			
			
			switch(idx){
				case 0:
					request('API_GetList_BusinessProductRecord',{
						user_id:8565,
						state:0,
						pageSize:10,
						index:1
					}).then(res=>{
						this.loadStatus.splice(this.current,1,"loadmore")
						
						for(let i=0;i<res.length;i++){
							this.orderList[idx].push(res[i]);
						}
					})
				break;
				case 1:
					request('API_GetList_BusinessProductRecord',{
						user_id:8565,
						state:1,
						pageSize:10,
						index:1
					}).then(res=>{
						this.loadStatus.splice(this.current,1,"loadmore")
						
						for(let i=0;i<res.length;i++){
							this.orderList[idx].push(res[i]);
						}
					})
				break;
				case 2:
					request('API_GetList_BusinessProductRecord',{
						user_id:8565,
						state:3,
						pageSize:10,
						index:1
					}).then(res=>{
						this.loadStatus.splice(this.current,1,"loadmore")
						
						for(let i=0;i<res.length;i++){
							this.orderList[idx].push(res[i]);
						}
					})
				break;
			}
			
			
			
		},
		// 总价
		totalPrice(item) {
			let price = 0;
			item.map(val => {
				price += parseFloat(val.price);
			});
			return price.toFixed(2);
		},
		// 总件数
		totalNum(item) {
			let num = 0;
			item.map(val => {
				num += val.number;
			});
			return num;
		},
		
		// tab栏切换
		change(index) {
			this.swiperCurrent = index;
			this.getOrderList();
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
			position: relative;
			left: 315rpx;
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
			
			.name{
				font-size: 28rpx;
				font-weight: bold;
				margin-bottom: 8rpx;
			}
			
			.number{
				color: #fa3534;
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
</style>
