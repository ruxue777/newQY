<template>
	<view>
		<topSeek></topSeek>
		
	</view>
</template>

<script>
//请求组件
import {request} from '../../api/request.js'
//样式组件
import topSeek from "./components/topSeek.vue";	
	
export default {
	components:{
		"topSeek":topSeek
	},
	data() {
		return {
			
		};
	},
	onLoad() {
		this.getData()
	},
	methods:{
		getData(){	
						
			request('API_GetList_BusinessCircleSearch',{Keywords:'',pageSize:8,index:1})
				.then(res=>{
					console.log(res)
				})
		}
	}
}
</script>

<style lang="less" scoped>
	
</style>
