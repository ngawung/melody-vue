<template>

<div class="logo">
    <img src="@/assets/image/melody.png" alt="Melody"/>
</div>

<Box type="box">
	<p>i just started my site, so there's not much here at the moment!</p>
</Box>

<Box type="box3">
	<p>Are you lost? looking for my portofolio? <a href='#'>Click here</a></p>
</Box>

<Box type="box">
	<p>Click those fancy buttons below to see my dumb thoughts, project im working on, and some other wierd stuff!</p>
</Box>

<MenuList :lists="menus" />

<Title msg="Latest Update" />

<Box type="box" class="margin-bottom">
</Box>

<button class="">View More</button>

<Box type="box">
    <p>While you're here why not sign my guestbook</p>
    <img class="margin-top img-transparent" style="width: 80%; max-width: 300px" src="@/assets/image/guestbook.png" />
</Box>

<!-- <Title msg="ChatBox" /> -->


</template>

<script>
import Box from '@/components/Box.vue'
import MenuList from '@/components/MenuList.vue'
import Title from '@/components/Title.vue'

export default {
  name: 'Home',
  components: {
    Box, MenuList, Title
  },
  data () {
  	return {
  		menus: [
  			{
  				image: require("@/assets/image/placeholder.png"),
  				text: "Visit the HotSprings",
  				location: "#"
  			},{
  				image: require("@/assets/image/placeholder.png"),
  				text: "Art Gallery Museum",
  				location: "#"
  			},{
  				image: require("@/assets/image/placeholder.png"),
  				text: "Rune Factory Walkthrought",
  				location: "#"
  			},{
  				image: require("@/assets/image/placeholder.png"),
  				text: "Project Changelogs",
  				location: "#"
  			},{
  				image: require("@/assets/image/placeholder.png"),
  				text: "Boring Things",
  				location: "#"
  			},
  		]
  	}
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
	
</style>
