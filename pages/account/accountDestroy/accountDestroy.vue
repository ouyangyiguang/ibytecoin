<template>
	<account-page :title="title"></account-page>
</template>

<script>
export default {
	data() {
		return {
			title: '账户注销'
		};
	},
	methods: {
		openPage(path) {
			this.$Router.push({
				path: '/pages/account/' + path
			});
		}
	}
};
</script>

<style lang="scss" scoped></style>
