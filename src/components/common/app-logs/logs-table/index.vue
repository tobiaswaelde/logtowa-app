<template>
  <div style="position: relative">
    <v-data-table-virtual
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

    <scroll-to-top-button :visible="tableScrolled" @click="scrollToTop" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const id = route.params.id as string;

const logsStore = useLogs();
const { logs } = storeToRefs(logsStore);
logsStore.$state = {
  projectId: id,
  connected: false,
  listening: true,
  sortOptions: [{ key: 'timestamp', order: 'desc' }],
  loading: false,
  logsCount: 0,
  selectedLog: null,
  filter: {
    levels: ['error', 'warn', 'info'],
    scope: '',
    message: '',
  },
};

const HEADERS = [
  { key: 'timestamp', title: 'Timestamp', sortable: false, width: 200 },
  { key: 'level', title: 'Level', sortable: false, width: 100 },
  { key: 'scope', title: 'Scope', sortable: false, width: 200 },
  { key: 'message', title: 'Message', sortable: false },
];

onMounted(() => {
  logsStore.connect();
  logsStore.startListening();
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
  const dividersHeight = 2;
  return (
    windowHeight.value -
    headerHeight -
    breadcrumbHeight -
    chartHeight -
    filterHeight -
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
