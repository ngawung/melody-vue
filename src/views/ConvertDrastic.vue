<template>

	<Box type="box">
		<p>Upload savefile drastic (.DSV) untuk convert ke savefile desmume (.SAV)</p>
		
		<input type="file" id="input" accept=".dsv">
	</Box>

</template>

<script>
import Box from '@/components/Box.vue';
import Title from '@/components/Title.vue'

export default {
	name: 'Home',
	components: {
		Box, Title
	},
	mounted() {
		const el = this.$el.querySelector("#input");
		el.onchange = () => {
			const data = el.files[0];

			if (data.size <= 65536 || data.name.slice(-3).toLowerCase() != "dsv") {
				el.value = null;
				alert("File harus berupa savefile drastic (.DSV)")
			} else {
				
				const f = new FileReader()
				f.onload = (e) => {
					const content = e.target.result;
					const sliced = content.slice(0, -122);
					const blob = new Blob([new Uint8Array(sliced, 0, sliced.byteLength)], {type: "octet/stream"});
					const url = window.URL.createObjectURL(blob);

					const a = document.createElement("a");
					a.href = url;
					a.download = data.name.slice(0, -3) + "sav"
					a.click();

					window.URL.revokeObjectURL(url);
				}
				f.readAsArrayBuffer(el.files[0]);

			}
		}
	}
}
</script>

<style lang="less" scoped>
	input[type="file"] {
		// padding: 15px;
		// border: 1px solid @primary;
		background-color: white;
		border-radius: 15px;
		padding: 10px;
		margin-top: 20px;
		width: 80%;
	}
</style>