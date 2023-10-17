import projectGroupItemVue from './project-group-item.vue';
<template>
  <v-card :to="`/projects/${project.id}`">
    <v-card-title
      style="display: flex; flex-direction: row; align-items: center"
    >
      <IconCube style="margin-right: 12px" />
      {{ project.name }}
    </v-card-title>
  </v-card>
</template>

<script lang="ts" setup>
import { IconCube } from '@tabler/icons-vue';
import { Project } from '@/types/project';

const props = defineProps<{
  project: Project;
}>();
</script>
