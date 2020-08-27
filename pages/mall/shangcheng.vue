<template>
	<view class="content">
		<!-- <view class="bt">399专区</view> -->
		<view v-if="Switch == true">
			<ActivitiesTop :CarouselImageSrc="CarouselImageSrc" ></ActivitiesTop>
			
			<shangpingfenlei :GoodShops="GoodShops" :LongItude="LongItude" :LatItude="LatItude"></shangpingfenlei>
			
			<xianshiqianggo :Districts="Districts" :LongItude="LongItude" :LatItude="LatItude"></xianshiqianggo>
			
			<jinxtuijsp :adData="adData" :LongItude="LongItude" :LatItude="LatItude"></jinxtuijsp>
			
			<goolds :goodlsListData="goodlsListData" :menuList="menuList" :goods_All="goods_All" :LongItude="LongItude" :LatItude="LatItude"></goolds>
			
			<view class="isOver" v-if="DataisOver">----- 我是真的没有啦QAQ ------</view>  
		</view>
		<view v-else class="aaaaa">
			<image class="switch-img" :src="Switch_img"></image>
		</view>
		
	</view>
</template>

<script>
import {request} from '@/api/request.js'	
	import ActivitiesTop from "./components/ActivitiesTop.vue";
	import shangpingfenlei from "./components/shangpingfenlei.vue";
	import xianshiqianggo from "./components/xianshiqianggo.vue";
	import jinxtuijsp from "./components/jinxtuijsp.vue";
	import goolds from "./components/goolds.vue";
	
	export default {
		components: {
			ActivitiesTop:ActivitiesTop,
			shangpingfenlei:shangpingfenlei,
			xianshiqianggo:xianshiqianggo,
			jinxtuijsp:jinxtuijsp,
			goolds:goolds
		},
		
		data() {			
			return {
				//经度
				LongItude:114.92083,
				//纬度
				LatItude:25.81759,
				//轮播图数据
				CarouselImageSrc:[],
				//优选好店
				GoodShops:[],
				//商圈
				Districts:[],
				//广告数据
				adData:[],
				//商品数据
				goodlsListData:[],
				Index:0,
				//商品数据0
				goods_All:[],
				//滑动标题
				menuList:[],
				//开关
				Switch:false,
				Switch_img:"https://upload.xfgoo.com:8002/upload/ADImg/2020723/d28012a9214c455799fc77ae15a1405a.jpg"
			};
		},
		onReady() {
			this.getSildetitle()
			this.getSwitch()
		},
		onLoad() {
			this.getCurrentPosition();
			this.getCarouseImage();
			this.getCommercialStreet();
			this.getCallIndex();
			
		},
		onPullDownRefresh() {
			//刷新效果
			setTimeout(()=>{
				this.getCommercialStreet(()=>{
					uni.stopPullDownRefresh()
				})
				this.getCarouseImage();
				this.getCallIndex();
			},1000)	
			uni.stopPullDownRefresh()
		} ,
		methods: {
			getSwitch(){
				request('API_GetList_ADRecord_CallIndex',{CallIndex:"ad0099"}).then(res=>{
					if(res[0].ADR_PageParam == 0){
						this.Switch = true
					}
				})
			},
			//获得当前位置
			getCurrentPosition()
			{
				uni.getLocation({
					type:'gcj02',
					success:(request=>{
						var latitude,longitude;
						//纬度
						latitude = request.latitude.toString();
						this.LatItude = latitude;
						//经度
						longitude = request.longitude.toString();
						this.LongItude = longitude
					})
					
				})
				
				this.getGoodShops();
				this.getSeckillData();
			},
			//优选好店
			getGoodShops(){
				request('API_GetList_BusinessExchange_V2',{CircleID:0,
						TradeID:0,
						Keywords:'',
						Longitude:this.LongItude,
						Latitude:this.LatItude,
						orderState:1,
						pageSize:14,
						index:1,
						ProductPageSize:5}).then(res=>{
							this.GoodShops = res
						})
			},
			//商圈（连锁店）
			getCommercialStreet(){
				request('API_GetList_BusinessCircleSearch',{Keywords:'',pageSize:8,index:1}).then(res=>{
					this.Districts = res
				})
			},
			//轮播图
			getCarouseImage()
			{
				const CarouselImageSrcd = []
				
				request('API_GetList_ADRecord_CallIndex',{CallIndex:'ad0003'}).then(res=>{
					if(res.length==1){
						for(let i=0;i<3;i++){
							CarouselImageSrcd.push(res[0])
						}
						this.CarouselImageSrc = CarouselImageSrcd
					}
					else{
						this.CarouselImageSrc = res
					}
				})
			},
			getSildetitle(){
				request('API_GetList_ProductCategory',{pid:0}).then(res=>{
					let momentData = []
					for(let i=0;i<res.length;i++){
						momentData.push({Main_title:res[i].C_Name,id:res[i].id})
					}
					momentData.unshift({Main_title:"优选商品",id:"0"})
					this.menuList = momentData
					
					this.getGoodlist();
				})
			},
			getGoodlist(menuList){
				request('API_GetList_BusinessProductExchange_V2',{CircleID:0,
					CategoryID:0,
					BusinessID:'',
					Keywords:'',
					Longitude:this.LongItude,
					Latitude:this.LatItude,
					orderState:0,
					IsFL:'',
					IsBP:'',
					pageSize:50,
					index:1}).then(res=>{
						this.goods_All = res
					})
			},
			//商品数据
			getSeckillData(callBack)
			{
				request('API_GetList_BusinessProductExchange_V2',{CircleID:0,
						CategoryID:0,
						BusinessID:'',
						Keywords:'',
						Longitude:this.LongItude,
						Latitude:this.LatItude,
						orderState:1,
						IsFL:'',
						IsBP:'',
						pageSize:20,
						index:this.Index}).then(res=>{
							this.goodlsListData = [...this.goodlsListData,...res]
							callBack && callBack()
				})
			},
			getCallIndex()
			{
				request('API_GetList_ADRecord_CallIndex',{CallIndex:"ad0005"}).then(res=>{
					this.adData = res
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		.isOver
		{
			width: 100%;
			height: 80rpx;
			line-height: 50rpx;
			text-align: center;
			font-size: 28rpx;
		}
		.aaaaa{
			width: 750rpx;
			height: 2000rpx;
			.switch-img{
				width: 750rpx;
				height: 2000rpx;
			}
		}
		
		.bt{
			width: 100%;
			height: 100rpx;
			background: white;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 36rpx;
			font-weight: bold;
			color: #333333;
			padding-top: 30rpx;
		}
		.yuo{
			width: 130rpx;
			height: 80rpx;
			display: flex;
			align-items: center;
			flex-direction: row-reverse;
			image{
				width: 54rpx;
				height: 54rpx;
				margin-right: 20rpx;
			}
		}
		.zhong{
			width: 450rpx;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			p{
				width: 440rpx;
				height: 70rpx;
				border-radius: 40rpx;
				background: #F2F2F2;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 24rpx;
				color: #999999;
			}
		}
		.zuo{
			width: 180rpx;
			height: 80rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: row;
			font-size: 28rpx;
			font-weight: bold;
			p{
				margin: 0 10rpx 0 0;
			}
			
		}
		.tobu{
			width: 100%;
			height: 80rpx;
			background: white;
			display: flex;
			align-items: center;
			flex-direction: row;
			
		}
		.bt{
			position: sticky;
			top: 0;
			z-index: 4;
		}
	}
</style>
