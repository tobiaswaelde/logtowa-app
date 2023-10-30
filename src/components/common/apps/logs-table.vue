<template>
  <v-data-table
    disable-pagination
    fixed-header
    density="comfortable"
    :headers="HEADERS"
    :items="logs"
    :sort-asc-icon="IconArrowUp"
    :sort-desc-icon="IconArrowDown"
    :height="tableHeight"
    v-model:sort-by="sortOptions"
    v-model="selected"
    :loading="loading"
    @click:row="
      (e, row) => {
        getLog(row.item.id);
      }
    "
    :items-per-page="-1"
  >
    <!-- required to hide the footer -->
    <template v-slot:bottom>
      <div :ref="bottomRef">
        <span>Loading more data...</span>
      </div>
    </template>

    <template v-slot:item="{ props, item }" style="cursor: pointer">
      <tr v-bind="props" :key="item.id">
        <td
          style="cursor: pointer; font-family: monospace !important"
          :class="{
            'bg-background': item.id !== selectedLog?.id,
            'bg-background-darken1': item.id === selectedLog?.id,
          }"
        >
          {{ getTimestamp(item.timestamp) }}
        </td>

        <td
          style="cursor: pointer"
          :class="{
            'bg-background': item.id !== selectedLog?.id,
            'bg-background-darken1': item.id === selectedLog?.id,
          }"
        >
          <log-level-chip :value="item.level" />
        </td>

        <td
          style="cursor: pointer; font-family: monospace !important"
          :class="{
            'bg-background': item.id !== selectedLog?.id,
            'bg-background-darken1': item.id === selectedLog?.id,
          }"
        >
          {{ item.scope }}
        </td>

        <td
          style="cursor: pointer; font-family: monospace !important"
          :class="{
            'bg-background': item.id !== selectedLog?.id,
            'bg-background-darken1': item.id === selectedLog?.id,
          }"
        >
          {{ item.message }}
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { IconArrowUp, IconArrowDown } from '@tabler/icons-vue';
import moment from 'moment';
import { useLogs } from '../../../stores/logs';
import { useElementVisibility } from '@vueuse/core';

const selected = ref<any[]>([]);

const route = useRoute();
const id = route.params.id as string;
const logsStore = useLogs();
const { getLog } = logsStore;
const { logs, sortOptions, loading, moreAvailable, selectedLog } =
  storeToRefs(logsStore);
logsStore.$state = {
  projectId: id,
  connected: false,
  listening: true,
  sortOptions: [{ key: 'timestamp', order: 'desc' }],
  loading: false,
  moreAvailable: true,
  logsCount: 0,
  selectedLog: null,
  filter: {
    levels: ['error', 'warn', 'info'],
    scope: '',
    message: '',
  },
};

const tableRef = ref<any>(null);

const bottomRef = ref<any>(null);
const bottomVisible = useElementVisibility(bottomRef.value);

watch([bottomRef], () => {
  console.log('bottomRef:', bottomRef.value);
});
watch([bottomVisible], () => {
  console.log('bottomVisible:', bottomVisible.value);
});

onMounted(() => {
  logsStore.connect();
  logsStore.startListening();
});

watch([tableRef.value], () => {
  console.log(tableRef);
});

const HEADERS = [
  // { key: 'id', title: 'ID' },
  { key: 'timestamp', title: 'Timestamp', sortable: false, width: 200 },
  { key: 'level', title: 'Level', sortable: false, width: 100 },
  { key: 'scope', title: 'Scope', sortable: false, width: 200 },
  { key: 'message', title: 'Message', sortable: false },
];

const getTimestamp = (timestamp: string) => {
  const time = moment(timestamp);
  if (time.isAfter(moment().startOf('day'))) {
    return time.format('HH:mm:ss.SSS');
  } else if (time.isAfter(moment().startOf('day').subtract(1, 'week'))) {
    return time.format('ddd, HH:mm:ss.SSS');
  } else {
    return time.format('DD.MM., HH:mm:ss.SSS');
  }
};

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
  const filterHeight = 66;
  const paginationHeight = 48;
  return (
    windowHeight.value -
    headerHeight -
    breadcrumbHeight -
    filterHeight -
    // paginationHeight -
    24 -
    2
  );
});
</script>
