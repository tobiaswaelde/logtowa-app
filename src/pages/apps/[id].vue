<template>
  <app-breadcrumb v-if="app" :app="app" />
  <v-divider />
  <app-logs />
</template>

<script lang="ts" setup>
definePageMeta({ layout: 'app' });

const route = useRoute();

const appsStore = useApps();
const { getApp } = appsStore;
const { app } = storeToRefs(appsStore);

onBeforeMount(async () => {
  const id = route.params.id as string;
  await getApp(id);
  useHead({ title: app.value?.name });
});
</script>
