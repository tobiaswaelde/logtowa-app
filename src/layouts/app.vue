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

        <lazy-show-implementation-dialog />

        <v-btn icon>
          <IconDownload />
        </v-btn>

        <lazy-edit-app-dialog />
        <lazy-delete-app-dialog />
      </template>
    </navbar>

    <apps-drawer />
    <log-info-drawer />

    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import {
  IconDownload,
  IconPlayerPlay,
  IconPlayerPause,
} from '@tabler/icons-vue';

const { startListening, stopListening } = useLogs();
const { connected, listening } = storeToRefs(useLogs());

const toggleConnection = () => {
  if (listening.value) {
    stopListening();
  } else {
    startListening();
  }
};
</script>
