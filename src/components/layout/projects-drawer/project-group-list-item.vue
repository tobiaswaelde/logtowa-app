<template>
  <v-list-group :value="value">
    <template v-slot:activator="{ props, isOpen }">
      <v-list-item v-bind="props" :title="name" density="compact">
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
      v-for="child in children"
      :key="child.id"
      :value="child.id"
      :project-group="child"
    />

    <lazy-project-list-item
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
import { ProjectGroup } from '../../../types/project-group';
import compareBy from 'compare-by';

const projectGroupsStore = useProjectGroups();
const { projectGroups } = projectGroupsStore;

const props = defineProps<{
  value: string;
  projectGroup: ProjectGroup;
}>();

const name = computed(() => props.projectGroup.name);
const children = computed(
  () =>
    projectGroups.get(props.value)?.children.sort(compareBy({ key: 'name' })) ??
    [],
);
const projects = computed(
  () =>
    projectGroups.get(props.value)?.projects.sort(compareBy({ key: 'name' })) ??
    [],
);

onBeforeMount(async () => {
  await projectGroupsStore.getProjectGroup(props.value);
});
</script>

<style lang="scss">
.v-list-group {
  --prepend-width: 0px !important;
}
</style>
