<script setup>
import { RouterView } from 'vue-router';
import Header from './views/HeaderView.vue';
import Footer from './views/FooterView.vue';
</script>

<template>
  <Header></Header>
  <RouterView />
  <Footer></Footer>
</template>

<style lang="scss">
@import "./assets/styles.scss";
</style>
