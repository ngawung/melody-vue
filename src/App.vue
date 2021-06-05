<template>
  <Background/>
  <div id="wrap">
    <Header/>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
  <Footer/>
</template>

<script>
import eruda from 'eruda';

import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Background from '@/components/Background.vue'

export default {
  components: {
    Header, Footer, Background
  },
  setup() {
    eruda.init();
  }
}
</script>

<style lang="less">
p {
  // harus di pancing dulu biar global style masuk?
}
</style>
