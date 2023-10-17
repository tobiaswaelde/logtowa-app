<template>
  <v-navigation-drawer :width="300">
    <v-list v-model:opened="open">
      <v-list-subheader>Projects</v-list-subheader>
      <project-group-item
        v-for="projectGroup in projectGroups"
        :key="projectGroup.id"
        :value="projectGroup.id"
        :project-group="projectGroup"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ProjectGroup } from '@/types/project-group';

const open = ref<string[]>(['d1a30b8b-3fae-4043-b9e2-2a643db66f12']);

const projectGroups = ref<ProjectGroup[]>([]);

const http = useHttp();
const res = await http.get<ProjectGroup[]>('/api/project-groups');
projectGroups.value = res.data;
</script>
