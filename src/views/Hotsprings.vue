<template>
	<Box type="content">
		<div style="text-align: left">
			<button @click="$router.go(-1)" class="font back">&lt go back</button>
		</div>

		<div class="meta">
			<h1>{{ params.title }}</h1>
			<span>{{ params.date }}</span>
			<div><button class="font back category" v-for="category in params.category" :key="category" >{{ category }}</button></div>
		</div>

		<div class="markdown" v-html="RenderMarkdown" />
	</Box>

	<Box type="box2">
		<p>Comment disabled for this post! :D</p>
	</Box>
</template>

<script>
import Box from '@/components/Box.vue'

export default {
	name: 'Hotsprings',
	components: { Box },
	data() {
		return {
			RenderMarkdown: {},
			params: {},
		}
	},
	mounted() {
		this.axios(`/content/hotsprings/${this.$route.params.year}/${this.$route.params.month}/${this.$route.params.post}.md`)
			.then(res => {
				const data = this.fm(res.data);
				this.RenderMarkdown = this.marked(data.body, {
					breaks: true,
					gfm: true,
				});
				this.params = data.attributes

				// convert unix date
				const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
				const date = new Date(this.params.date * 1000);
				this.params.date = `${date.getDate()}/${monthNames[date.getMonth()]}/${date.getFullYear()} | ${date.getHours()}:${date.getMinutes()}`

				// convert category
				this.params.category = this.params.category.split(",").map(x => x.trim());
			})
			.catch(e => { 
				this.RenderMarkdown = "error";
				console.log(e)
			})
	}
}
</script>

<style lang="less" scoped>
	// i cant use css from inserted html here :/
	// sound like problem for future me
	// lemme try using global style instead
	// ok it work...
	.meta {
		margin: 20px 0 30px;	
		h1 {
			font-size: 30px;
			line-height: initial;
		}

		span {
			font-size: 14px !important;
			line-height: initial;
		}

	}

	.back {
		text-align: left;
		width: initial;
		font-size: 14px !important;
		line-height: initial;
		padding: 8px 13px;
	}

	.category {
		font-size: 10px !important;
		padding: 2px 8px;
		margin: 0 5px;
	}

</style>