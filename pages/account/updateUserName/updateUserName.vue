<template>
	<account-page :title="title" :desc="desc">
		<view class="account-form-box">
			<u-form :model="model" ref="uForm" :errorType="form.errorType">
				<u-form-item class="form-item" label="当前用户名" prop="currentUserName" :label-position="form.labelPosition">
					<u-input :disabled="true" v-model="model.currentUserName" placeholder="4-20位的数字和字母" type="text" />
				</u-form-item>
				<u-form-item class="form-item" label="用户名" prop="newUserName" :label-position="form.labelPosition">
					<u-input v-model="model.newUserName" placeholder="新用户名(4-20位的数字和字母)" type="text" />
				</u-form-item>
			</u-form>

			<u-gap height="40"></u-gap>

			<u-button type="primary" @click="submit">确认修改</u-button>
		</view>

		<u-gap height="40"></u-gap>
	</account-page>
</template>

<script>
export default {
	data() {
		return {
			title: '修改用户名',
			desc: '4至20位，由数字或字母组成',
			form: {
				errorType: ['message'],
				labelPosition: 'top'
			},
			model: {
				/* 当前用户名 */
				currentUserName: 'qingsong',
				/* 用户名 */
				newUserName: ''
			},
			rules: {
				newUserName: [
					{
						required: true,
						message: '请输入新用户名',
						trigger: ['change', 'blur']
					},
					{
						min: 4,
						max: 20,
						message: '用户名长度在4到20个字符',
						trigger: ['change', 'blur']
					},
					{
						pattern: /^[0-9a-zA-Z]*$/g,
						transform(value) {
							return String(value);
						},
						message: '用户名为字母或数字',
						trigger: ['change', 'blur']
					}
				]
			}
		};
	},
	methods: {
		submit() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					return this.$u.toast('验证通过');
				} else {
					console.log('验证失败');
				}
			});
		}
	},
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	}
};
</script>

<style lang="scss" scoped>
.account-form-box {
	padding: 0 32rpx;
}
</style>
