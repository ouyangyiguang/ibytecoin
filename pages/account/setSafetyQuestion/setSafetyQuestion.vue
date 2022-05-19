<template>
	<account-page :title="title"></account-page>
</template>

<script>
export default {
	data() {
		return {
			title: '设置密保问题'
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
