<template>
	<view class="drawer">
		<scroll-view class="uni-swiper-tab  u-p-l-20 u-p-r-20" scroll-x :scroll-left="0">
		    <!--view class="swiper-tab-list uni-bold"><label>自选</label></view-->
			<view @click="onClick(item.id)" style="width: 130rpx;float: left;" v-for="(item, index) in areaList_" :key="index">
				<label :class="item.id == id ? 'active' : ''">{{item.name}}</label>
			</view>
		</scroll-view>
		<view class="u-m-t-30">
		<view  @click="onChangeType(index)" v-for="(item, index) in marketList_" :key="index" class="u-padding-10">
			<u-row gutter="0" justify="space-between">
				<u-col span="12" >
					{{item.symbol}}
				</u-col>
				<u-col span="12">
					<text class="uni-h5 u-p-r-10" :class="item.ch > 0 ? ' uni-up' : ' uni-down'">{{item.price}}</text>
				</u-col>
			</u-row>
		</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			areaList: {},
			marketList: {}
		},
		data() {
			return {
				tabIndex: 0,
				id:4 
			}
		},
		computed: {
			areaList_() {
				return this.areaList;
			},
			marketList_() {
				return this.marketList;
			}
		},
		methods: {
			onClick(id) {
				this.$emit('change',id)
				this.id = id;
			},
			onChangeType(id){
				this.$emit('coinclass',this.marketList[id])
			}
		}
	}
</script>

<style lang='scss'>
	.drawer{
		padding-top: 20upx;
		width: 100%;
	}
	.drawer .active{
		color: #000000;
		border-bottom: 6upx solid #007AFF;
	}
</style>
