<template>
	<view>
		<!-- <u-popup v-model="show">
			<view>出淤泥而不染，濯清涟而不妖</view>
		</u-popup>
		<u-button @click="show = true">打开</u-button> -->
		<top_seek></top_seek>
	</view>
</template>

<script>
//请求组件
import {request} from '../../api/request.js'
//样式组件
import top_seek from "./components/top_seek.vue";	
	
export default {
	components:{
		"top_seek":top_seek
	},
	data() {
		return {
			title:'test',
			list: [{
				text: '点赞',
				color: 'blue',
				fontSize: 28
			}, {
				text: '分享'
			}, {
				text: '评论'
			}],
			show: false,
			keyword:''
		};
	},
	onLoad() {
		this.getData()
	},
	methods:{
		getData(){
			let url = 'API_GetList_BusinessCircleSearch'
			let data = {Keywords:'',
						pageSize:8,
						index:1}
			request(url,data).then(res=>{
				console.log(res)
			})
		}
	}
}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
