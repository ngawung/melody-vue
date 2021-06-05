<template>

<div :class="['container', type]">
	<slot></slot>
	<!-- <p>{{ msg }}</p> -->
</div>

</template>

<script>
export default {
  name: 'Box',
  props: {
    // msg: {
    // 	type: String,
    // 	required: true
    // },
    type: {
    	type: String,
    	default: "box"
    }
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

.box {
    text-align: center;
    text-shadow: 0px 0px 3px white, 0px 0px 3px white, 0px 0px 3px white, 0px 0px 3px white;
    background-image: linear-gradient(rgba(white, 0.6), rgba(white, 0.6), rgba(@primary, 0.2));
    border-radius: 20px;
    box-shadow: 0 0 5px rgba(@border, 0.3);
}

.box2 {
    color: white;
    text-align: center;
    background-color: rgba(darken(@primary, 30), 0.6);
    border-radius: 20px;
    box-shadow: 0 0 5px rgba(@border, 0.3);
}

.box3 {
    color: white;
    text-align: center;
    background-color: rgba(#558B2F, 0.6);
    border-radius: 20px;
    box-shadow: 0 0 5px rgba(@border, 0.3);
}

</style>
