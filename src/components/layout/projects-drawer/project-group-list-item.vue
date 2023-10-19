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

    <lazy-project-group-list-item
      v-for="child in projectGroup.children"
      :key="child.id"
      :value="child.id"
      :project-group="child"
    />

    <lazy-project-list-item
      v-for="project in projectGroup.projects"
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
import { ProjectGroup } from '../../../types/project-group';

defineProps<{
  value: string;
  projectGroup: ProjectGroup;
}>();
</script>

<style lang="scss">
.v-list-group {
  --prepend-width: 0px !important;
}
</style>
