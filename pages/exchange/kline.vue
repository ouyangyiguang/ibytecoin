<template>
	<qs-page>
			<web-view :src="serverurl"></web-view>
	</qs-page>
</template>


<script>
import {mapState,mapMutations} from 'vuex';
import {SERVER_URL} from '@/env';

export default {
	data(){
		return {
			flow_list:[],
			hasLogin:false,
			loadStatus: 'loadmore',
			loadstatus:false,
			loadstxt:'loading...',
			serverurl:'',
		};
	},
	computed: {
	  ...mapState(['user']),
	},
	onLoad() {
		this.serverurl=SERVER_URL+'/vueapi/Exchange/chartkline';
		console.log(this.serverurl)
	},

	methods: {

	},
};



</script>
<style lang="scss" scoped>
	
</style>
