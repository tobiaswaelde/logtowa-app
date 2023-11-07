<template>
  <div style="position: relative">
    <v-data-table-server
      density="comfortable"
      fixed-header
      fixed-footer
      :height="tableHeight"
      :headers="HEADERS"
      :items-length="logsCount"
      :items="logs.slice(0, pagination.itemsPerPage)"
      item-value="id"
      v-model:page="pagination.page"
      v-model:items-per-page="pagination.itemsPerPage"
      v-model:sort-by="sortOptions"
    >
      <template v-slot:item="{ item }">
        <log-table-row :item="item" />
      </template>
    </v-data-table-server>
  </div>
</template>

<script setup lang="ts">
import LogTableRow from './log-table-row.vue';
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted, ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useLogs } from '../../../../store/logs';

const route = useRoute();
const id = route.params.id as string;

const logsStore = useLogs();
const { logs, logsCount, pagination, sortOptions } = storeToRefs(logsStore);
logsStore.appId = id;

const HEADERS = [
  { key: 'timestamp', title: 'Timestamp', sortable: true, width: 220 },
  { key: 'level', title: 'Level', sortable: true, width: 100 },
  { key: 'scope', title: 'Scope', sortable: true, width: 200 },
  { key: 'message', title: 'Message', sortable: true, width: 'auto' },
];

onMounted(async () => {
  logsStore.getLogCount();

  const connected = await logsStore.connect();
  if (connected) {
    logsStore.startListening();
  }

  await logsStore.loadData();
});
onUnmounted(() => {
  logsStore.disconnect();
});

//#region table height
const windowHeight = ref<number>(0);
const handleResize = () => {
  windowHeight.value = window.innerHeight;
};
onMounted(() => {
  handleResize();
});

const tableHeight = computed(() => {
  const headerHeight = 56;
  const breadcrumbHeight = 38;
  const chartHeight = 130 + 52;
  const paginationHeight = 48;
  const dividersHeight = 2;
  return (
    windowHeight.value -
    headerHeight -
    breadcrumbHeight -
    chartHeight -
    paginationHeight -
    dividersHeight
  );
});
//#endregion
//#region scroll position
const tableRef = ref<any>(null);
const tableWrapper = computed(() =>
  tableRef.value.$el.querySelector('.v-table__wrapper'),
);
const tableScrolled = ref<boolean>(false);

watch([tableRef], () => {
  tableWrapper.value?.addEventListener('scroll', (e: any) => {
    const scrollTop = e.target.scrollTop;
    tableScrolled.value = scrollTop > 50;
  });
});

//#endregion
</script>
