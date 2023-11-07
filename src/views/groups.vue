<template>
  <navbar>
    <template v-slot:actions>
      <add-group-dialog />
    </template>
  </navbar>

  <main-drawer />

  <v-main>
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
  </v-main>
</template>

<script lang="ts" setup>
import Navbar from '@/components/layout/navbar.vue';
import MainDrawer from '@/components/drawers/main-drawer/index.vue';
import AddGroupDialog from '@/components/dialogs/add-group-dialog.vue';
import compareBy from 'compare-by';
import { storeToRefs } from 'pinia';
import { computed, onBeforeMount } from 'vue';
import { useGroups } from '@/store/groups';
import GroupsBreadcrumb from '@/components/common/groups/breadcrumb/groups-breadcrumb.vue';
import GroupItem from '@/components/common/groups/group-item.vue';

const groupsStore = useGroups();
const { groups: projectGroups } = groupsStore;
const { group } = storeToRefs(groupsStore);

const groups = computed(() =>
  Array.from(projectGroups.values())
    .filter((x) => !x.parent)
    .toSorted(compareBy({ key: 'name' })),
);

onBeforeMount(() => {
  // useHead({ title: 'Projects' });
  group.value = null;
});
</script>
