<template>
  <navbar>
    <template v-slot:actions>
      <add-app-dialog />
      <add-group-dialog />
      <edit-group-dialog />
      <delete-group-dialog />
    </template>
  </navbar>

  <main-drawer />

  <v-main>
    <groups-breadcrumb v-if="group" :group="group" />
    <v-divider />
    <v-container>
      <div v-if="group">
        <v-row v-if="children.length > 0">
          <v-col :cols="12">
            <h2 class="text-h6">Groups</h2>
          </v-col>
          <v-col
            v-for="subgroup in children"
            :key="subgroup.id"
            :cols="12"
            :md="6"
            :xl="4"
          >
            <group-item :group="subgroup" />
          </v-col>
        </v-row>
        <v-row v-if="apps.length > 0">
          <v-col :cols="12">
            <h2 class="text-h6">Projects</h2>
          </v-col>
          <v-col v-for="app in apps" :key="app.id" :cols="12" :md="6" :xl="4">
            <app-item :app="app" />
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <em>No groups or projects yet.</em>
      </div>
    </v-container>
  </v-main>
</template>

<script lang="ts" setup>
import Navbar from '@/components/layout/navbar.vue';
import MainDrawer from '@/components/drawers/main-drawer/index.vue';
import AddAppDialog from '@/components/dialogs/add-app-dialog.vue';
import AddGroupDialog from '@/components/dialogs/add-group-dialog.vue';
import EditGroupDialog from '@/components/dialogs/edit-group-dialog.vue';
import DeleteGroupDialog from '@/components/dialogs/delete-group-dialog.vue';
import compareBy from 'compare-by';
import { storeToRefs } from 'pinia';
import { computed, onBeforeMount, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';
import { useGroups } from '@/store/groups';
import GroupsBreadcrumb from '@/components/common/groups/breadcrumb/groups-breadcrumb.vue';
import GroupItem from '@/components/common/groups/group-item.vue';
import AppItem from '@/components/common/groups/app-item.vue';
import { useTitle } from '@vueuse/core';

const route = useRoute();
const groupsStore = useGroups();
const { group } = storeToRefs(groupsStore);

const children = computed(
  () => group.value?.children.toSorted(compareBy({ key: 'name' })) ?? [],
);
const apps = computed(
  () => group.value?.apps.toSorted(compareBy({ key: 'name' })) ?? [],
);

const update = async (id: string) => {
  group.value = await groupsStore.getGroup(id);
  useTitle(group.value?.name);
};

onBeforeMount(async () => {
  console.log('onBeforeMount');
  await update(route.params.id as string);
});
onBeforeRouteUpdate(async (guard) => {
  console.log('onBeforeRouteUpdate');
  // await update(guard.params.id as string);
});

watch([route], async () => {
  console.log('route changed', route);
  await update(route.params.id as string);
});
</script>
