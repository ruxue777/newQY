<template>
	<view>
		<topSeek :LocationData="LocationData"></topSeek>
		<topSwiper :swiperData="swiperData" :LatItude="LatItude" :LongItude="LongItude"></topSwiper>
		<centralNav :ShopListData="ShopListData"></centralNav>
		<!-- <zhixunlan></zhixunlan> -->
		<centGoods :HotListData="HotListData"></centGoods>
		<indexImage></indexImage>
		 
		<!-- 瀑布流不支持组件形式 -->
		<view class="wrap">
			<u-waterfall v-model="HotGoodsListData" ref="uWaterfall">
				<template v-slot:left="{ leftList }">
					<view class="demo-warter" v-for="(item, index) in leftList" :key="index" @click="toGoodsDetails(item.id,item.BusinessID,item.CategoryID)">
						<!-- 警告：微信小程序不支持嵌入lazyload组件，请自行如下使用image标签 -->
						<!-- #ifndef MP-WEIXIN -->
						<u-lazy-load threshold="-450" border-radius="10" :image="item.BP_ImgUrl " :index="index"></u-lazy-load>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<view class="demo-img-wrap"><image class="demo-image" :src="item.BP_ImgUrl " mode="widthFix"></image></view>
						<!-- #endif -->
						<view class="demo-title">{{ item.BP_Name  }}</view>
						<view class="demo-price">{{ item.BP_Amount  }}元
							<view class="sold">{{ item.BP_OrderIsSell }}人付款</view>
						</view>
						<view class="demo-tag">
							<!-- <view class="demo-tag-owner">自营</view>
							<view class="demo-tag-text">放心购</view> -->
							<view class="subsidy" v-if="item.BP_IntegralConsumeAmount != 0">
								<span class="jintie">津贴</span>
								<span class="diyon">抵{{item.BP_IntegralConsumeAmount}}元</span>
							</view>
						</view>
						<view class="demo-shop">{{ item.BusinessName }}</view>
						<!-- 微信小程序无效，因为它不支持在template中引入组件 -->
						<u-icon name="close-circle-fill" color="#fa3534" size="34" class="u-close" ></u-icon>
					</view>
				</template>
				<template v-slot:right="{ rightList }">
					<view class="demo-warter" v-for="(item, index) in rightList" :key="index" @click="toGoodsDetails(item.id,item.BusinessID,item.CategoryID)">
						<!-- #ifndef MP-WEIXIN -->
						<u-lazy-load threshold="-450" border-radius="10" :image="item.BP_ImgUrl" :index="index"></u-lazy-load>
						<!-- #endif -->
						<!-- #ifdef MP-WEIXIN -->
						<view class="demo-img-wrap"><image class="demo-image" :src="item.BP_ImgUrl" mode="widthFix"></image></view>
						<!-- #endif -->
						<view class="demo-title">{{ item.BP_Name  }}</view>
						<view class="demo-price">{{ item.BP_Amount  }}元
							<view class="sold">{{ item.BP_OrderIsSell }}人付款</view>
						</view>
						<view class="demo-tag">
							<view class="subsidy" v-if="item.BP_IntegralConsumeAmount != 0">
								<span class="jintie">津贴</span>
								<span class="diyon">抵{{item.BP_IntegralConsumeAmount}}元</span>
							</view>
						</view>
						<view class="demo-shop">{{ item.BusinessName }}</view>
						<!-- 微信小程序无效，因为它不支持在template中引入组件 -->
						<u-icon name="close-circle-fill" color="#fa3534" size="34" class="u-close" ></u-icon>
					</view>
				</template>
			</u-waterfall>
			<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" ></u-loadmore>
		</view>
		
	</view>
</template>

<script>
//请求组件
import {request} from '@/api/request.js'
//QQ地图组件
import QQMap_SDK from '@/SDK/qqmap-wx-jssdk.min.js'
//样式组件
import topSeek from "./components/topSeek.vue";	
import topSwiper from "./components/topSwiper.vue";
import centralNav from"./components/centralNav.vue"
import zhixunlan from "./components/zhixunlan.vue"
import centGoods from "./components/centGoods.vue"
import indexImage from "./components/indexImage.vue"

export default {
	components:{
		topSeek:topSeek,
		topSwiper:topSwiper,
		centralNav:centralNav,
		zhixunlan:zhixunlan,
		centGoods:centGoods,
		indexImage:indexImage
	},
	data() {
		return {
			//轮播图数据
			swiperData:[],
			//商铺列表数据
			ShopListData:[],
			//热门列表数据
			HotListData:[],
			//热门商品列表
			HotGoodsListData:[],
			LatItude:'',
			LongItude:'',
			LocationData:'',
			loadStatus: 'loadmore',
			flowList: [],
			//当前页面数量
			Index:1
		};
	},
	onLoad() {
		this.getLocationData()
		this.getSwiperData();
		this.getShopListData();
		this.getHotListData();
		
	},
	//下拉刷新 
	onPullDownRefresh() {
		this.Index = 1
		this.HotGoodsListData = [{}]
		this.clear();
		//刷新效果
		setTimeout(()=>{
			this.getHotGoodsListData(()=>{
				uni.stopPullDownRefresh()
			})
				
			//重新加载首页数据	
			this.getSwiperData();
			this.getShopListData();	
			this.getHotListData();
		},1000)	
	} ,
	onReachBottom() {
		if(this.HotGoodsListData.length<this.Index*10){
			this.loadStatus = 'nomore';
			return;
		}else{
			this.Index++;
			this.loadStatus = 'loading';
			// 模拟数据加载效果
			setTimeout(() => {
				this.getHotGoodsListData();
				this.loadStatus = 'loadmore';
			}, 1000);
		}
	},
	methods:{
		//获得轮播图数据
		getSwiperData(){				
			request('API_GetList_IndexBanner').then(res=>{	
				this.swiperData = res
			})
		},
		getShopListData(){
			request('API_GetList_IndexNavTrade',{pageSize:4}).then(res=>{
				this.ShopListData = res
			})
		},
		getHotListData(){
			request('API_GetList_ADRecord_CallIndex',{CallIndex:'ad0006'}).then(res=>{
				this.HotListData = res
			})
		},
		getHotGoodsListData(callBack){
			request('API_GetList_BusinessProductSearch',{CategoryID:0,BusinessID:0,Keywords:'',
						Longitude:this.LongItude,Latitude:this.LatItude,orderState:2,IsFL:1,IsBP:-1,
							pageSize:10,index:this.Index})	
			.then(res=>{
				this.HotGoodsListData = [...this.HotGoodsListData,...res]
				callBack && callBack()
			})							
		},
		getLocationData(){
			const QQMapWx = new QQMap_SDK({
				key:'FXCBZ-4H36W-FBDR5-O6E6O-KGQ27-MHB6U'
			})
			
			uni.getLocation({
				type:'wgs84',
				geocode:true,
				success: (res) => {
					console.log('获得经纬度成功')
					const {latitude,longitude} = res
					this.LatItude = latitude;
					this.LongItude = longitude;
					
					this.getHotGoodsListData()
				},
				fail:(err) => {
					console.log('获得经纬度失败' + err)
				},
				complete:() => {
					QQMapWx.reverseGeocoder({
						location: {
							latitude: this.LatItude,
							longitude: this.LongItude
						},
						success:(res)=>{
							//区
							let district =res.result.ad_info.district
							//路
							let path = res.result.address_component.street
							
							this.LocationData = district + path
							console.log(`解析地址成功,当前位置:${this.LocationData}`);
						},
						fail: function(res) {
							uni.showToast({
								title: '定位失败',
								duration: 2000,
								icon: "none"
							})
							console.log(res);
						}
					})
				}
			})
		},
		//商品详情页面(商品id,商店id,类别id)		
		toGoodsDetails(id,BusinessID,CategoryID){
			uni.navigateTo({
				url:`/pages/goodsdetails/goodsdetails?id=${id}&BusinessID=${BusinessID}&CategoryID=${CategoryID}&LatItude=${this.LatItude}&LongItude=${this.LongItude}`
			})
		},
		clear() {
			this.$refs.uWaterfall.clear();
		}
	}
}
</script>

<style>
/* page不能写带scope的style标签中，否则无效 */
page {
	background-color: rgb(240, 240, 240);
}
</style>

<style lang="scss" scoped>
.demo-warter {
	border-radius: 8px;
	margin: 5px;
	background-color: #ffffff;
	padding: 8px;
	position: relative;
}

.u-close {
	position: absolute;
	top: 32rpx;
	right: 32rpx;
}

.demo-img-wrap {
}

.demo-image {
	width: 100%;
	border-radius: 4px;
}

.demo-title {
	font-size: 30rpx;
	margin-top: 5px;
	color: $u-main-color;
}

.demo-tag {
	display: flex;
	margin-top: 5px;
	
	.subsidy{
		width: 240rpx;
		background: #ffffff;
		display: flex;
		align-items: center;
	}	
	.jintie {
		font-size: 22rpx;
		color: red;
		width: 60rpx;
		height: 36rpx;
		background: #fff1e4;
		border: 1rpx solid #f88c8c;
		display: flex;
		justify-content: center;
		align-items: center;
		border-top-left-radius: 5rpx;
		border-bottom-left-radius: 5rpx;
		border-right: 1px dashed #f88c8c;
	}
	.diyon{
		width: 140rpx;
		height: 36rpx;
		font-size: 22rpx;
		color: #eb544d;
		background-color: #FFFFFF;
		border: 1rpx solid #f88c8c;
		display: flex;
		justify-content: center;
		align-items: center;
		border-top-right-radius: 5rpx;
		border-bottom-right-radius: 5rpx;
		border-style: solid;
		border-left: 1rpx dashed #f88c8c;
	}
}

.demo-tag-owner {
	background-color: $u-type-error;
	color: #ffffff;
	display: flex;
	align-items: center;
	padding: 4rpx 14rpx;
	border-radius: 50rpx;
	font-size: 20rpx;
	line-height: 1;
}

.demo-tag-text {
	border: 1px solid $u-type-primary;
	color: $u-type-primary;
	margin-left: 10px;
	border-radius: 50rpx;
	line-height: 1;
	padding: 4rpx 14rpx;
	display: flex;
	align-items: center;
	border-radius: 50rpx;
	font-size: 20rpx;
}

.demo-price {
	font-size: 30rpx;
	color: $u-type-error;
	margin-top: 5px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	
	.sold{
		color: #999999;
		font-size: 20rpx;
		position: relative;
		left: 15rpx;
	}
}

.demo-shop {
	font-size: 22rpx;
	color: $u-tips-color;
	margin-top: 5px;
}
</style>
