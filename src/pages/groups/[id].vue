<template>
  <project-groups-breadcrumb
    v-if="projectGroup"
    :project-group="projectGroup"
  />
  <v-divider />
  <v-container>
    <div v-if="projectGroup">
      <v-row v-if="children.length > 0">
        <v-col :cols="12">
          <h2 class="text-h6">Groups</h2>
        </v-col>
        <v-col
          v-for="subgroup in children"
          :key="subgroup.id"
          :cols="12"
          :md="6"
          :xl="4"
        >
          <project-group-item :project-group="subgroup" />
        </v-col>
      </v-row>
      <v-row v-if="projects.length > 0">
        <v-col :cols="12">
          <h2 class="text-h6">Projects</h2>
        </v-col>
        <v-col
          v-for="project in projects"
          :key="project.id"
          :cols="12"
          :md="6"
          :xl="4"
        >
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
import compareBy from 'compare-by';
import { ProjectGroup } from '../../types/project-group';

definePageMeta({ layout: 'project-group' });

const route = useRoute();
const id = route.params.id as string;

const projectGroupsStore = useProjectGroups();
const { getProjectGroup } = projectGroupsStore;
const { projectGroup } = storeToRefs(projectGroupsStore);

const children = computed(
  () => projectGroup.value?.children.sort(compareBy({ key: 'name' })) ?? [],
);
const projects = computed(
  () => projectGroup.value?.projects.sort(compareBy({ key: 'name' })) ?? [],
);

const update = async (group?: ProjectGroup | null) => {
  projectGroup.value = group ?? null;
  useHead({
    title: group?.name,
  });
};

onBeforeMount(async () => {
  const group = await getProjectGroup(id);
  await update(group);
});
watch([projectGroup], async () => {
  await update(projectGroup.value);
});
</script>
