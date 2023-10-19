<template>
  <project-groups-breadcrumb
    v-if="projectGroup"
    :project-group="projectGroup"
  />
  <v-divider />
  <v-container>
    <div
      v-if="
        projectGroup &&
        (projectGroup.children.length > 0 || projectGroup.projects.length > 0)
      "
    >
      <v-row v-if="projectGroup.children.length > 0">
        <v-col :cols="12">
          <h2 class="text-h6">Groups</h2>
        </v-col>
        <v-col v-for="subgroup in projectGroup.children" :key="subgroup.id">
          <project-group-item :project-group="subgroup" />
        </v-col>
      </v-row>
      <v-row v-if="projectGroup.projects.length > 0">
        <v-col :cols="12">
          <h2 class="text-h6">Projects</h2>
        </v-col>
        <v-col v-for="project in projectGroup.projects" :key="project.id">
          <project-item :project="project" />
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <em>No groups or projects yet.</em>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { useProjectGroups } from '../../stores/project-groups';

const route = useRoute();

const projectGroupsStore = useProjectGroups();
const { getProjectGroup } = projectGroupsStore;
const { projectGroup } = storeToRefs(projectGroupsStore);

onBeforeMount(async () => {
  const id = route.params.id as string;
  const pg = await getProjectGroup(id);
  useHead({ title: pg?.name });
});
</script>
