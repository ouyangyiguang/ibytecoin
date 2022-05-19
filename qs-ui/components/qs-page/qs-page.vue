<template>
	<view class="qs-page-wrap"><slot></slot></view>
</template>

<script>
export default {
	name: 'qs-page',
	props: {},
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
/* -- 页面 -- */
.qs-page-wrap {
	min-height: 100vh;
}
</style>
