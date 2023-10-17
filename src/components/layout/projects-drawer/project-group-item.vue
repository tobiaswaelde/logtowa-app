<template>
  <v-list-group :value="value">
    <template v-slot:activator="{ props, isOpen }">
      <v-list-item v-bind="props" :title="projectGroup.name" density="compact">
        <template v-slot:prepend>
          <IconFolder :size="20" v-if="!isOpen" style="margin-right: 8px" />
          <IconFolderOpen :size="20" v-else style="margin-right: 8px" />
        </template>
        <template v-slot:append>
          <IconChevronDown v-if="!isOpen" />
          <IconChevronUp v-else />
        </template>
      </v-list-item>
    </template>

    <lazy-project-group-item
      v-for="child in children"
      :key="child.id"
      :value="child.id"
      :project-group="child"
    />

    <lazy-project-item
      v-for="project in projects"
      :key="project.id"
      :value="project.id"
      :project="project"
    />
  </v-list-group>
</template>

<script lang="ts" setup>
import {
  IconChevronDown,
  IconChevronUp,
  IconFolder,
  IconFolderOpen,
} from '@tabler/icons-vue';
import { Project } from '../../../types/project';
import { ProjectGroup } from '../../../types/project-group';

const props = defineProps<{
  value: string;
  projectGroup: ProjectGroup;
}>();

const children = ref<ProjectGroup[]>([]);
const projects = ref<Project[]>([]);

const http = useHttp();
const res = await http.get<ProjectGroup>(
  `/api/project-groups/${props.projectGroup.id}`,
);
children.value = res.data.children;
projects.value = res.data.projects;
</script>

<style lang="scss">
.v-list-group {
  --prepend-width: 0px !important;
}
</style>
