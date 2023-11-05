<template>
  <groups-breadcrumb />
  <v-divider />
  <v-container>
    <div v-if="groups.length > 0">
      <v-row>
        <v-col
          v-for="group in groups"
          :key="group.id"
          :cols="12"
          :md="6"
          :xl="4"
        >
          <group-item :group="group" />
        </v-col>
      </v-row>
    </div>
    <div v-else>
      <em>No groups or apps yet.</em>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import compareBy from 'compare-by';
import { storeToRefs } from 'pinia';
import { computed, onBeforeMount } from 'vue';
import { useGroups } from '../store/groups';
import GroupsBreadcrumb from '../components/common/groups/breadcrumb/groups-breadcrumb.vue';
import GroupItem from '../components/common/groups/group-item.vue';

// definePageMeta({ layout: 'groups' });

const groupsStore = useGroups();
const { groups: projectGroups } = groupsStore;
const { group } = storeToRefs(groupsStore);

const groups = computed(() =>
  Array.from(projectGroups.values())
    .filter((x) => !x.parent)
    .sort(compareBy({ key: 'name' })),
);

onBeforeMount(() => {
  // useHead({ title: 'Projects' });
  group.value = null;
});
</script>
