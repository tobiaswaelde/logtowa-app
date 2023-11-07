<template>
  <Navbar>
    <template v-slot:actions>
      <slot name="navbaractions"></slot>
      <div v-if="route.name === 'dashboard'">dashboard links</div>
      <div v-if="route.name === 'groups'">groups links</div>
      <div v-if="route.name === 'group'">group links</div>
      <div v-if="route.name === 'app'">app links</div>
    </template>
  </Navbar>

  <MainDrawer />

  <router-view />
</template>

<script setup lang="ts">
import Navbar from '@/components/layout/navbar.vue';
import MainDrawer from '@/components/layout/drawers/main-drawer/index.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
