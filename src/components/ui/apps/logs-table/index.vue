<template>
  <v-data-table-server
    :height="tableHeight - PAGINATION_HEIGHT"
    density="compact"
    :headers="HEADERS"
    fixed-header
    fixed-footer
    :items-length="logsCount"
    :items="logs.slice(0, itemsPerPage)"
    item-value="id"
    v-model:page="page"
    v-model:items-per-page="itemsPerPage"
    :loading="loading"
    :items-per-page-options="[10, 15, 20, 25, 50, 100]"
    @click:row="() => {}"
    loading-text="Loading logs..."
    no-data-text="No logs yet."
  >
    <template v-slot:item="{ item }">
      <TableRow :item="item" />
    </template>
  </v-data-table-server>
</template>

<script setup lang="ts">
import TableRow from './table-row.vue';
import { onBeforeMount, onMounted, onUnmounted } from 'vue';
import { useAppLogsStore } from '@/store/app-logs';
import { storeToRefs } from 'pinia';

const PAGINATION_HEIGHT = 48;

defineProps<{ tableHeight: number }>();

const appLogsStore = useAppLogsStore();
const { logs, logsCount, page, itemsPerPage, loading } =
  storeToRefs(appLogsStore);

const HEADERS = [
  { key: 'timestamp', title: 'Timestamp', sortable: true, width: 220 },
  { key: 'level', title: 'Level', sortable: false, width: 120 },
  { key: 'scope', title: 'Scope', sortable: false, width: 200 },
  { key: 'message', title: 'Message', sortable: false, width: 'auto' },
];

const update = async () => {
  await appLogsStore.getLogCount();
};

onBeforeMount(async () => {
  update();
});
onMounted(async () => {
  update();

  const connected = await appLogsStore.connect();
  if (connected) {
    appLogsStore.startListening();
  }

  appLogsStore.loadData();
});
onUnmounted(() => {
  appLogsStore.disconnect();
});
</script>
