<template>
	<account-page :title="title" :desc="desc">
		<view class="account-form-box">
			<u-gap height="100"></u-gap>
			
			<view class="u-flex">
				<view class="u-flex-1 u-m-r-30"><u-button type="primary" @click="submit">去绑定</u-button></view>
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
			title: '绑定 QQ 账号',
			desc: ''
		};
	},
	methods: {
		submit() {
			return this.$u.toast('绑定成功');
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
