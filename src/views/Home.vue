<template>

<div class="logo">
	<img src="@/assets/image/melody.png" alt="Melody"/>
</div>

<Box type="box">
	<p>i just started my site, so there's not much here at the moment!</p>
</Box>

<!-- <Box type="box">
	<p>Website ini masih dalam tahap pengembangan...!</p>
</Box> -->

<Box type="box3">
	<p>Are you lost? looking for my portofolio? <a href='#'>Click here</a></p>
</Box>

<Box type="box">
	<p>Click those fancy buttons below to see my dumb thoughts, project im working on, and some other wierd stuff!</p>
</Box>

<MenuList :lists="menus" />

<Title msg="Latest Update" />

<Box type="box" class="margin-bottom">
	<div class="lastUpdate" v-for="data in lastUpdate" :key="data">
		<router-link :to="{name: 'Hotsprings', params: { year: data.params.year, month: data.params.month ,post: data.params.filename}}">
			<p>{{ data.title }}</p>
			<span>{{ data.date }}</span>
		</router-link>
	</div>
</Box>

<button class="font">View More</button>

<Box type="box">
	<p>While you're here why not sign my guestbook</p>
	<img class="margin-top img-transparent" style="width: 80%; max-width: 300px" src="@/assets/image/guestbook.png" />
</Box>

<!-- <Title msg="ChatBox" /> -->

<Box type="box">
	<p>My Social media</p>
	<span class="small">im usually only active on Facebook...</span>
	<div>
	<a class="social" v-for="social in socials" :key="social" :href="social.link" target="_blank">
		{{ social.name }}
	</a>
	</div>
	<span class="small2">Find all my social link in <router-link :to="{name: 'Home'}">Find Me</router-link> menu...</span>
</Box>

</template>

<script>
import Box from '@/components/Box.vue'
import MenuList from '@/components/MenuList.vue'
import Title from '@/components/Title.vue'

export default {
	name: 'Home',
	components: { Box, MenuList, Title },
	data () {
		return {
			menus: [
				{
					image: require("@/assets/image/placeholder.png"),
					text: "Visit the HotSprings",
					location: 'HotspringsList'
				},
				// {
				// 	image: require("@/assets/image/placeholder.png"),
				// 	text: "Art Gallery Museum",
				// 	location: 'ArtGallery'
				// },{
				// 	image: require("@/assets/image/placeholder.png"),
				// 	text: "Rune Factory Walkthrought",
				// 	location: 'Walkthrought'
				// },{
				// 	image: require("@/assets/image/placeholder.png"),
				// 	text: "Melody Shrine",
				// 	location: 'MelodyShrine'
				// },{
				// 	image: require("@/assets/image/placeholder.png"),
				// 	text: "Project Changelogs",
				// 	location: 'Changelogs'
				// },{
				// 	image: require("@/assets/image/placeholder.png"),
				// 	text: "Boring Things",
				// 	location: 'Boring'
				// },{
				// 	image: require("@/assets/image/placeholder.png"),
				// 	text: "Find Me",
				// 	location: 'FindMe'
				// },
			],
			socials: [
				{
					name: "Facebook",
					link: "https://www.facebook.com/ferdian244"
				},{
					name: "Twitter",
					link: "https://www.twitter.com/but2erfly"
				},{
					name: "Instagram",
					link: "https://www.instagram.com/libngl.so"
				},
			],
			lastUpdate: this.manifest.hotsprings.default.lastUpdate.map(x => {
				return {
					params: {
						year: x.filename.split("/")[0],
						month: x.filename.split("/")[1],
						filename: x.filename.split("/")[2],
					},
					title: x.title,
					category: x.category,
					date: this.formatDate(x.date),
				}
			})
		}
	},
	methods: {
		formatDate(date) {
			const now = Math.floor(new Date().getTime() / 1000);
			let delta = Math.abs(now - date);

			const days = Math.floor(delta / (24 * 60 * 60));
			const hours = Math.floor(delta / (60 * 60));
			const minutes = Math.floor(delta / 60);

			if (days > 0) return `${days} days ago`;
			else if (hours > 0) return `${hours} hours ago`;
			else return `${minutes} minutes ago`;
		}
	},
	mounted() {
		
	}
}
</script>

<style scoped lang="less">

.logo {
	margin-top: 30px;
	
	img {
		width: 70%;
		max-width: 500px;
		border-radius: 100%;
		background-image: linear-gradient(rgba(white, 0), rgba(white, 0.6), rgba(white, 0.6), rgba(white, 0.6));
		box-shadow: 0 0 15px rgba(#111, 0.3);
	}
}

.social {
	font-size: 16px !important;
	padding: 5px 20px !important;
	margin: 15px 5px !important;
	background-color: rgba(@primary, 0.8) !important;
	border-radius: 15px !important;
	color: white !important;
	text-shadow: none !important;
	text-decoration: none !important;
	box-shadow: 0 0 15px rgba(@border, 0.3) !important;
	display: inline-block !important;
}

.social:visited {
	color: white;
	text-decoration: underline;
}

.lastUpdate {
	margin-bottom: 15px !important;
	&:last-child {
		margin-bottom: initial !important;
	}
	// outline: red 1px solid;

	a {
		text-decoration: none !important;
		
		p {
			text-decoration: underline !important;
			margin-bottom: 0;
			line-height: initial;
		}
		
		span {
			font-size: 14px !important;
			text-decoration: none !important;
		}
	}
}
	
</style>
