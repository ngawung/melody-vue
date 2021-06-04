<template>

<p :class="'semongko title ' + size">{{ msg }}</p>

</template>

<script>
export default {
  name: 'Title',
  props: {
    msg: {
    	type: String,
    	required: true
    },
    size: {
        type: String,
        default: "large"
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

.title {
    margin: 50px 0 30px;
}

</style>
