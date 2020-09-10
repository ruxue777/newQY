<template>
	<view>
		<topGoodsdetails :GoodsData="GoodsData" v-on:share="show = true"></topGoodsdetails>
		<recommend v-if="BusinessData.length>1" :BusinessData="BusinessData" :LatItude="LatItude" :LongItude="LongItude"></recommend>
		<shopDetails :MerchantData="MerchantData" :LatItude="LatItude" :LongItude="LongItude"></shopDetails>
		<goodsH5 :GoodsData="GoodsData"></goodsH5>
		<moreGoods :MoreData="MoreData" :BusinessData="BusinessData" :LatItude="LatItude" :LongItude="LongItude"></moreGoods>
		<view class="navigation">
			<view class="left">
				<view class="item" @click="toIndex">
					<image src="../../static/image/toIndex.png"></image>
					<view class="text u-line-1">首页</view>
				</view>
				<view class="item" @click="call">
					<image src="../../static/image/call.png"></image>
					<view class="text u-line-1">联系商家</view>
				</view>
				<view class="item" @click="show = true">
					<image src="../../static/image/share_it.png"></image>
					<view class="text u-line-1">分享</view>
					
				</view>
			</view>
			<view class="right">
				<view class="btn">
					<u-button shape="circle" ripple="true" type="warning" @click="toSubmitOrders">马上购买</u-button>
				</view>
			</view>
		</view>	
	
	<!-- 反馈组件 -->
	<qrcode-poster ref="poster" :title="GoodsData.BP_Name" :subTitle="GoodsData.BP_Desc" :headerImg="GoodsData.BP_ImgUrl" :price="GoodsData.BP_Amount" :abImg="AdSubimg"></qrcode-poster>
	<u-popup v-model="show" mode="bottom" border-radius="20">
		<view class="popup-share">
			<view class="top">分享</view>
			<view class="bottom">
				<view class="popup-left">
					<u-icon name="weixin-fill" size="56" color="#18b566"></u-icon>
					<text>分享给微信好友</text>
					<button class="share" open-type="share"></button>
				</view>
				<view class="popup-right" @click="sharePoster">
					<u-icon name="download" size="56" color="#f29100"></u-icon>
					<text>保存图片到本地</text>
				</view>
			</view>
		</view>
	</u-popup>
	</view>
</template>
<script>
import topGoodsdetails from './components/topGoodsdetails.vue';
import recommend from './components/recommend.vue';
import shopDetails from './components/shopDetails.vue';
import goodsH5 from './components/goodsH5.vue';
import moreGoods from './components/moreGoods.vue';
// 请求组件
import {request,wxRequest} from '@/api/request.js'
//海报
import QrcodePoster  from '@/components/zhangyu-qrcode-poster/zhangyu-qrcode-poster.vue'

	export default {
		components:{
			topGoodsdetails:topGoodsdetails,
			recommend:recommend,
			shopDetails:shopDetails,
			goodsH5:goodsH5,
			moreGoods:moreGoods,
			QrcodePoster:QrcodePoster
		},
		data() {
			return {
				//商品id
				id:'',
				//商铺id
				BusinessID:'',
				CategoryID:'',
				LatItude:'',
				LongItude:'',
				//商品详情数据
				GoodsData:[],
				//店铺数据
				MerchantData:[],
				//店铺商品详情
				BusinessData:[],
				Phone:'',
				//核销点数据
				WriteoffData:[],
				//更多商品数据
				MoreData:[],
				//分享弹窗
				show:false,
				wxQrCode:'',
				//分享广告副图
				AdSubimg:''
			};
		},
		onLoad(e){
			let scene = decodeURIComponent(e.scene);
			if(null != scene && '' != scene && undefined != scene && scene != 'undefined'){
				var array = scene.split(',');
				this.id = array[0];
				this.BusinessID = array[1];
				this.CategoryID= array[2]
				this.LatItude = array[3];
				this.LongItude = array[4];
			}else{
				this.id = e.id;
				this.BusinessID = e.BusinessID;
				this.CategoryID= e.CategoryID
				this.LatItude = e.LatItude;
				this.LongItude = e.LongItude;
			}
			
			this.getGoodsDatails()
			this.getMerchantData()
			this.getBusinessData()
			this.getWriteoffData()
			this.getMoreData()
			this.getGoods_wxQrCode()
			this.getAdSubimg()
		},
		onShareAppMessage(res) {
			return {
				title: this.GoodsData.BP_Desc,
				path:`/pages/goodsdetails/goodsdetails?id=${this.GoodsData.id}&BusinessID=${this.GoodsData.BusinessID}&CategoryID=${this.GoodsData.CategoryID}&LatItude=${this.LatItude}&LongItude=${this.LongItude}`,
				imageUrl: this.GoodsData.BP_ImgUrl
			};
		},
		methods:{
			//分享海报
			sharePoster(){
				this.show = false;
				//获取带参数二维码并传递
				this.$refs.poster.showCanvas(this.wxQrCode)
			},
			//商品详情
			getGoodsDatails(){
				request('API_GetInfo_BusinessProductSearch',{ProductID:this.id,Longitude:this.LongItude,Latitude:this.LatItude}).then(res=>{
					this.GoodsData = res
				})
			},
			//店铺详情
			getMerchantData(){
				request('API_GetInfo_BusinessSearch',{BusinessID:this.BusinessID,Longitude:this.LongItude,Latitude:this.LatItude}).then(res=>{
					this.MerchantData = res
					this.Phone = res.Phone
				})
			},
			//店铺商品详情
			getBusinessData(){
				request('API_GetList_BusinessProductSearch',{CategoryID:0,BusinessID:this.BusinessID,Keywords:'',Longitude:this.LongItude,Latitude:this.LatItude,
					orderState:0,IsFL:'',IsBP:'',pageSize:6,index:1}).then(res=>{
					this.BusinessData = res
				})
			},
			//核销点详情
			getWriteoffData(){
				request('API_GetList_BusinessSearch_ForDetailCheckBusiness',{ProductID: this.id,Longitude:this.LongItude,Latitude:this.LatItude,pageSize: 10,index: 1}).then(res=>{
					console.log(res)
				})
			},
			//商品小程序二维码
			getGoods_wxQrCode(){
				wxRequest('API_GetWxappQR',{scene:`${this.id},${this.BusinessID},${this.CategoryID},${this.LongItude},${this.LatItude}`,page:'pages/goodsdetails/goodsdetails'}).then(res=>{
					this.wxQrCode = res.result_content
				})
			},
			getMoreData(){
				request('API_GetList_BusinessProductSearch',{CategoryID:this.CategoryID,BusinessID:0,Keywords:'',Longitude:this.LongItude,Latitude:this.LatItude,orderState:1,
					IsFL:-1,IsBP:-1,pageSize:6,index:1}).then(res=>{
						this.MoreData = res
				})
			},
			getAdSubimg(){
				request('API_GetList_ADRecord_CallIndex',{CallIndex:"ad0099"}).then(res=>{
					this.AdSubimg = res[1].ADR_ImgUrl
				})
			},
			toIndex(){
				uni.switchTab({url:'/pages/index/index'})
			},
			call(){
				uni.makePhoneCall({
					phoneNumber: this.ShopMobile
				});
			},
			toSubmitOrders(){			
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
					uni.navigateTo({
						url:`/pages/order/submitOrders?GoodsDatails=${encodeURIComponent(JSON.stringify(this.GoodsData))}&user_id=${userInfo.user_id}&LongItude=${this.LongItude}&LatItude=${this.LatItude}`
					});				
					return;
				}
			}
		}
	}
</script>

<style lang="less">
.navigation {
	width: 750rpx;
	display: flex;
	border: solid 2rpx #f2f2f2;
	background-color: #ffffff;
	padding: 16rpx 0;
	position:fixed;
	bottom:0;
	z-index: 110;
	
	.left {
		width: 375rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		font-size: 20rpx;
		
		.item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: relative;
			
			image{
				width: 42rpx;
				height: 42rpx;
			}
			
			&.car {
				text-align: center;
				position: relative;
				.car-num {
					position: absolute;
					top: -10rpx;
					right: -10rpx;
				}
			}
		}
	}
	.right {
		width: 375rpx;
		display: flex;
		font-size: 28rpx;
		align-items: center;
		justify-content: center;
		.btn {
			width:330rpx;
			height:80rpx;
			font-size:30rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(0,0,0,1);
			opacity:0.9;
			
			u-button{
				color: rgba(255, 186, 0, 1);
			}
		}
	}
}

.popup-share{
	width: 100%;
	height: 200rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	
	.top{
		width: 100%;
		height: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30rpx;
		background-color: #f4f4f4;
	}
	
	.bottom{
		width: 100%;
		height: 160rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		
		.popup-left,.popup-right{
			width: 260rpx;
			height: 130rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: relative;
			
			.share{
				width: 260rpx;
				height: 130rpx;
				position: absolute;
				z-index: 1;
				opacity: 0;
			}
		}
	}
}
</style>
