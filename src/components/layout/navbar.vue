<template>
  <v-app-bar density="comfortable" color="primary">
    <v-app-bar-nav-icon @click="appStore.toggleDrawer">
      <IconMenu2 />
    </v-app-bar-nav-icon>

    <v-app-bar-title>
      <router-link
        :to="{ name: 'index', replace: true }"
        style="color: inherit; text-decoration: inherit"
      >
        {{ appTitle }}
      </router-link>
    </v-app-bar-title>

    <slot name="actions"></slot>
  </v-app-bar>
</template>

<script setup lang="ts">
import { IconMenu2 } from '@tabler/icons-vue';
import { useAppStore } from '@/store/app';

const appStore = useAppStore();

const appTitle = import.meta.env.APP_TITLE || 'LogTowa';
</script>
