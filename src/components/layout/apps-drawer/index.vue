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
      <lazy-group-list-item
        v-for="group in groups"
        :key="group.id"
        :value="group.id"
        :group="group"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { IconHome2, IconCube } from '@tabler/icons-vue';
import compareBy from 'compare-by';

const appStore = useAppStore();
const { groups: projectGroups } = useGroups();

const groups = computed(() =>
  Array.from(projectGroups.values())
    .filter((x) => !x.parent)
    .sort(compareBy({ key: 'name' })),
);

const open = ref<string[]>([]);
</script>
