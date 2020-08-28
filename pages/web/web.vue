<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="webUrl"></web-view>
	</view>	
</template>

<script>
	export default{
		data()
		{
			return{
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},
				webUrl:''
			};
		},
		onLoad(e)
		{	
			this.webUrl = JSON.parse(decodeURIComponent(e.webUrl))
		}
	}
	
</script>

<style>
</style>
