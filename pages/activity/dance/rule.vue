<template>
	<view class="main">
		<u-navbar title="活动规则"></u-navbar>
		<view class="u-content">
			<u-parse :html="RuleActivity"></u-parse>
		</view>
	</view>
</template>

<script>
import {request} from '@/api/request.js';	
	export default {
		data() {
			return {
				MSS_id:'',
				RuleActivity:''
			};
		},
		onLoad(e) {
			this.MSS_id = e.MSS_id
			this.getRuleActivity()
		},
		methods:{
			getRuleActivity(){
				request('API_GetInfo_SpecialSubject_Reward',{MSS_id:this.MSS_id}).then(res=>{
					this.RuleActivity = res.MSS_Content
				})
			}
		}
	}
</script>

<style lang="less">
.u-content{
	margin-top: 100rpx;
}
</style>
