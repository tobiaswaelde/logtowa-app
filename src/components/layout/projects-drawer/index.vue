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

    <div style="padding: 0px 8px; width: 100%">
      <v-btn style="width: 100%" variant="outlined" color="primary">
        <IconPlus />
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { IconPlus } from '@tabler/icons-vue';
import { ProjectGroup } from '@/types/project-group';

const open = ref<string[]>([]);

const projectGroups = ref<ProjectGroup[]>([]);

const http = useHttp();
const res = await http.get<ProjectGroup[]>('/api/project-groups');
projectGroups.value = res.data;
</script>
