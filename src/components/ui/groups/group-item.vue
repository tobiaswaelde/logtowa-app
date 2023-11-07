<template>
  <v-card :to="{ name: 'group', params: { id: group.id } }">
    <v-card-title
      style="display: flex; flex-direction: row; align-items: center"
    >
      <IconFolder style="margin-right: 12px" />
      <span>{{ group.name }}</span>
    </v-card-title>
  </v-card>
</template>

<script setup lang="ts">
import { IconFolder } from '@tabler/icons-vue';
import { Group } from '@/types/group';

defineProps<{ group: Group }>();
</script>
