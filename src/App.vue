<script setup>
import { RouterView } from 'vue-router';
import Header from './views/HeaderView.vue';
import Footer from './views/FooterView.vue';
</script>

<template>
  <v-app>
    <!-- Contenido de tu aplicación -->
    <div class="">
      <Header></Header>
      <RouterView />
      <Footer></Footer>
    </div>
  </v-app>
</template>

<style lang="scss">
@import "./assets/styles.scss";
</style>
