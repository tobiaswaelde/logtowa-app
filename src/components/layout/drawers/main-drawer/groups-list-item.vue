<template>
  <v-list-group :value="value">
    <template v-slot:activator="{ props, isOpen }">
      <v-list-item v-bind="props" :title="group.name">
        <template v-slot:prepend>
          <component
            :is="isOpen ? IconFolderOpen : IconFolder"
            :size="20"
            style="margin-right: 8px"
          />
        </template>
        <template v-slot:append>
          <IconChevronUp :class="{ chevron: true, open: isOpen }" />
        </template>
      </v-list-item>
    </template>

    <div v-if="loading">
      <v-skeleton-loader type="list-item" v-for="x of new Array(3)" :key="x" />
    </div>
    <div v-else>
      <GroupListItem
        v-for="child of children"
        :key="child.id"
        :value="child.id"
        :group="child"
      />
      <AppListItem
        v-for="app of apps"
        :key="app.id"
        :value="app.id"
        :app="app"
      />
    </div>
  </v-list-group>
</template>

<script setup lang="ts">
import GroupListItem from './groups-list-item.vue';
import AppListItem from './app-list-item.vue';
import { IconChevronUp, IconFolder, IconFolderOpen } from '@tabler/icons-vue';
import { ref, onMounted, watch } from 'vue';
import compareBy from 'compare-by';
import { App } from '@/types/app';
import { Group } from '@/types/group';
import { useGroupsStore } from '@/store/groups';

const props = defineProps<{ value: string; group: Group }>();

const groupsStore = useGroupsStore();

const loading = ref<boolean>(true);
const children = ref<Group[]>([]);
const apps = ref<App[]>([]);

onMounted(async () => {
  const g = await groupsStore.getGroup(props.value);
  children.value = g?.children.toSorted(compareBy({ key: 'name' })) ?? [];
  apps.value = g?.apps.toSorted(compareBy({ key: 'name' })) ?? [];

  loading.value = false;
});
</script>

<style lang="scss" scoped>
.v-list-group {
  --prepend-width: 0px !important;
}

.chevron {
  transition-property: all;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;

  &.open {
    transform: rotate(180deg);
  }
}
</style>
