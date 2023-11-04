<template>
  <v-app>
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

    <apps-drawer />
    <log-info-drawer />
    <ClientOnly>
      <logs-filter-drawer />
    </ClientOnly>

    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import {
  IconDownload,
  IconFilter,
  IconPlayerPlay,
  IconPlayerPause,
} from '@tabler/icons-vue';

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
