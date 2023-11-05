<template>
  <v-card :to="`/groups/${group.id}`">
    <v-card-title
      style="display: flex; flex-direction: row; align-items: center"
    >
      <IconFolder style="margin-right: 12px" />
      {{ group.name }}
    </v-card-title>
  </v-card>
</template>

<script lang="ts" setup>
import { IconFolder } from '@tabler/icons-vue';
import { Group } from '@/types/group';

defineProps<{
  group: Group;
}>();
</script>
