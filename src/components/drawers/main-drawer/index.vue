<template>
  <v-navigation-drawer :width="300" v-model="appStore.drawerOpen">
    <v-list v-model:opened="open" density="comfortable">
      <v-list-item title="Dashboard" to="/">
        <template v-slot:prepend>
          <IconHome2 :size="20" style="margin-right: 8px" />
        </template>
      </v-list-item>
      <v-list-item title="Apps" to="/groups">
        <template v-slot:prepend>
          <IconCube :size="20" style="margin-right: 8px" />
        </template>
      </v-list-item>

      <v-divider />

      <v-list-subheader>Apps</v-list-subheader>
      <group-list-item
        v-for="group of groups"
        :key="group.id"
        :value="group.id"
        :group="group"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { IconHome2, IconCube } from '@tabler/icons-vue';
import { useAppStore } from '../../../store/app';
import { useGroups } from '../../../store/groups';
import { ref, computed } from 'vue';
import { compareBy } from 'compare-by';
import GroupListItem from './group-list-item.vue';

const appStore = useAppStore();
const groupsStore = useGroups();

const groups = computed(() =>
  Array.from(groupsStore.groups.values())
    .filter((x) => !x.parent)
    .sort(compareBy({ key: 'name' })),
);

const open = ref<string[]>([]);
</script>
