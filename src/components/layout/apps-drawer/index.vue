<template>
  <v-navigation-drawer :width="300" v-model="appStore.drawerOpen">
    <v-list v-model:opened="open">
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
