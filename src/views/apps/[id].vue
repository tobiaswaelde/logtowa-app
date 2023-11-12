<template>
  <LogsFilterDrawer />

  <v-main>
    <AppBreadcrumb :id="id" />
    <v-divider />
    <AppLogsBarChart :id="id" />
    <v-divider />
    <div>app: {{ id }}</div>
  </v-main>
</template>

<script setup lang="ts">
import LogsFilterDrawer from '@/components/layout/drawers/logs-filter-drawer/index.vue';
import AppBreadcrumb from '@/components/layout/breadcrumbs/app-breadcrumb.vue';
import AppLogsBarChart from '@/components/charts/app-logs-bar-chart.vue';
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
