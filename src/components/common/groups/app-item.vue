import projectGroupItemVue from './project-group-item.vue';
<template>
  <v-card :to="`/apps/${app.id}`">
    <v-card-title
      style="display: flex; flex-direction: row; align-items: center"
    >
      <IconCube style="margin-right: 12px" />
      {{ app.name }}
    </v-card-title>
  </v-card>
</template>

<script lang="ts" setup>
import { IconCube } from '@tabler/icons-vue';
import { App } from '@/types/app';

defineProps<{
  app: App;
}>();
</script>
