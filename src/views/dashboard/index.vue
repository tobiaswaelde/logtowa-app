<template>
  <Navbar />
  <MainDrawer />

  <v-main>
    <div>dashboard</div>
  </v-main>
</template>

<script setup lang="ts">
import Navbar from '@/components/layout/navbar.vue';
import MainDrawer from '@/components/layout/drawers/main-drawer.vue';
</script>
