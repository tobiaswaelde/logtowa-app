<template>
  <navbar />

  <main-drawer />

  <v-main>
    <router-view />
  </v-main>
</template>

<script setup lang="ts">
import Navbar from '../components/layout/navbar.vue';
import MainDrawer from '../components/drawers/main-drawer/index.vue';
</script>
