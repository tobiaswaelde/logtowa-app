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

        <lazy-edit-project-dialog />
        <lazy-delete-project-dialog />
      </template>
    </navbar>

    <projects-drawer />
    <v-navigation-drawer :width="500" permanent location="end">
      Log meta information
    </v-navigation-drawer>

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
