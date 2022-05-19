<template>
  <view class="order">
	  <u-gap height="16" bg-color="#f3f4f6"></u-gap>
	  <view class="cu-bar">
	<u-tabs name="cate_name" :list="tabslist" :is-scroll="false" :current="current" @change="change"
		 inactive-color	="#919FAC"
		 :active-item-style="tabsstyle"
		 :bar-style="bartype"
		 bar-width="108"
		 active-color="#2864E8"
		 duration="0">
	 </u-tabs>
	  
    </view>
	<u-empty text="- 暂无记录 -" mode="data" :show="flow_list.length === 0&&translist.myent === ''&&current==0" class="u-margin-30"></u-empty>
	
	<view  class="trans" v-if="current==0">
	<view v-if="translist.myent!=''">
	<view class="u-text-center u-padding-20">-我的委托-</view>
		<view class="base-panel-box">
			<view class="item">
			<u-row gutter="0" justify="space-between">
				<u-col span="1" text-align="center">
					<view>方向</view>
				</u-col>
				<u-col span="3" text-align="center">
					<view>价格</view>
				</u-col>
				<u-col span="3" text-align="center">
					<view>数量</view>
				</u-col>
				<u-col span="3" text-align="center">
					<view>时间</view>
				</u-col>
				<u-col span="2" text-align="center">
					<view>操作</view>
				</u-col>
			</u-row>
			</view>
		
			<view class="item"  v-for="(item, index) in translist.myent" :key="index">
			<u-row gutter="0" justify="space-between">
				<u-col span="1" text-align="center">
					<view class="flag" :style="{ color: item.flag == 0 ? '#ff1e0f' : item.flag == 1 ? '#00b7ff' : '#ff1e0f' }">
						{{ item.flag == 0 ? '卖出' : item.flag == 1 ? '买入' : '' }}
					</view>
				</u-col>
				<u-col span="3" text-align="center">
					<view>{{(item.price*1).toFixed(4)}}</view>
				</u-col>
				<u-col span="3" text-align="center">
					<view>{{item.num}}</view>
				</u-col>
				<u-col span="3" text-align="center">
					<view class="bg-purple-light u-font-xs">{{item.addtime}}</view>
				</u-col>
				<u-col span="2" text-align="center">
					<u-button size="mini" type="primary"  @click="cancel(item.id,index)">取消</u-button>
				</u-col>
			</u-row>
			</view>
			</view>
		</view>
	<view v-if="flow_list.length>0">
	<view class="u-text-center u-padding-20">-我的成交-</view>
		<view class="base-panel-box">
			<view class="item">
			<u-row gutter="0" justify="space-between">
				<u-col span="2" text-align="center">
					<view>方向</view>
				</u-col>
				<u-col span="3" text-align="center">
					<view>价格</view>
				</u-col>
				<u-col span="3" text-align="center">
					<view>数量</view>
				</u-col>
				<u-col span="4" text-align="center">
					<view>时间</view>
				</u-col>
			</u-row>
			</view>
		
			<view class="item"  v-for="(item, index) in flow_list" :key="index">
			<u-row gutter="0" justify="space-between">
				<u-col span="2" text-align="center">
					<view class="flag" :style="{ color: item.flag == 0 ? '#ff1e0f' : item.flag == 1 ? '#00b7ff' : '#ff1e0f' }">
						{{ item.flag == 0 ? '卖出' : item.flag == 1 ? '买入' : '' }}
					</view>
				</u-col>
				<u-col span="3" text-align="center">
					<view>{{(item.price*1).toFixed(4)}}</view>
				</u-col>
				<u-col span="3" text-align="center">
					<view>{{item.num}}</view>
				</u-col>
				<u-col span="4" text-align="center">
					<view class="bg-purple-light u-font-xs">{{item.addtime}}</view>
				</u-col>
			</u-row>
			</view>
			</view>
		</view>
		
		
		
		
		
	</view>
	<view  class="trans" v-if="(flow_list.length>0&&current==1)">
		
	<view class="base-panel-box">
		<view class="item">
		<u-row gutter="0" justify="space-between">
			<u-col span="2" text-align="center">
				<view>方向</view>
			</u-col>
			<u-col span="3" text-align="center">
				<view>价格</view>
			</u-col>
			<u-col span="3" text-align="center">
				<view>数量</view>
			</u-col>
			<u-col span="4" text-align="center">
				<view>时间</view>
			</u-col>
		</u-row>
		</view>
		<view class="item"  v-for="(item, index) in flow_list" :key="index">
		<u-row gutter="0" justify="space-between">
			<u-col span="2" text-align="center">
				<view class="flag" :style="{ color: item.flag == 0 ? '#ff1e0f' : item.flag == 1 ? '#00b7ff' : '#ff1e0f' }">
					{{ item.flag == 0 ? '卖出' : item.flag == 1 ? '买入' : '' }}
				</view>
			</u-col>
			<u-col span="3" text-align="center">
				<view>{{(item.price*1).toFixed(4)}}</view>
			</u-col>
			<u-col span="3" text-align="center">
				<view>{{item.num}}</view>
			</u-col>
			<u-col span="4" text-align="center">
				<view class="bg-purple-light u-font-xs">{{item.addtime}}</view>
			</u-col>
		</u-row>
		</view>
	</view>
	</view>
	
	<view class="u-padding-20" v-if="current==2">
		<view class="base-panel-box">
			<view class="htitle">
				<i><u-icon name="gupiao-hangqingdianjitai" custom-prefix="customicon" size="30"></u-icon></i>
				{{translist.coininfo.symbol}}
				<view class="right u-font-xs"></view>
			</view>
			<view class="item">
				<u-row gutter="0" justify="space-between">
					<u-col span="3" text-align="left">
						<view>发行时间</view>
					</u-col>
					<u-col span="4" text-align="left">
						<view></view>
					</u-col>
				</u-row>
			</view>
			<view class="item">
				<u-row gutter="0" justify="space-between">
					<u-col span="3" text-align="left">
						<view>发行总量</view>
					</u-col>
					<u-col span="4" text-align="left">
						<view></view>
					</u-col>
				</u-row>
			</view>
			<view class="item">
				<u-row gutter="0" justify="space-between">
					<u-col span="3" text-align="left">
						<view>白皮书</view>
					</u-col>
					<u-col span="4" text-align="left">
						<view></view>
					</u-col>
				</u-row>
			</view>
			<view class="item">
				<u-row gutter="0" justify="space-between">
					<u-col span="3" text-align="left">
						<view>区块查询</view>
					</u-col>
					<u-col span="4" text-align="left">
						<view></view>
					</u-col>
				</u-row>
			</view>
			<view class="item">
				<u-row gutter="0" justify="space-between">
					<u-col span="3" text-align="left">
						<view>简介</view>
					</u-col>
					<u-col span="4" text-align="left">
						<view></view>
					</u-col>
					<u-col span="12" text-align="left">
					</u-col>
				</u-row>
			</view>
		</view>
		<u-gap height="40"></u-gap>
	</view>

	
	
  </view>
</template>

<script>
export default {
  props: {
    translist: {}
  },
	data(){
		return {
			flow_list:[],
			loadStatus: 'loadmore',
			loadstatus:false,
			page:1,
			self:0,
				tabslist: [{
					cate_name: '当前委托'
				}, {
					cate_name: '交易记录'
				},{
					cate_name: '简介'
				}
				],
				current: 0,
				tabsstyle:{
					borderRadius:'0rpx',
				},
				bartype:{
					marginBottom:'-3px'
				}
		};
	},
	
	created(){
		// setTimeout(() => {
		// 	this.transactionlist(0);
		// }, 0);
	},

	methods: {
		change(index) {
			this.current = index;
			if (index==0){
				this.flow_list=[];
				this.transactionlist(1);
			}
			if (index==1){
					this.transactionlist(0);
			}
			if (index==2){
				
			}
		},
		transactionlist(self){
			this.self=self;
			this.$api('ex.transaction_list', {
				page:this.page,
				limit:20,
				typeboxid:this.translist.coininfo.id,
				is_self:self
			}).then(res => {
				if (res.code==200){
					this.flow_list=res.data.list;
				}
			}).catch((e)=>{});
		},
		cancel(id,index){
			//this.$emit('evententrus',id);return;
			this.$api('ex.cancel', {
				id:id
			}).then(res => {
				this.translist.myent.splice(index,1);
				this.$u.toast(res.data.msg);
			}).catch((e)=>{});
		}
	}
};
</script>

<style scoped>
	.cu-bar{
		/*box-shadow: 0rpx -6rpx 10rpx #DDDDDD;*/
		border-bottom: solid 1px #f0f0f0;
	}
	.trans{
		.item:last-child {
			border-radius: 0rpx 0rpx 0rpx 0rpx;
		}
	}

</style>
