<template>
  <v-list-subheader>Filter Messages</v-list-subheader>
  <v-text-field
    label="Filter Message"
    variant="outlined"
    density="comfortable"
    hide-details
    v-model="filter.message"
  />
</template>

<script setup lang="ts">
import { useLogsFilterStore } from '@/store/log-filter';
import { storeToRefs } from 'pinia';

const logsFilterStore = useLogsFilterStore();
const { filter } = storeToRefs(logsFilterStore);
</script>
