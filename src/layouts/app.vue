<template>
  <navbar>
    <template v-slot:actions>
      <v-btn icon @click="toggleConnection">
        <v-badge :color="connected ? 'success' : 'warning'" dot>
          <IconPlayerPause v-if="listening" />
          <IconPlayerPlay v-else />
        </v-badge>
      </v-btn>

      <v-btn icon @click="filterDrawerOpen = !filterDrawerOpen">
        <v-badge color="error" dot v-if="!isDefaultFilter">
          <IconFilter />
        </v-badge>
        <IconFilter v-else />
      </v-btn>

      <lazy-show-implementation-dialog />

      <lazy-edit-app-dialog />
      <lazy-delete-app-dialog />
    </template>
  </navbar>

  <main-drawer />

  <span>log-info-drawer</span>
  <span>logs-filter-drawer</span>

  <v-main>
    <router-view />
  </v-main>
</template>

<script setup lang="ts">
import { IconFilter, IconPlayerPlay, IconPlayerPause } from '@tabler/icons-vue';
import Navbar from '../components/layout/navbar.vue';
import MainDrawer from '../components/drawers/main-drawer/index.vue';
import { storeToRefs } from 'pinia';
import { useLogs } from '../store/logs';
import { useLogsFilter } from '../store/logs-filter';

const { startListening, stopListening } = useLogs();
const { connected, listening } = storeToRefs(useLogs());
const { drawerOpen: filterDrawerOpen, isDefaultFilter } = storeToRefs(
  useLogsFilter(),
);

const toggleConnection = () => {
  if (listening.value) {
    stopListening();
  } else {
    startListening();
  }
};
</script>
