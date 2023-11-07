<template>
  <Navbar />
  <MainDrawer />

  <v-main>
    <div>app: {{ id }}</div>
  </v-main>
</template>

<script setup lang="ts">
import Navbar from '@/components/layout/navbar.vue';
import MainDrawer from '@/components/layout/drawers/main-drawer.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id as string;
</script>
