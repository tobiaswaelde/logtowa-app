<template>
  <v-main>
    <AppBreadcrumb :id="id" />
    <v-divider />
    <div>app: {{ id }}</div>
  </v-main>
</template>

<script setup lang="ts">
import AppBreadcrumb from '@/components/layout/breadcrumbs/app-breadcrumb.vue';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

const route = useRoute();
const id = computed(() => route.params.id as string);
</script>
