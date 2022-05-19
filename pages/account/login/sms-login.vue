<template>
	<account-page :title="title" :desc="desc" default_id="0086">
		<view class="account-form-box">
			<u-form :model="model" ref="uForm" :errorType="form.errorType">
				<countryCode @eventChange="countryChange"></countryCode>
				<u-form-item class="form-item" label="手机号" prop="mobile" :label-position="form.labelPosition">
					<u-input v-model="model.mobile" placeholder="请输入手机号" type="text" />
				</u-form-item>
				<u-form-item class="form-item" label="短信验证码" prop="verifyCode" :label-position="form.labelPosition">
					<u-input v-model="model.verifyCode" placeholder="请输入验证码" type="number" />
					<u-button slot="right" type="success" size="mini" @click="getCode">{{ codeTips }}</u-button>
				</u-form-item>
			</u-form>
		
			<u-verification-code seconds="60" ref="uCode" @change="codeChange"></u-verification-code>
		
			<u-gap height="40"></u-gap>
		
			<u-button type="primary" @click="submit">登 录</u-button>
		
			<u-gap height="40"></u-gap>
		
			<view class="u-flex">
				<view class="u-flex-1 u-text-left" @click="$tools.routerTo('/pages/account/login/pwd-login')">密码登录</view>
				<view class="u-flex-1 u-text-center" @click="$tools.routerTo('/pages/account/register/username-register')">注册</view>
				<view class="u-flex-1 u-text-right" @click="$tools.routerTo('/pages/account/findPassword/mobile-findPassword')">忘记密码</view>
			</view>
		</view>

		<u-gap height="40"></u-gap>
	</account-page>
</template>

<script>
import countryCode from '@/components/countrycode.vue'
export default {
	data() {
		return {
			title: '短信验证码登录',
			desc: '',
			codeTips: '',
			form: {
				errorType: ['message'],
				labelPosition: 'top'
			},
			model: {
				/* 手机号 */
				mobile: '',
				/* 验证码 */
				verifyCode: '',
				mobicountry:''
			},
			rules: {
				mobile: [
					{
						required: true,
						message: '请输入手机号',
						trigger: ['change', 'blur']
					}
				],
				verifyCode: [
					{
						required: true,
						message: '请输入验证码',
						trigger: ['change', 'blur']
					},
					{
						type: 'number',
						message: '验证码只能为数字',
						trigger: ['change', 'blur']
					},
					{
						len: 4,
						message: '验证码长度为4位数字',
						trigger: ['change','blur']
					}
				]
			}
		};
	},
	components: {
		countryCode
	},
	methods: {
		countryChange(data){
			this.model.mobicountry=data.value;
		},
		submit() {
			this.$refs.uForm.validate(valid => {
				if (valid) {
					return new Promise((resolve, reject) => {
                    this.$api('user.login', {
						logintype:'login_by_mobile',//login_by_mobile
						mobile:this.model.mobile,
						mobicode:this.model.mobicountry,
						smsverify:this.model.verifyCode,
					}).then(res => {
                        if (res.code==200){
							this.$store.commit('USER_INFO',res.data);
							this.$store.commit('TOKEN_INFO',res.data.access_token);
							uni.setStorageSync('fromLogin','');//要跳转到的页面
							this.$store.dispatch('setTokenAndBack',res.data.access_token);
							resolve(true);
						}
                    }).catch((e)=>{
                        resolve(false);
                    });
					})
				} else {
					console.log('验证失败');
				}
			});
		},
		codeChange(text) {
			this.codeTips = text;
		},
		// 获取验证码
		getCode() {
			if (this.$refs.uCode.canGetCode) {
				uni.showLoading({
					title: '正在获取验证码',
					mask: true
				});
                return new Promise((resolve, reject) => {
                    this.$api('user.getsmscode', {
						scenetype:'0',//0为要检查是否存在
						mobile:this.model.mobile,
						mobicode:this.model.mobicountry,
					}).then(res => {
						console.log(res)
						if (res.code==200){
							setTimeout(() => {
								uni.hideLoading();
								// 这里此提示会被this.start()方法中的提示覆盖
								this.$u.toast('验证码已发送');
								// 通知验证码组件内部开始倒计时
								this.$refs.uCode.start();
							}, 500);
							resolve(true);
						}
                    }).catch((e)=>{
						console.log(e);
                        resolve(false);
                    });
                })


			} else {
				this.$u.toast('倒计时结束后再发送');
			}
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
