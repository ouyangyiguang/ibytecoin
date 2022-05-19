<template>
	<qs-page class="page">

	<view class="u-content">
		<u-parse :html="content" :selectable="true"></u-parse>
	</view>
	
	</qs-page>
</template>

<script>

export default {

	data() {
		return {
			content:''
		};
	},
	 onLoad(option){
	   let query=JSON.parse(option.query);
	   let title=query.title;
	   uni.setNavigationBarTitle({title});
	   let aid=query.aid;
       this.articleview(aid);
	},

	methods: {
		articleview(aid){
                return new Promise((resolve, reject) => {
                    this.$api('archives.article_view', {
						aid:aid
					}).then(res => {
						if (res.code==200){
							this.content=res.data.content
						}
                    }).catch((e)=>{
                        resolve(false);
                    });
                })
		},
	},
};
</script>

<style lang="scss" scoped>
    .u-content{
		padding: 30rpx;
		color: $u-content-color;
		font-size: 32rpx;
		line-height: 1.8;
		
		// 标签形式无效
		p {
			color: $u-tips-color;
		}
	}
</style>
