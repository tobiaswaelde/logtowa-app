<template>
  <navbar />

  <main-drawer />

  <span>log-info-drawer</span>
  <span>logs-filter-drawer</span>

  <v-main>
    <router-view />
  </v-main>
</template>

<script setup lang="ts">
import Navbar from '../components/layout/navbar.vue';
import MainDrawer from '../components/drawers/main-drawer/index.vue';
</script>
