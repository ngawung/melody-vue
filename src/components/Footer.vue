<template>
<footer>
	<div style="text-align: center ">
		<img v-for="button in buttons" :src="button" :key="button" />
	</div>

	<p class="small margin-top margin-bottom font" style="text-align: center ">
		&copy; {{ copyright }} <a class="small" href="#">Melody Gigant Hotsprings</a>.
	</p>
    
    <span>melody.my.id is not affiliated with Marvelous Inc.<br>
    Rune Factory, game content and materials are trademarks and copyrights of Marvelous Inc.</span>
</footer>
</template>

<script>
export default {
	name: 'Footer',
	data() {
		return {
			buttons: [],
			copyright: "2021"
		}
	},
	mounted() {
		this.importAll(require.context("@/assets/image/button/", true, /\.(png|jpe?g|svg|gif)$/));
		if (new Date().getFullYear() > 2021) this.copyright = "2021 - " + new Date().getFullYear();
	},
	methods: {
		importAll(r) {
			let temp = [];
			r.keys().forEach(x => {
				temp.push(r(x));
			});
			this.buttons = temp;
		},
	}
}
</script>


<style scoped lang="less">
footer {
    background-color: @primary;
    color: white;
    padding: 20px 0 10px;
    text-align: left;
	margin-top: 20px;
    
    img {
        margin: 1px 2px;
    }
    
    span {
        font-family: "Verdana";
        font-size: 12px;
        line-height: initial;
        letter-spacing: initial;
        opacity: 0.7;
        display: inline-block;
        padding: 0 5px;
    }
}
</style>
