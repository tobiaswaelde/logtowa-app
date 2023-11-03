<template>
  <div style="display: flex; flex-direction: column">
    <ClientOnly>
      <logs-chart v-if="app !== null" />
      <v-divider />
    </ClientOnly>

    <ClientOnly>
      <logs-table />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const { app } = storeToRefs(useApps());
</script>
