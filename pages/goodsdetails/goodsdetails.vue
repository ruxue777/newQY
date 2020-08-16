<template>
	<view>
		<topGoodsdetails :GoodsData="GoodsData"></topGoodsdetails>
		<recommend></recommend>
		<shopDetails :MerchantData="MerchantData"></shopDetails>
		<goodsH5 :GoodsData="GoodsData"></goodsH5>
		<moreGoods :MoreData="MoreData"></moreGoods>
		<navigation :ShopMobile="Phone"></navigation>
	</view>
</template>

<script>
import topGoodsdetails from './components/topGoodsdetails.vue';
import recommend from './components/recommend.vue';
import shopDetails from './components/shopDetails.vue';
import goodsH5 from './components/goodsH5.vue';
import moreGoods from './components/moreGoods.vue';
import navigation from './components/navigation.vue';
// 请求组件
import {request} from '@/api/request.js'

	export default {
		components:{
			topGoodsdetails:topGoodsdetails,
			recommend:recommend,
			shopDetails:shopDetails,
			goodsH5:goodsH5,
			moreGoods:moreGoods,
			navigation:navigation
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
				Phone:'',
				//核销点数据
				WriteoffData:[],
				//更多商品数据
				MoreData:[]
			};
		},
		onLoad(e){
			this.id = e.id;
			this.BusinessID = e.BusinessID;
			this.CategoryID= e.CategoryID
			this.LatItude = e.LatItude;
			this.LongItude = e.LongItude;
			
			this.getGoodsDatails()
			this.getMerchantData()
			this.getWriteoffData()
			this.getMoreData()
		},
		methods:{
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
			//核销点详情
			getWriteoffData(){
				request('API_GetList_BusinessSearch_ForDetailCheckBusiness',{ProductID: this.id,Longitude:this.LongItude,Latitude:this.LatItude,pageSize: 10,index: 1}).then(res=>{
					console.log(res)
				})
			},
			getMoreData(){
				request('API_GetList_BusinessProductSearch',{CategoryID:this.CategoryID,BusinessID:0,Keywords:'',Longitude:this.LongItude,Latitude:this.LatItude,orderState:1,
					IsFL:-1,IsBP:-1,pageSize:6,index:1}).then(res=>{
						this.MoreData = res
				})
			}
		}
	}
</script>

<style lang="less">
navigation{
	position:fixed;
	bottom:0;
	z-index: 110;
}
</style>
