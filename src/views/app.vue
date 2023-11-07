<template>
  <navbar>
    <template v-slot:actions>
      <v-btn icon @click="toggleConnection">
        <v-badge :color="connected ? 'success' : 'warning'" dot>
          <IconPlayerPause v-if="listening" />
          <IconPlayerPlay v-else />
        </v-badge>
      </v-btn>

      <v-btn icon @click="filterDrawerOpen = !filterDrawerOpen">
        <v-badge color="error" dot v-if="!isDefaultFilter">
          <IconFilter />
        </v-badge>
        <IconFilter v-else />
      </v-btn>

      <show-implementation-dialog />

      <edit-app-dialog />
      <delete-app-dialog />
    </template>
  </navbar>

  <main-drawer />
  <LogInfoDrawer />
  <LogsFilterDrawer />

  <v-main>
    <app-breadcrumb v-if="app" :app="app" />
    <v-divider />
    <app-logs />
  </v-main>
</template>

<script setup lang="ts">
import AppBreadcrumb from '@/components/common/groups/breadcrumb/app-breadcrumb.vue';
import AppLogs from '@/components/common/apps/app-logs.vue';
import ShowImplementationDialog from '@/components/dialogs/show-implementation-dialog.vue';
import EditAppDialog from '@/components/dialogs/edit-app-dialog.vue';
import DeleteAppDialog from '@/components/dialogs/delete-app-dialog.vue';
import Navbar from '@/components/layout/navbar.vue';
import MainDrawer from '@/components/drawers/main-drawer/index.vue';
import LogsFilterDrawer from '@/components/drawers/logs-filter-drawer/index.vue';
import LogInfoDrawer from '@/components/drawers/log-info-drawer/index.vue';
import { IconFilter, IconPlayerPlay, IconPlayerPause } from '@tabler/icons-vue';
import { storeToRefs } from 'pinia';
import { useLogs } from '@/store/logs';
import { useLogsFilter } from '@/store/logs-filter';
import { useTitle } from '@vueuse/core';
import { onBeforeMount } from 'vue';
import { useRoute, onBeforeRouteUpdate } from 'vue-router';
import { useAppChartStore } from '../store/app-chart';
import { useApps } from '../store/apps';

const { startListening, stopListening } = useLogs();
const { connected, listening } = storeToRefs(useLogs());
const { drawerOpen: filterDrawerOpen, isDefaultFilter } = storeToRefs(
  useLogsFilter(),
);

const toggleConnection = () => {
  if (listening.value) {
    stopListening();
  } else {
    startListening();
  }
};

const route = useRoute();

const appsStore = useApps();
const logsStore = useLogs();
const chartStore = useAppChartStore();

const { getApp } = appsStore;
const { app } = storeToRefs(appsStore);

const update = async () => {
  const id = route.params.id as string;
  await getApp(id);
  logsStore.appId = id;
  chartStore.appId = id;
  useTitle(app.value?.name);
};

onBeforeRouteUpdate(async () => {
  await update();
});
onBeforeMount(async () => {
  await update();
});
</script>
