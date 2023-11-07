<template>
  <div style="display: flex; flex-direction: column">
    <app-logs-chart v-if="app !== null" />
    <v-divider />

    <logs-table />
  </div>
</template>

<script setup lang="ts">
import AppLogsChart from '../../charts/app-logs-chart.vue';
import LogsTable from '@/components/common/app-logs/logs-table/index.vue';
import { storeToRefs } from 'pinia';
import { useApps } from '../../../store/apps';

const { app } = storeToRefs(useApps());
</script>
