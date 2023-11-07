<template>
  <v-list-group :value="value">
    <template v-slot:activator="{ props, isOpen }">
      <v-list-item v-bind="props" :title="name">
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

    <group-list-item
      v-for="child in children"
      :key="child.id"
      :value="child.id"
      :group="child"
    />

    <app-list-item
      v-for="app in apps"
      :key="app.id"
      :value="app.id"
      :app="app"
    />
  </v-list-group>
</template>

<script setup lang="ts">
import {
  IconChevronDown,
  IconChevronUp,
  IconFolder,
  IconFolderOpen,
} from '@tabler/icons-vue';
import { computed, onBeforeMount } from 'vue';
import { useGroups } from '../../../store/groups';
import { Group } from '../../../types/group';
import { compareBy } from 'compare-by';
import GroupListItem from './group-list-item.vue';
import AppListItem from './app-list-item.vue';

const groupsStore = useGroups();
const { groups } = groupsStore;

const props = defineProps<{
  value: string;
  group: Group;
}>();

const name = computed(() => props.group.name);
const children = computed(
  () =>
    groups.get(props.value)?.children.toSorted(compareBy({ key: 'name' })) ??
    [],
);
const apps = computed(
  () =>
    groups.get(props.value)?.apps.toSorted(compareBy({ key: 'name' })) ?? [],
);

onBeforeMount(async () => {
  await groupsStore.getGroup(props.value);
});
</script>

<style lang="scss">
.v-list-group {
  --prepend-width: 0px !important;
}
</style>
