<template>
	<view>
		<topSeek></topSeek>
		<topSwiper :swiperData="swiperData"></topSwiper>
		<centralNav></centralNav>
		<zhixunlan></zhixunlan>
		<bottomWaterfall></bottomWaterfall>
	</view>
</template>

<script>
//请求组件
import {request} from '../../api/request.js'
//样式组件
import topSeek from "./components/topSeek.vue";	
import topSwiper from "./components/topSwiper.vue";
import centralNav from"./components/centralNav.vue"
import zhixunlan from "./components/zhixunlan.vue"
import bottomWaterfall from "./components/bottomWaterfall.vue"

export default {
	components:{
		topSeek:topSeek,
		topSwiper:topSwiper,
		centralNav:centralNav,
		zhixunlan:zhixunlan,
		bottomWaterfall:bottomWaterfall
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
