<template>
  <v-list-item :value="value" :title="_project.name" density="compact">
    <template v-slot:prepend>
      <IconCube :size="20" style="margin-right: 8px" />
    </template>
  </v-list-item>
</template>

<script lang="ts" setup>
import { IconCube } from '@tabler/icons-vue';
import { Project } from '../../../types/project';

const props = defineProps<{
  value: string;
  project: Project;
}>();

const http = useHttp();
const res = await http.get<Project>(`/api/projects/${props.project.id}`);

const _project = res.data;
console.log(_project);
</script>
