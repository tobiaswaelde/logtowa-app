<template>
  <v-btn icon @click="toggleConnection" :disabled="socketError">
    <v-badge :color="badgeColor" dot>
      <IconPlayerPause v-if="listening" />
      <IconPlayerPlay v-else />
    </v-badge>
  </v-btn>
</template>

<script setup lang="ts">
import { IconPlayerPause, IconPlayerPlay } from '@tabler/icons-vue';
import { useAppLogsStore } from '@/store/app-logs';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const appLogsStore = useAppLogsStore();
const { connected, listening, socketError } = storeToRefs(appLogsStore);

const badgeColor = computed(() => {
  if (socketError.value === true) return 'error';
  if (connected.value) return 'success';
  return 'warning';
});

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
