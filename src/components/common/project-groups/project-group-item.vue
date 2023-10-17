<template>
  <v-card :to="`/groups/${projectGroup.id}`">
    <v-card-title
      style="display: flex; flex-direction: row; align-items: center"
    >
      <IconFolder style="margin-right: 12px" />
      {{ projectGroup.name }}
    </v-card-title>
  </v-card>
</template>

<script lang="ts" setup>
import { IconFolder } from '@tabler/icons-vue';
import { ProjectGroup } from '@/types/project-group';

const props = defineProps<{
  projectGroup: ProjectGroup;
}>();
</script>
