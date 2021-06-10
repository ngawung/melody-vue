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

		<div ref="markdown" class="markdown">
			<div class="loading">
				<p> Loading your content...</p>
			</div>
		</div>
	</Box>

	<div ref="comment" style="display: none">
		<Box type="box2">
			<p>Comment disabled for this post! :D</p>
		</Box>
	</div>
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
		const markdown = this.$refs.markdown;

		this.axios(`/content/hotsprings/${this.$route.params.year}/${this.$route.params.month}/${this.$route.params.post}.md`)
			.then(res => {
				const data = this.fm(res.data);
				markdown.innerHTML = this.marked(data.body, {
					breaks: true,
					gfm: true,
				});
				this.params = data.attributes

				// convert all internal link to router-link
				markdown.querySelectorAll(".internal").forEach(x => {
					x.addEventListener("click", e => {
						e.preventDefault();
						this.$router.push({ name: x.attributes.href.value })
					})
				})

				// convert unix date
				const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
				const date = new Date(this.params.date * 1000);
				this.params.date = `${date.getDate()}/${monthNames[date.getMonth()]}/${date.getFullYear()} | ${date.getHours()}:${date.getMinutes()}`

				// convert category
				this.params.category = this.params.category.split(",").map(x => x.trim());

				// show comment
				this.$refs.comment.style.display = "block"
			})
			.catch(e => { 
				markdown.innerHTML = "Link Broken... Cannot Find Any Content"
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