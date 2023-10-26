<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      /* height: calc(100vh - (56px + 38px + 1px));
      max-height: calc(100vh - (56px + 38px + 1px));
      overflow: hidden; */
    "
  >
    <span>Filter</span>
    <v-divider />
    <!-- <div style="flex-grow: 1; background-color: #f00">
      <ClientOnly>
      </ClientOnly>
    </div> -->
    <ClientOnly>
      <logs-table />
    </ClientOnly>
  </div>
</template>
