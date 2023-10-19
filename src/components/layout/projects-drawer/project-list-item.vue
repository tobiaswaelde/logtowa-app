<template>
  <v-list-item
    :value="value"
    :title="project.name"
    density="compact"
    :to="`/projects/${project.id}`"
  >
    <template v-slot:prepend>
      <IconCube :size="20" style="margin-right: 8px" />
    </template>
  </v-list-item>
</template>

<script lang="ts" setup>
import { IconCube } from '@tabler/icons-vue';
import { Project } from '../../../types/project';

defineProps<{
  value: string;
  project: Project;
}>();
</script>
