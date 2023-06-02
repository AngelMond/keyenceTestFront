<script setup>
import { RouterView } from 'vue-router';
import Header from './views/Header.vue';
import Footer from './views/Footer.vue';
</script>

<template>
  <Header></Header>
  <RouterView />
  <Footer></Footer>
</template>

<style scoped>
@import './assets/main.css'
</style>
