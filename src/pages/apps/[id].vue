<template>
  <app-breadcrumb v-if="app" :app="app" />
  <v-divider />
  <app-logs />
</template>

<script lang="ts" setup>
definePageMeta({ layout: 'app' });

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
  useHead({ title: app.value?.name });
};

onBeforeRouteUpdate(async () => {
  await update();
});
onBeforeMount(async () => {
  await update();
});
</script>
