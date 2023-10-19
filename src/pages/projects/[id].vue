<template>
  <project-breadcrumb v-if="project" :project="project" />
  <v-divider />
  <div>Project</div>
</template>

<script lang="ts" setup>
const route = useRoute();

const projectsStore = useProjects();
const { getProject } = projectsStore;
const { project } = storeToRefs(projectsStore);

onBeforeMount(async () => {
  const id = route.params.id as string;
  await getProject(id);
  useHead({ title: project.value?.name });
});
</script>
