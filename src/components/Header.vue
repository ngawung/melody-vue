<template>
    <div>
        <router-link :to="{name: 'Home'}">
            <img alt="Logo Text" src="../assets/svg/logo-optimized.svg">
        </router-link>
    </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

div {
    text-align: center;
    padding-top: 30px;
}

img {
    width: 90%;
    height: auto;
}

</style>
