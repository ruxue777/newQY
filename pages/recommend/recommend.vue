<template>
	<view class="content">
		<view class="dasdasfqd">
			<view class="top_title">
				<view class="nda">
					<u-icon name="arrow-left" size="40" @click="back"></u-icon>
				</view>
				<view class="nda2">
					<span v-if="pageType == 0">每日推荐</span>
					<span v-if="pageType == 1">主打产品</span>
					<span v-if="pageType == 2">{{titleName}}</span>
				</view>
			</view>
		
			<view class="tobu">
				<p v-for="(item,index) in list" :key="index"
				:data-index="index"
				:class="['item',currindex == index?'acitve':'']"
				@click="fun"
				>{{item.name}}</p>
			</view>
		</view>
		<view class="sp">
			<view class="spnk">
				<view class="cp" v-for="(item,index) in goodlsListData" :key="index" @click="toGoodsDetails(item.id,item.BusinessID,item.CategoryID)">
					<view class="s"><image :src="item.BP_ImgUrl"></image></view>
					<view class="x">
						<view class="diyi1"><p class="biaoti">{{item.BP_Name}}</p></view>
						<view class="diyi2"><p class="fubiaoti">{{item.BP_Desc}}</p></view>
						<view class="diyi3">
							<view class="z">
								<view class="shangmd">
									<span class="meiyfh">¥</span>
									<span class="jiage">{{item.BP_Amount}}</span>
									<span class="fkrs">{{item.BP_OrderIsSell}}人付款</span>
								</view>
								<view class="xiamd">
									<p class="w" v-if="item.BP_IntegralConsumeAmount != 0">
										<span class="jintie">补贴</span>
										<span class="diyong">可抵{{Math.floor(item.BP_IntegralConsumeAmount)}}元</span>
									</p>
								</view>
							</view>
							<view class="y">
								<u-icon name="shopping-cart" size="32" @click="back" color="red"></u-icon>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" ></u-loadmore>
	</view>
</template>

<script>
import {request} from '@/api/request.js'	
	export default{
		data(){
			return{
				index:0,
				currindex:0,
				//经度
				LongItude:'',
				//纬度
				LatItude:'',
				pageType:'',
				//标题名称
				titleName:'',
				//商品类别
				CategoryID:0,
				list:[
					{
						name:'综合'
					},
					{
						name:'销量'
					},
					{
						name:'新品'
					},
					{
						name:'价格'
					}
				],
				goodlsListData:[],
				loadStatus: 'loadmore',
				Index:1 
			}
		},
		//上拉加载
		onReachBottom() {
			if(this.goodlsListData.length<this.Index*10){
				this.loadStatus = 'nomore';
				return;
			}else{
				this.Index++;
				this.loadStatus = 'loading';
				// 模拟数据加载效果
				setTimeout(() => {
					if(this.pageType == 0){
						this.getRecommendedDaily()
					}else if(this.pageType == 1){
						this.getBaoPingData()
					}else{
						this.getGoodsList()
					}
					this.loadStatus = 'loadmore';
				}, 1000);
			}
		},
		//下拉刷新
		onPullDownRefresh()
		{
			this.Index = 1
			this.goodlsListData = []
			//刷新效果
			if(this.pageType == 0){
				this.getRecommendedDaily()
			}else if(this.pageType == 1){
				this.getBaoPingData()
			}else{
				this.getGoodsList()
			}
			
		},
		onLoad(e) 
		{	
			this.LongItude = e.LongItude
			this.LatItude = e.LatItude
			this.pageType = e.pageType
			this.titleName = e.titleName
			this.CategoryID = e.CategoryID 
			
			if(e.pageType == 0)
			{
				this.getRecommendedDaily()
			}
			else if(e.pageType == 1)
			{
				this.getBaoPingData()
			}
			else if(e.pageType == 2)
			{
				this.getGoodsList()
			}
		},
		methods:{
			fun(e){
				let a = e.currentTarget.dataset.index
				this.index = a
				this.currindex = this.index
			},
			back(){
				uni.navigateBack()
			},
			toGoodsDetails(id,BusinessID,CategoryID){
				uni.navigateTo({
					url:`/pages/goodsdetails/goodsdetails?id=${id}&BusinessID=${BusinessID}&CategoryID=${CategoryID}&LatItude=${this.LatItude}&LongItude=${this.LongItude}`
				})
			},
			//每日推荐
			getRecommendedDaily(callBack){
				request('API_GetList_BusinessProductSearch_V2',{CategoryID:this.CategoryID,CircleID:0,BusinessID:0,Keywords:'',Longitude:this.LongItude,Latitude:this.LatItude,orderState:2,IsFL:-1,IsBP:-1,
					pageSize:10,index:this.Index}).then(res=>{	
						if(res.length<10){
							this.loadStatus = 'nomore'
						}
						this.goodlsListData = [...this.goodlsListData,...res]
						callBack && callBack()		
				})
			},
			getBaoPingData(callBack){
				request('API_GetList_BusinessProductSearch_V2',{CategoryID:this.CategoryID,CircleID:0,BusinessID:0,Keywords:'',Longitude:this.LongItude,Latitude:this.LatItude,orderState:2,IsFL:0,IsBP:0,
					pageSize:10,index:this.Index}).then(res=>{
						if(res.length<10){
							this.loadStatus = 'nomore'
						}
						this.goodlsListData = [...this.goodlsListData,...res]
						callBack && callBack()		
				})
			},
			getGoodsList(callBack){
				request('API_GetList_BusinessProductSearch_V2',{CategoryID:this.CategoryID,CircleID:0,BusinessID:0,Keywords:'',Longitude:this.LongItude,Latitude:this.LatItude,orderState:2,IsFL:1,IsBP:0,
					pageSize:10,index:this.Index}).then(res=>{
						if(res.length<10){
							this.loadStatus = 'nomore'
						}
						this.goodlsListData = [...this.goodlsListData,...res]
						callBack && callBack()		
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content{
		.dasdasfqd{
			position: sticky;
			top: 0;
			left: 0;
			z-index: 2;
		}
		.top_title{
			width: 100%;
			height: 100rpx;
			display: flex;
			background: white;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			padding-top: 40rpx;
		}
		.nda{
			width: 100%;
			height: 50rpx;
			display: flex;
			align-items: center;
			flex-direction: row;
			u-icon{
				position: relative;
				left: 30rpx;
			}
		}
		.nda2{
			width: 100%;
			height: 50rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: -50rpx;
		}
		
		.acitve{
			font-size: 30rpx;
			font-weight: bold;
			color: #ff9900;
			border-bottom: 4rpx solid #FFB400; 
		}
		.item{
			font-size: 30rpx;
			margin-left: 40rpx;
		}
		.meiyfh {
			font-size: 20rpx;
			color: #eb544d;
			margin-top: 6rpx;
		}
		.jiage {
			font-size: 30rpx;
			font-weight: bold;
			color: #eb544d;
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
		.diyong {
			font-size: 22rpx;
			color: #EB544D;
			width: 140rpx;
			height: 36rpx;
			background: #ffffff;
			border: 1rpx solid #f88c8c;
			display: flex;
			justify-content: center;
			align-items: center;
			border-top-right-radius: 5rpx;
			border-bottom-right-radius: 5rpx;
			border-style: solid;
			border-left: 1rpx dashed #f88c8c;
		}
		.w {
			display: flex;
			flex-direction: row;
		}
		.fkrs {
			font-size: 20rpx;
			margin-left: 10rpx;
			margin-top: 6rpx;
			color: #999999;
		}
		.cp {
			width: 340rpx;
			height: 566rpx;
			background: #FFFFFF;
			margin-bottom: 16rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			border-radius: 15rpx;
			-moz-box-shadow:0px 1px 5px #F0F0F0; -webkit-box-shadow:0px 1px 5px #F0F0F0; box-shadow:0px 1px 5px #F0F0F0;
		}
		.s {
			width: 340rpx;
			height: 340rpx;
			background: #F76260;
			border-top-left-radius: 15rpx;
			border-top-right-radius: 15rpx;
			
			image {
				width: 340rpx;
				height: 340rpx;
				border-top-left-radius: 15rpx;
				border-top-right-radius: 15rpx;
			}
		}
		.x {
			width: 340rpx;
			height: 220rpx;
			background: #FFFFFF;
			border-bottom-left-radius: 15rpx;
			border-bottom-right-radius: 15rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
		}
		.diyi1 {
			width: 310rpx;
			height: 40rpx;
			background: #FFFFFF;
			margin-left: 3rpx;
			display: flex;
			align-items: center;
		}
		.biaoti {
			font-size: 26rpx;
			color: #222222;
		}
		.diyi2 {
			width: 310rpx;
			height: 40rpx;
			background: #FFFFFF;
			margin-left: 3rpx;
			display: flex;
			flex-direction: row;
			overflow: hidden;
			margin-top: 10rpx;
		}
		.fubiaoti {
			font-size: 26rpx;
			color: #5a5a5a;
		}
		.diyi3 {
			width: 310rpx;
			margin-left: 3rpx;
			margin-top: 15rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: row;
		}
		.z {
			width: 240rpx;
			background: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
		}
		.y {
			width: 70rpx;
			background: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: row-reverse;
	
		}
		.shangmd {
			width: 240rpx;
			height: 50rpx;
			background: #FFFFFF;
			display: flex;
			align-items: center;
			flex-direction: row;
		}
		.xiamd {
			width: 240rpx;
			background: #FFFFFF;
			display: flex;
			align-items: center;
		}	
		
		.spnk{
			width: 700rpx;
			display: flex;
			justify-content: space-between;
			flex-direction: row;
			flex-wrap: wrap;
		}
		.sp{
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.t{
			image{
				width: 40rpx;
				height: 40rpx;
				margin-left: 26rpx;
				margin-top: 10rpx;
			}
		}
		.tobu{
			width: 100%;
			height: 100rpx;
			background: white;
			border-bottom: 2rpx solid #f2f2f2;
			display: flex;
			align-items: center;
			flex-direction: row;
		}
	}
</style>
