<template>
  <LogsFilterDrawer />
  <LogInfoDrawer />

  <v-main>
    <ResizablePage :min-height="200">
      <template v-slot:prepend>
        <AppBreadcrumb :id="id" />
        <v-divider />
        <AppLogsBarChart :id="id" />
        <v-divider />
      </template>
      <template v-slot:dynamic="{ height }">
        <AppLogsTable :table-height="height" />
      </template>
    </ResizablePage>
  </v-main>
</template>

<script setup lang="ts">
import ResizablePage from '@/components/layout/resizable-page.vue';
import LogsFilterDrawer from '@/components/layout/drawers/logs-filter-drawer/index.vue';
import LogInfoDrawer from '@/components/layout/drawers/log-info-drawer/index.vue';
import AppBreadcrumb from '@/components/layout/breadcrumbs/app-breadcrumb.vue';
import AppLogsBarChart from '@/components/charts/app-logs-bar-chart.vue';
import AppLogsTable from '@/components/ui/apps/logs-table/index.vue';
import { useRoute } from 'vue-router';
import { computed, onBeforeMount, onBeforeUpdate } from 'vue';
import { useAppLogsStore } from '@/store/app-logs';

const route = useRoute();
const id = computed(() => route.params.id as string);

const appLogsStore = useAppLogsStore();

onBeforeMount(() => {
  appLogsStore.appId = id.value;
});
onBeforeUpdate(() => {
  appLogsStore.appId = id.value;
});
</script>
