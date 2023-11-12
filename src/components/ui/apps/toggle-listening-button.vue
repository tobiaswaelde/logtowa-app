<template>
  <v-btn icon @click="toggleConnection">
    <v-badge :color="connected ? 'success' : 'warning'" dot>
      <IconPlayerPause v-if="listening" />
      <IconPlayerPlay v-else />
    </v-badge>
  </v-btn>
</template>

<script setup lang="ts">
import { IconPlayerPause, IconPlayerPlay } from '@tabler/icons-vue';
import { useAppLogsStore } from '@/store/app-logs';
import { storeToRefs } from 'pinia';

const appLogsStore = useAppLogsStore();
const { connected, listening } = storeToRefs(appLogsStore);

const toggleConnection = async () => {
  // try to connect if not already connected
  if (!connected.value) {
    await appLogsStore.connect();
  }

  if (listening.value) {
    appLogsStore.stopListening();
  } else {
    appLogsStore.startListening();
  }
};
</script>
