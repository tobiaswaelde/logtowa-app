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

    <lazy-group-list-item
      v-for="child in children"
      :key="child.id"
      :value="child.id"
      :group="child"
    />

    <lazy-app-list-item
      v-for="app in apps"
      :key="app.id"
      :value="app.id"
      :app="app"
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
import { Group } from '@/types/group';
import compareBy from 'compare-by';

const groupsStore = useGroups();
const { groups } = groupsStore;

const props = defineProps<{
  value: string;
  group: Group;
}>();

const name = computed(() => props.group.name);
const children = computed(
  () =>
    groups.get(props.value)?.children.sort(compareBy({ key: 'name' })) ?? [],
);
const apps = computed(
  () => groups.get(props.value)?.apps.sort(compareBy({ key: 'name' })) ?? [],
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
