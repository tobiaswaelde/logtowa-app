<template>
  <v-app-bar density="comfortable" color="primary">
    <v-app-bar-nav-icon @click="appStore.toggleDrawer">
      <IconMenu2 />
    </v-app-bar-nav-icon>

    <v-app-bar-title>CloudLogger</v-app-bar-title>
    <v-spacer />

    <slot name="actions"></slot>
  </v-app-bar>
</template>

<script setup lang="ts">
import { IconMenu2 } from '@tabler/icons-vue';
import { useAppStore } from '../../stores/app';
const appStore = useAppStore();
</script>
