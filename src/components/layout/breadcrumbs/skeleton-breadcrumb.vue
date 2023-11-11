<template>
  <v-breadcrumbs :items="items" style="padding-top: 0; padding-bottom: 0">
    <template v-slot:divider>
      <IconChevronRight :size="16" />
    </template>
    <template v-slot:title>
      <v-skeleton-loader
        type="text"
        :width="100"
        :elevation="0"
        :height="38"
        style="background-color: transparent"
      />
    </template>
  </v-breadcrumbs>
</template>

<script setup lang="ts">
import { IconChevronRight } from '@tabler/icons-vue';
const items = Array.from(new Array(3)).map(() => '');
</script>

<style lang="scss">
.v-skeleton-loader__text {
  margin: 0px 0px;
}
</style>
