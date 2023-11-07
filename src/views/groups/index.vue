<template>
  <v-main>
    <GroupsBreadcrumb />
    <v-divider />
    <v-container>
      <div v-if="loading">
        <v-row>
          <v-col v-for="x of new Array(4)" :key="x" :cols="12" :md="6" :xl="4">
            <v-skeleton-loader type="list-item" :height="48" />
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <v-row v-if="groups.length > 0">
          <v-col
            v-for="group of groups"
            :key="group.id"
            :cols="12"
            :md="6"
            :xl="4"
          >
            <GroupItem :group="group" />
          </v-col>
        </v-row>
        <div v-else>
          <em>No groups yet.</em>
        </div>
      </div>
    </v-container>
  </v-main>
</template>

<script setup lang="ts">
import GroupsBreadcrumb from '@/components/layout/breadcrumbs/groups-breadcrumb.vue';
import GroupItem from '@/components/ui/groups/group-item.vue';
import { useGroupsStore } from '../../store/groups';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import compareBy from 'compare-by';

const groupsStore = useGroupsStore();
const { loading } = storeToRefs(groupsStore);

const groups = computed(() =>
  Array.from(groupsStore.groups.values())
    .filter((x) => x.parent === undefined)
    .toSorted(compareBy({ key: 'name' })),
);
</script>
