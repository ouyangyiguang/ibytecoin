<template>
	<account-page :title="title" :desc="desc">
		<list :user='user'></list>

		<u-gap height="40"></u-gap>
	</account-page>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
import list from '@/components/account/account-bind.vue';
export default {
	components: {
		list
	},
	computed: {
	  ...mapState(['user']),
	},
	data() {
		return {
			title: '账号绑定',
			desc: '可以通过已经绑定的信息登录或找回密码'
		};
	}
};
</script>

<style lang="scss" scoped></style>
