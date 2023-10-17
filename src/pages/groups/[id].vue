<template>
  <v-container>
    <v-row>
      <v-col
        :cols="12"
        style="display: flex; flex-direction: row; align-items: center"
      >
        <v-btn
          icon
          @click="goToParent"
          size="small"
          variant="flat"
          style="margin-right: 12px"
        >
          <IconArrowLeft />
        </v-btn>
        <h1 class="text-h5">
          {{ projectGroup?.name }}
        </h1>
      </v-col>
    </v-row>
    <v-divider style="margin-top: 10px; margin-bottom: 20px" />
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
import { IconArrowLeft } from '@tabler/icons-vue';
import { ProjectGroup } from '../../types/project-group';

const route = useRoute();
const router = useRouter();
const http = useHttp();

const projectGroup = ref<ProjectGroup>();

const goToParent = () => {
  if (projectGroup.value?.parent) {
    router.push(`/groups/${projectGroup.value.parent.id}`);
  } else {
    router.push(`/groups`);
  }
};

onBeforeMount(async () => {
  const id = route.params.id as string;

  const res = await http.get<ProjectGroup>(`/api/project-groups/${id}`);
  projectGroup.value = res.data;

  useHead({
    title: projectGroup.value.name,
  });
});
</script>
