<template>
	<view>
		<topSeek></topSeek>
		<topSwiper :swiperData="swiperData"></topSwiper>
		<centralNav></centralNav>
	</view>
</template>

<script>
//请求组件
import {request} from '../../api/request.js'
//样式组件
import topSeek from "./components/topSeek.vue";	
import topSwiper from "./components/topSwiper.vue";
import centralNav from"./components/centralNav.vue"
	
export default {
	components:{
		topSeek:topSeek,
		topSwiper:topSwiper,
		centralNav:centralNav
	},
	data() {
		return {
			swiperData:[]
		};
	},
	onLoad() {
		this.getSwiperData()
	},
	methods:{
		//获得轮播图数据
		getSwiperData(){				
			request('API_GetList_IndexBanner').then(res=>{	
				this.swiperData = res
			})
		}
	}
}
</script>

<style lang="less" scoped>
	
</style>
