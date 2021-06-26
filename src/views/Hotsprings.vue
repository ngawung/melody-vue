<template>
<Box class="font breadcrumb">
	<router-link :to="{name: 'HotspringsList'}">Visit Hotsprings</router-link><span class="separator">&gt</span>
	<router-link :to="{name: 'HotspringsListYear', params: {year: $route.params.year}}">{{ $route.params.year }}</router-link><span class="separator">&gt</span>
	<router-link :to="{name: 'HotspringsListMonth', params: {month: $route.params.month}}">{{ $route.params.month }}</router-link><span class="separator">&gt</span>
	<span>{{ params.title }}</span>
</Box>

<Box type="content">
	<div class="row">
		<div><button @click="goBack" class="font back">&lt go back</button></div>
	</div>

	<div class="meta">
		<h1>{{ params.title }}</h1>
		<span>{{ params.date }}</span>
		<div><button class="font back category" v-for="category in params.category" :key="category" >{{ category }}</button></div>
	</div>

	<div ref="markdown" class="markdown">
		<div class="loading"><p> Loading your content...</p></div>
	</div>
</Box>

<Box v-if="typeof params.prevFile !== 'undefined' || typeof params.nextFile !== 'undefined'">
	<div class="row">

	<div><router-link v-if="typeof params.prevFile !== 'undefined'" :to="{name: 'Hotsprings', params: {year: params.prevFile.year, month: params.prevFile.month, post: params.prevFile.filename}}">&lt Prev<br>{{ params.prevTitle }}</router-link></div>
	<div><router-link v-if="typeof params.nextFile !== 'undefined'" :to="{name: 'Hotsprings', params: {year: params.nextFile.year, month: params.nextFile.month, post: params.nextFile.filename}}">Next &gt<br>{{ params.nextTitle }}</router-link></div>

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
		this.updateView(this.$route.params);
	},
	beforeRouteUpdate(to, from, next) {
		this.updateView(to.params);
		next();
	},
	methods: {
		goBack() {
			this.$router.go(-1)
		},
		updateView(paramsData) {
			const markdown = this.$refs.markdown;
			markdown.innerHTML = '<div class="loading"><p> Loading your content...</p></div>';

			const url = `/content/hotsprings/${paramsData.year}/${paramsData.month}/${paramsData.post}.md`;

			this.axios(url)
				.then(res => {
					const data = this.fm(res.data);
					markdown.innerHTML = this.marked(data.body, {
						breaks: true,
						gfm: true,
					});
					this.params = data.attributes
					if (this.params.prevFile != null) {
						this.params.prevFile = {
							year: this.params.prevFile.split("/")[0],
							month: this.params.prevFile.split("/")[1],
							filename: this.params.prevFile.split("/")[2],
						}
					}

					if (this.params.nextFile != null) {
						this.params.nextFile = {
							year: this.params.nextFile.split("/")[0],
							month: this.params.nextFile.split("/")[1],
							filename: this.params.nextFile.split("/")[2],
						}
					}

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
		font-size: 36px;
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

.breadcrumb {
	margin-bottom: 10px;
	padding: 10px;
	a, p, span {
		font-size: 14px !important;
		line-height: initial !important;
		display: inline-block;
		// outline: red 1px solid;
	}

	.separator {
		margin: 0 5px !important;
	}
}

.row {
	display: flex;

	div {
		flex: 50%;
		a {
			font-size: 16px;
			line-height: initial;
		}

		&:nth-child(1) {
			text-align: left;
		}

		&:nth-child(2) {
			text-align: right;
		}
	}
}

</style>