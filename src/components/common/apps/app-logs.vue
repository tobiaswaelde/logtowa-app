<template>
  <div style="display: flex; flex-direction: column">
    <logs-filter />

    <v-divider />

    <ClientOnly>
      <logs-table />
    </ClientOnly>
  </div>
</template>
