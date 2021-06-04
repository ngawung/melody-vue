<template>

<div class="menu-container">
	<div class="menu" v-for="list in lists">
        <img :src="list.image" />
        <p>{{ list.text }}</p>
    </div>
</div>

</template>

<script>
export default {
  name: 'MenuList',
  props: {
  	lists: {
  		type: Array,
  		required: true,
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

.menu-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    padding: 0;
    // outline: blue 1px solid;
    
    .menu {
        width: 140px;
        margin: 0 5px;
        box-shadow: 0 0 5px rgba(@border, 0.5);
        margin-bottom: 15px;
        border-radius: 20px;
        overflow: hidden;
        position: relative;
        // outline: red 1px solid;
        
        img {
            width: 100%;
            height: 200px;
            display: block;
        }
        
        p {
            width: 100%;
            font-size: 16px;
            line-height: 20px;
            padding: 20px 0 10px;
            text-shadow: 0px 0px 3px white, 0px 0px 3px white, 0px 0px 3px white, 0px 0px 3px white;
            text-align: center;
            position: absolute;
            bottom: 0;
            background-image: linear-gradient(rgba(white, 0), rgba(white, 0.6), rgba(white, 0.6), rgba(white, 0.6));
        }
    }
}

</style>
