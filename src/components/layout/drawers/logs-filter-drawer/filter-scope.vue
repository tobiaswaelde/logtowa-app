<template>
  <v-list-subheader>Filter Scopes</v-list-subheader>
  <v-text-field
    label="Filter Scope"
    variant="outlined"
    density="comfortable"
    hide-details
    v-model="filter.scope"
  />
</template>

<script setup lang="ts">
import { useLogsFilterStore } from '@/store/log-filter';
import { storeToRefs } from 'pinia';

const logsFilterStore = useLogsFilterStore();
const { filter } = storeToRefs(logsFilterStore);
</script>
