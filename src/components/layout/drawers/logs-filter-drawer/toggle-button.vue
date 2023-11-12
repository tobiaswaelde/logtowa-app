<template>
  <v-btn icon @click="drawerOpen = !drawerOpen">
    <v-badge color="info" dot v-if="!isDefaultFilter">
      <IconFilter />
    </v-badge>
    <IconFilter v-else />
  </v-btn>
</template>

<script setup lang="ts">
import { IconFilter } from '@tabler/icons-vue';
import { useLogsFilterStore } from '@/store/log-filter';
import { storeToRefs } from 'pinia';

const logsFilterStore = useLogsFilterStore();
const { drawerOpen, isDefaultFilter } = storeToRefs(logsFilterStore);
</script>
