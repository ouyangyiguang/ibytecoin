<template>
	<qs-page>
		<!-- 公共组件-每个页面必须引入 -->
		<public-module></public-module>
		<view v-if="mode == 'panel'" class="panel-box">
			<u-cell-group :border="border">
				<view class="panel-main">
<u-cell-item v-if="user.userInfo.is_mobile == '0'" :border-top="true" title="手机号" value="未绑定" @click="$tools.routerTo('/pages/account/bindMobile/bindMobile')" :border-bottom="borderBottom"></u-cell-item>
<u-cell-item v-if="user.userInfo.is_mobile == '1'" :border-top="true"  title="手机号" :value="user.userInfo.mobile"  :arrow="false" :border-bottom="borderBottom"></u-cell-item>
<u-cell-item  title="登录密码" value="修改" @click="$tools.routerTo('/pages/account/updatePassword/updatePassword')" :border-bottom="borderBottom"></u-cell-item>

<u-cell-item  title="关于我们"  @click="aboutus()" :border-bottom="borderBottom"></u-cell-item>
					<u-cell-item
						:title="item.title"
						:value="item.value"
						@click="openPage(item.path)"
						:border-bottom="borderBottom"
						v-for="(item, index) in cells"
						:key="index"
					></u-cell-item>
<u-cell-item  title="版本" value="1.0.0" :border-bottom="false" :arrow="false"></u-cell-item>
				</view>
			</u-cell-group>

			<u-gap height="60"></u-gap>

			<view class="btn-line"><u-button type="primary" @click="logout">退出登录</u-button></view>
		</view>
		<view v-if="mode == 'card'" class="card-box">
			<view class="card-main">
				<u-cell-group :border="border">
					<u-cell-item
						:title="item.title"
						:value="item.value"
						@click="openPage(item.path)"
						:border-bottom="borderBottom"
						v-for="(item, index) in cells"
						:key="index"
					></u-cell-item>
				</u-cell-group>
			</view>

			<u-gap height="60"></u-gap>

			<view class="btn-line"><u-button type="primary" @click="logout">退出登录</u-button></view>
		</view>
	</qs-page>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
export default {
	name: 'my-setting',
	props: {
		// 是否显示边框
		border: {
			type: Boolean,
			default: false
		},
		// 是否显示内边框
		borderBottom: {
			type: Boolean,
			default: true
		},
		// 模式
		mode: {
			type: String,
			default: 'panel'
		}
	},
	computed: {
	  ...mapState(['user']),
	},
	data() {
		return {
			cells: [
				{
					title: '工单反馈',
					value: '',
					path: 'my/user/feedback'
				}
			]
		};
	},
	methods: {
		openPage(path) {
			this.$Router.push({
				path: '/pages/' + path
			});
		},
		aboutus(){
			uni.setStorageSync('guidePages', '');
			uni.redirectTo({
				url: "/pages/my/setting/setting"
			});
		},
		logout() {
			
        uni.showModal({
          title: '退出',
          content: '是否确认退出',
          showCancel: true,
          cancelText: '取消',
          confirmText: '确定',
          success: res => {
            if (res.confirm) {
              try {
                this.$store.commit('OUT_LOGIN');
                this.$u.toast('退出成功');
				this.$Router.push({path: '/pages/my/my'});
              } catch (e) {

              }
            } else if (res.cancel) {
              return;
            }

          },
          fail: () => {},
          complete: () => {}
        });
			
			

		}
	}
};
</script>

<style lang="scss" scoped>
.panel-box {
	.panel-main {
		padding: 10rpx 0;
	}

	.btn-line {
		margin: 0 32rpx;
	}
}

.card-box {
	.card-main {
		margin: 0 12rpx;
		padding: 10rpx 0;
		border-radius: 16rpx;
		background-color: #ffffff;
	}

	.btn-line {
		margin: 0 40rpx;
	}
}
</style>
