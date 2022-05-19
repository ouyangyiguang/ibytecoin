<template>
  <view class="pmain">
    <view class="item">
			<text class="price">价格</text>
			<text class="num">数量</text>
		</view>
		<view class="item uni-down buy"  v-for="(item, index) in translist.buy_newlist">
			<text class="price">{{item.price}}</text>
			<text class="num">{{item.num}}</text>
			<view class="bg " :style="{width:item.baifeibi+'%'}"></view>
		</view>

		
		<view class="current-price">
			<view class="">{{exchangelist.msg}}</view>
		</view>
		
		<view class="item uni-down sell" v-for="(item, index) in translist.sale_newlist">
			<text class="price">{{item.price}}</text>
			<text class="num">{{item.num}}</text>
			<view class="bg" :style="{width:item.baifeibi+'%'}"></view>
		</view>
  </view>
</template>

<script>
export default {
  props: {
    item: Object,
	translist:{},
	exchangelist:{},
  },
  data() {
	  return {
	  	popoverVisible: false,
		depthValue: 1
	  }
  },
  computed: {
  },
  methods: {
  	depthClick(e) {
		this.popoverVisible = !this.popoverVisible;
  	},
	depthChange(e) {
		this.depthValue = e;
		this.$emit('depthChange', e);
	}
  }
}
</script>

<style lang="scss" scoped>
  .pmain {
    width: 98%;
    position: relative;
    justify-content: space-between;
    text-align: left;
	z-index: 0;
	padding-right: 2%;
	
	.item{
		position: relative;
		width: 100%;
		display: flex;
		font-size: 24upx;
		line-height: 40upx;
		.bg{
			height: 100%;
			position: absolute;
			top: 0;
			right: 0;
			z-index: 1;
		}
		.price{
			display: block;
			width: 50%;
			text-align: left;
			z-index: 999;
		}
		.num{
			display: block;
			width: 50%;
			text-align: right;
			padding-right: 10upx;
			z-index: 999;
		}
		&.buy{
			color: red;
			.bg{background: red;opacity: 0.2;}
		}
		&.sell{
			color: green;
			.bg{background: green;opacity: 0.2;}
			
		}
	}
  }

	.current-price{margin: 20upx auto; font-size:26rpx}
</style>
