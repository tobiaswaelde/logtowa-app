<template>
  <v-container>
    <v-row>
      <v-col
        v-for="projectGroup in projectGroups"
        :key="projectGroup.id"
        :cols="12"
        :md="6"
        :xl="4"
      >
        <project-group-item :projectGroup="projectGroup" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ProjectGroup } from '@/types/project-group';

useHead({ title: 'Project Groups' });

const projectGroups = ref<ProjectGroup[]>([]);
const http = useHttp();

onBeforeMount(async () => {
  const res = await http.get<ProjectGroup[]>('/api/project-groups');
  projectGroups.value = res.data;
});
</script>
