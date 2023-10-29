<template>
  <div style="display: flex; flex-direction: column">
    <span>Filter</span>
    <v-divider />
    <ClientOnly>
      <logs-table />
    </ClientOnly>
  </div>
</template>
