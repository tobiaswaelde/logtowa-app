<template>
  <div style="display: flex; flex-direction: column">
    <ClientOnly>
      <logs-chart />
      <v-divider />
    </ClientOnly>

    <logs-filter />

    <v-divider />

    <ClientOnly>
      <logs-table />
    </ClientOnly>
  </div>
</template>
