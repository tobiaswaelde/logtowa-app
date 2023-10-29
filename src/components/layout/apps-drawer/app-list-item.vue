<template>
  <v-list-item
    :value="value"
    :title="app.name"
    density="compact"
    :to="`/apps/${app.id}`"
  >
    <template v-slot:prepend>
      <IconCube :size="20" style="margin-right: 8px" />
    </template>
  </v-list-item>
</template>

<script lang="ts" setup>
import { IconCube } from '@tabler/icons-vue';
import { App } from '@/types/app';

defineProps<{
  value: string;
  app: App;
}>();
</script>
