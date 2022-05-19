<template>
	<account-page :title="title" :desc="desc">
		<view class="account-form-box">
			<u-form :model="model" ref="uForm" :errorType="form.errorType">
				<u-form-item class="form-item" label="当前微信账号" prop="currentWeixin" :label-position="form.labelPosition">
					<u-input :disabled="true" v-model="model.currentWeixin" type="text" />
				</u-form-item>
			</u-form>
		
			<u-gap height="40"></u-gap>
		
			<view class="u-flex">
				<view class="u-flex-1 u-m-r-30"><u-button type="primary" @click="submit">解 绑</u-button></view>
				<view class="u-flex-1 u-n-l-30"><u-button type="default" @click="cancel">取 消</u-button></view>
			</view>
		</view>
		
		<u-gap height="40"></u-gap>
	</account-page>
</template>

<script>
export default {
	data() {
		return {
			title: '解绑微信账号',
			desc: '是否解绑该微信账号？',
			form: {
				errorType: ['message'],
				labelPosition: 'top'
			},
			model: {
				/* 当前微信账号 */
				currentWeixin: '青松'
			}
		};
	},
	methods: {
		submit() {
			return this.$u.toast('解绑成功');
		},
		cancel() {
			uni.navigateBack();
		}
	}
};
</script>

<style lang="scss" scoped>
.account-form-box {
	padding: 0 32rpx;
}
</style>
