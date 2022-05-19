<template>
	<qs-page>
		<qs-navbar isBack="true" backUrl="/pages/index/index">
			<view class="u-flex"><h3>在线沟通</h3></view>
			<view class="u-flex u-m-r-22">
			</view>
		</qs-navbar>
	<view class="content">		
		<selectInput :list="selectList" :list-key="'name'" :show.sync="selectShow" @on-select="checkSelect" @close="closeSelect" />
		<searchInput />
		<u-swipe-action :show="item.show" :index="index" v-for="(item, index) in list" btn-width="160" :key="item.client_uid" @click="click" @open="open" :options="options">
			<view class="item" :class="item.isTop ? 'bg_view' : ''" hover-class="message-hover-class" @tap="linkTo(item)">
				<image mode="aspectFill" :src="item.client_avatar" />
				<!-- 此层wrap在此为必写的，否则可能会出现标题定位错误 -->
				<view class="right u-border-bottom title-wrap">
					<view class="right_top">
						<view class="right_top_name u-line-1">{{ item.client_username }}</view>
						<view class="right_top_time ">{{ item.last_time }}</view>
					</view>
					<view class="right_btm ">
						<view class="u-line-1">{{item.readstatus}}</view>
						<view class=""></view>
					</view>
				</view>
			</view>
		</u-swipe-action>
	</view>
	</qs-page>
</template>

<script>
import searchInput from '@/components/searchInput/index.vue';
import selectInput from '@/components/selectInput/selectInput.vue';
import socket from '@/plugins/socket.js';
import {mapState,mapMutations} from 'vuex';
export default {
	components: { searchInput, selectInput },
	data() {
		return {
			list: [],
			selectShow: false,
			options: [
				{
					text: '删除',
					style: {
						backgroundColor: '#dd524d',
						fontSize: '24rpx'
					}
				}
			],
			selectList: [{ id: '1', name: '添加朋友', icon: 'man-add-fill' }, { id: '2', name: '扫一扫', icon: 'scan' }, { id: '3', name: '收付款', icon: 'fingerprint' }]
		};
	},
		computed: {
		  ...mapState(['user']),
		},
	onLoad() {
                    this.$api('chat.room', {
						users_id:this.user.userInfo.users_id
					}).then(res => {
						if (res.code==200){
                              this.list=res.data;
						}
                    }).catch((e)=>{});
	},
	methods: {
		//打开或者关闭弹窗
		showSelect(){
			this.selectShow = !this.selectShow;
		},
		//action 点击事件
		click(index, index1) {
			if (index1 == 0) {
				this.list.splice(index, 1);
			} 
		},
		//action 打开事件
		open(index) {
			this.list[index].show = true;
			this.list.map((val, idx) => {
				if (index != idx) this.list[idx].show = false;
			});
		},
		//点击导航栏自定义按钮
		onNavigationBarButtonTap({ index }) {
			if (index == 0) {
				this.showSelect()
			}
		},
		//跳转
		linkTo({ id, client_username, client_avatar ,client_uesrs_id ,room_id}) {
			if(client_uesrs_id==this.user.userInfo.users_id){
				return this.$tools.msg('不可自说自话');
			}

			this.$Router.push({
				path: '/pages/chat/chat',
				query: { messageId: room_id,fromUserId:client_uesrs_id}
			});
		},
		//关闭弹窗
		closeSelect(){
			//小程序兼容
			this.selectShow = false;
		},
		//扫码
		checkSelect(index) {
			if (index == 1) {
				uni.vibrateLong();
				//扫码
				uni.scanCode({
					success: function(res) {
						// console.log('条码内容：' + res.result);
						this.$u.toast('条码类型:', res.scanType);
					}
				});
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.content {
	.item {
		width: 750rpx;
		display: flex;
		align-items: center;
		// padding: 20rpx;
		image {
			width: 76rpx;
			height: 76rpx;
			margin: 20rpx;
			border-radius: 12rpx;
			flex: 0 0 76rpx;
		}
		.right {
			overflow: hidden;
			flex: 1 0;
			padding: 20rpx 20rpx 20rpx 0;
			&_top {
				display: flex;
				justify-content: space-between;
				&_name {
					font-size: 28rpx;
					color: $u-main-color;
					flex: 0 0 350rpx;
					overflow: hidden;
				}
				&_time {
					font-size: 22rpx;
					color: $u-light-color;
				}
			}
			&_btm {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 22rpx;
				color: $u-tips-color;
				padding-top: 10rpx;
			}
		}
	}
	.bg_view {
		background-color: #fafafa;
	}
	.slot-wrap {
		display: flex;
		align-items: center;
		padding: 0 30rpx; 
	}
}
</style>
