<template>
  <v-list-item
    :value="value"
    :title="app.name"
    :to="{ name: 'app', params: { id: app.id } }"
  >
    <template v-slot:prepend>
      <IconCube :size="20" style="margin-right: 8px" />
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
import { IconCube } from '@tabler/icons-vue';
import { App } from '@/types/app';

defineProps<{ value: string; app: App }>();
</script>
