<template>
  <v-list density="comfortable" v-model:opened="openListItems">
    <v-list-subheader>Apps</v-list-subheader>

    <div>
      <div v-if="loading">
        <v-skeleton-loader
          type="list-item"
          :loading="loading"
          v-for="x of new Array(5)"
          :key="x"
        />
      </div>
      <div v-else>
        <GroupListItem
          v-for="group of groups"
          :key="group.id"
          :value="group.id"
          :group="group"
        />
      </div>
    </div>
  </v-list>
</template>

<script setup lang="ts">
import GroupListItem from './groups-list-item.vue';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { compareBy } from 'compare-by';
import { useGroupsStore } from '@/store/groups';

const groupsStore = useGroupsStore();
groupsStore.getGroups();
const { loading } = storeToRefs(groupsStore);

const groups = computed(() =>
  Array.from(groupsStore.groups.values())
    .filter((x) => x.parent === undefined) // only select root level groups
    .toSorted(compareBy({ key: 'name' })),
);

const openListItems = ref<string[]>([]);
</script>
