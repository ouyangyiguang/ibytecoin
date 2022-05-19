<template>
	<qs-page>
		<view class="u-padding-20 ">
			<u-gap height="240"></u-gap>
			<view class="u-text-center">{{title}}</view>
             
			<u-gap height="40"></u-gap>
			<view class="u-text-center">{{msg}}</view>
			<u-gap height="40"></u-gap>
			<u-button type="primary" @click="$tools.routerTo('/pages/index/index')">返回首页</u-button>
		</view>
			
	</qs-page>
</template>


<script>
import {mapState,mapMutations} from 'vuex';
export default {
	data(){
		return {
			flow_list:[],
			hasLogin:false,
			loadStatus: 'loadmore',
			loadstatus:false,
			loadstxt:'loading...',
			title:'',
			msg:''
		};
	},
	computed: {
	  ...mapState(['user']),
	},
	 onLoad(option){
       this.title=option.title;
	   this.msg=option.msg;
	   console.log(option);
	},

	methods: {

	},
};
</script>
<style lang="scss" scoped>
	
</style>
