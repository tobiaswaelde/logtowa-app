<template>
  <v-card :to="{ name: 'app', params: { id: app.id } }">
    <v-card-title
      style="display: flex; flex-direction: row; align-items: center"
    >
      <IconCube style="margin-right: 12px" />
      <span>{{ app.name }}</span>
    </v-card-title>
  </v-card>
</template>

<script setup lang="ts">
import { IconCube } from '@tabler/icons-vue';
import { App } from '@/types/app';

defineProps<{ app: App }>();
</script>
