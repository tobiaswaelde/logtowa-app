<template>
  <v-container>
    <v-row>
      <v-col
        v-for="projectGroup in projectGroups"
        :key="projectGroup.id"
        :cols="4"
      >
        <v-card :to="`/groups/${projectGroup.id}`">
          <v-card-title
            style="display: flex; flex-direction: row; align-items: center"
          >
            <IconFolder style="margin-right: 12px" />
            {{ projectGroup.name }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { IconFolder } from '@tabler/icons-vue';
import { ProjectGroup } from '@/types/project-group';

useHead({ title: 'Project Groups' });

const projectGroups = ref<ProjectGroup[]>([]);
const http = useHttp();

onBeforeMount(async () => {
  const res = await http.get<ProjectGroup[]>('/api/project-groups');
  projectGroups.value = res.data;
});
</script>
