<template>
  <div style="position: absolute; top: 8px; right: 8px">
    <v-btn
      icon
      variant="flat"
      size="small"
      @click="selectedLogStore.closeDrawer"
      color="background"
    >
      <IconX />
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { IconX } from '@tabler/icons-vue';
import { useSelectedLogStore } from '@/store/selected-log';

const selectedLogStore = useSelectedLogStore();
</script>
