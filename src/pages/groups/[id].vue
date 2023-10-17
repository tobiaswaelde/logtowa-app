<template>
  <v-container>
    <v-row>
      <v-col :cols="12">
        <h1>{{ projectGroup?.name }}</h1>
      </v-col>
    </v-row>
    <v-row v-if="projectGroup && projectGroup.children.length > 0">
      <v-col :cols="12">
        <h2 class="text-h6">Groups</h2>
      </v-col>
      <v-col v-for="subgroup in projectGroup.children" :key="subgroup.id">
        <project-group-item :project-group="subgroup" />
      </v-col>
    </v-row>
    <v-row v-if="projectGroup && projectGroup.projects.length > 0">
      <v-col :cols="12">
        <h2 class="text-h6">Projects</h2>
      </v-col>
      <v-col v-for="project in projectGroup.projects" :key="project.id">
        <project-item :project="project" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ProjectGroup } from '../../types/project-group';

const route = useRoute();
const http = useHttp();

const projectGroup = ref<ProjectGroup>();

onBeforeMount(async () => {
  const id = route.params.id as string;

  const res = await http.get<ProjectGroup>(`/api/project-groups/${id}`);
  projectGroup.value = res.data;

  useHead({
    title: projectGroup.value.name,
  });
});
</script>
