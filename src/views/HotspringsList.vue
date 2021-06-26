<template>
<p>hotsprings list</p>
<Box v-for="list in lists" :key="list">
	<h1>list.title</h1>
</Box>
</template>

<script>
export default {
	name: 'HotspringsList',
	components: {},
	data() {
		return {
			lists: {}
		}
	},
	mounted() {
		console.log(this.$route.params)
	}
}
</script>

<style lang="less" scoped>

</style>