<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<u-action-sheet :list="list" v-model="show"></u-action-sheet>
	</view>
</template>

<script>
import {request} from '../../api/request.js'	
	export default {
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
			show: true
			
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
