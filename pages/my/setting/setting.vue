<template>
	<account-page :title="title" :desc="desc">
		<list></list>
	</account-page>
</template>

<script>
import list from '@/components/my/my-setting.vue';
export default {
	components: {
		list
	},
	data() {
		return {
			title: '设置',
			desc: ''
		};
	},
	onLoad() {
		if (!this.$store.getters.loginFlag) {
			this.$Router.push('/pages/account/login/pwd-login');
		}
	}
};
</script>

<style lang="scss" scoped></style>
