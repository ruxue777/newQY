<template>
	<view>
		<topGoodsdetails :GoodsData="GoodsData"></topGoodsdetails>
		<recommend></recommend>
		<shopDetails></shopDetails>
		<goodsH5 :GoodsData="GoodsData"></goodsH5>
		<moreGoods></moreGoods>
		<navigation></navigation>
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
				LatItude:'',
				LongItude:'',
				//商品详情数据
				GoodsData:[],
				//店铺数据
				MerchantData:[]
			};
		},
		onLoad(e){
			this.id = e.id;
			this.BusinessID = e.BusinessID;
			this.LatItude = e.LatItude;
			this.LongItude = e.LongItude;
			
			this.getGoodsDatails()
			this.getMerchantData()
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
				})
			},
			//核销点详情
		}
	}
</script>

<style lang="less">
navigation{
	position:fixed;
	bottom:0;
}
</style>
