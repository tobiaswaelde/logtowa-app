<template>
  <div style="position: relative">
    <!-- <v-data-table-virtual
      :headers="HEADERS"
      :items="logs"
      :height="tableHeight"
      fixed-header
      ref="tableRef"
      density="comfortable"
    >
      <template v-slot:item="{ item }">
        <log-table-row :item="item" />
      </template>
    </v-data-table-virtual>

    <scroll-to-top-button :visible="tableScrolled" @click="scrollToTop" /> -->

    <v-data-table-server
      density="comfortable"
      fixed-header
      fixed-footer
      :height="tableHeight"
      :headers="HEADERS"
      :items-length="logsCount"
      :items="logs"
      item-value="id"
      v-model:page="pagination.page"
      v-model:items-per-page="pagination.itemsPerPage"
      v-model:sort-by="sortOptions"
    >
      <template v-slot:item="{ item }">
        <log-table-row :item="item" />
      </template>
    </v-data-table-server>

    <scroll-to-top-button :visible="tableScrolled" @click="scrollToTop" />
  </div>
</template>

<script setup lang="ts">
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
    // logsStore.startListening();
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
  const chartHeight = 101;
  const filterHeight = 66;
  const paginationHeight = 48;
  const dividersHeight = 2;
  return (
    windowHeight.value -
    headerHeight -
    breadcrumbHeight -
    chartHeight -
    filterHeight -
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

const scrollToTop = () => {
  tableWrapper.value?.scroll({ top: 0, behavior: 'smooth' });
};
//#endregion
</script>
