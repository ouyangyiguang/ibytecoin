<template>
	<account-page :title="title" :desc="desc">
		<list></list>

		<u-gap height="40"></u-gap>
	</account-page>
</template>

<script>
import list from '@/components/account/safety-center.vue';
export default {
	components: {
		list
	},
	data() {
		return {
			title: '账号与安全',
			desc: ''
		};
	}
};
</script>

<style lang="scss" scoped></style>
