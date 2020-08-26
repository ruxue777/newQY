<template>
	<view class="main">
		<topShopImg :MerchantData="MerchantData"></topShopImg>
		<shopGoods v-if="BusinessData.length != 0" :BusinessData="BusinessData" :LatItude="LatItude" :LongItude="LongItude"></shopGoods>	
		<shopH5 :MerchantData="MerchantData"></shopH5>
	</view>
</template>

<script>
import topShopImg from './components/topShopImg.vue';
import shopGoods from './components/shopGoods.vue'
import shopH5 from './components/shopH5.vue'
import {request} from '@/api/request.js'	
	export default {
		components:{
			topShopImg:topShopImg,
			shopGoods:shopGoods,
			shopH5:shopH5
		},
		data() {
			return {
				BusinessID:0,
				LatItude:'',
				LongItude:'',
				//商铺详情
				MerchantData:[],
				//商铺商品详情
				BusinessData:[],
			};
		},
		onLoad(e) {
			this.BusinessID = e.BusinessID;
			this.LatItude = e.LatItude;
			this.LongItude = e.LongItude;
			
			this.getBusinessData();
			this.getMerchantData()
		},
		methods:{
			//店铺详情
			getMerchantData(){
				request('API_GetInfo_BusinessSearch',{BusinessID:this.BusinessID,Longitude:this.LongItude,Latitude:this.LatItude}).then(res=>{
					this.MerchantData = res
				})
			},
			//店铺商品详情
			getBusinessData(){
				request('API_GetList_BusinessProductSearch',{CategoryID:0,BusinessID:this.BusinessID,Keywords:'',Longitude:this.LongItude,Latitude:this.LatItude,
					orderState:0,IsFL:'',IsBP:'',pageSize:20,index:1}).then(res=>{
					this.BusinessData = res
				})
			},
		}
	}
</script>

<style lang="less">

</style>
