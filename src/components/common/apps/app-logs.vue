<template>
  <div style="display: flex; flex-direction: column">
    <ClientOnly>
      <app-logs-chart v-if="app !== null" />
      <v-divider />
    </ClientOnly>

    <ClientOnly>
      <logs-table />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useApps } from '../../../store/apps';

const { app } = storeToRefs(useApps());
</script>
